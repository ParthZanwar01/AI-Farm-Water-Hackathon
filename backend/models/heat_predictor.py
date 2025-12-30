"""
ML Model for predicting heat spikes in server areas based on historical data.
Uses time-series analysis and pattern recognition to predict when and where heat spikes will occur.
Enhanced with Gradient Boosting, better feature engineering, and dual models (regression + classification).
"""

# Fix OpenBLAS threading issues on macOS (must be before numpy import)
import os
os.environ.setdefault('OPENBLAS_NUM_THREADS', '1')
os.environ.setdefault('OMP_NUM_THREADS', '1')
os.environ.setdefault('MKL_NUM_THREADS', '1')
os.environ.setdefault('VECLIB_MAXIMUM_THREADS', '1')
os.environ.setdefault('NUMEXPR_NUM_THREADS', '1')

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import os
import json
from datetime import datetime, timedelta
import joblib
import sys

# Try to import optional sklearn components
try:
    from sklearn.model_selection import train_test_split
    HAS_TRAIN_TEST_SPLIT = True
except (ImportError, OSError):
    HAS_TRAIN_TEST_SPLIT = False

try:
    from sklearn.metrics import mean_absolute_error, r2_score, precision_score, recall_score, f1_score
    HAS_METRICS = True
except (ImportError, OSError):
    HAS_METRICS = False

# Try to import GradientBoosting, fallback to RandomForest if not available
try:
    from sklearn.ensemble import GradientBoostingRegressor, GradientBoostingClassifier
    USE_GRADIENT_BOOSTING = True
except (ImportError, OSError):
    USE_GRADIENT_BOOSTING = False

# Add scripts dir to path to import seed_data
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'scripts'))
try:
    from seed_data import generate_synthetic_data
except ImportError:
    pass

class HeatSpikePredictor:
    def __init__(self):
        # Dual model approach: Regression for temperature prediction, Classification for spike probability
        if USE_GRADIENT_BOOSTING:
            # Gradient Boosting generally performs better than Random Forest for time-series
            self.temp_model = GradientBoostingRegressor(
                n_estimators=300,
                learning_rate=0.05,
                max_depth=8,
                min_samples_split=10,
                min_samples_leaf=4,
                subsample=0.8,
                random_state=42,
                verbose=0
            )
            
            # Classification model for spike prediction (more accurate than derived probability)
            self.spike_classifier = GradientBoostingClassifier(
                n_estimators=200,
                learning_rate=0.05,
                max_depth=6,
                min_samples_split=10,
                min_samples_leaf=4,
                subsample=0.8,
                random_state=42,
                verbose=0
            )
        else:
            # Fallback to RandomForest (more stable, works everywhere)
            self.temp_model = RandomForestRegressor(
                n_estimators=300,
                max_depth=15,
                min_samples_split=10,
                min_samples_leaf=4,
                random_state=42,
                n_jobs=-1
            )
            
            self.spike_classifier = RandomForestClassifier(
                n_estimators=200,
                max_depth=12,
                min_samples_split=10,
                min_samples_leaf=4,
                random_state=42,
                n_jobs=-1
            )
        
        self.scaler = StandardScaler()
        self.is_trained = False
        self.data_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'heat_spikes.csv')
        self.model_metrics = {
            'temp_mae': None,
            'temp_r2': None,
            'spike_precision': None,
            'spike_recall': None,
            'spike_f1': None
        }
        
    def _load_data(self):
        """Load historical heat spike data"""
        try:
            if os.path.exists(self.data_file):
                df = pd.read_csv(self.data_file)
                # Handle empty CSV files
                if df.empty:
                    return pd.DataFrame(columns=['timestamp', 'server_area', 'temperature', 'time_of_day', 'day_of_week'])
                # Convert timestamp column if it exists
                if 'timestamp' in df.columns:
                    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
                    # Drop rows with invalid timestamps
                    df = df.dropna(subset=['timestamp'])
                return df
            return pd.DataFrame(columns=['timestamp', 'server_area', 'temperature', 'time_of_day', 'day_of_week'])
        except Exception as e:
            print(f"Error loading data from {self.data_file}: {e}")
            import traceback
            traceback.print_exc()
            # Return empty dataframe on error
            return pd.DataFrame(columns=['timestamp', 'server_area', 'temperature', 'time_of_day', 'day_of_week'])
    
    def _get_neighbors(self, id):
        """Get list of neighbor IDs (up, down, left, right)"""
        neighbors = []
        rack_id = id // 6
        pos_in_rack = id % 6
        if pos_in_rack < 5: neighbors.append(id + 1)
        if pos_in_rack > 0: neighbors.append(id - 1)
        if rack_id < 3: neighbors.append(id + 6)
        if rack_id > 0: neighbors.append(id - 6)
        return neighbors

    def _create_features(self, df):
        """Create enhanced features from historical data for ML model"""
        df = df.copy()
        df['hour'] = df['timestamp'].dt.hour
        df['day_of_week'] = df['timestamp'].dt.dayofweek
        df['minute'] = df['timestamp'].dt.minute
        
        # Enhanced time-based features
        df['is_weekend'] = (df['day_of_week'] >= 5).astype(int)
        df['is_business_hours'] = ((df['hour'] >= 9) & (df['hour'] <= 17)).astype(int)
        df['is_night'] = ((df['hour'] >= 22) | (df['hour'] <= 6)).astype(int)
        df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
        df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
        df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
        df['day_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
        
        # Sort for lag features
        df = df.sort_values(['server_area', 'timestamp'])
        
        # 1. Enhanced Temporal Lags (Self)
        for lag in [1, 2, 3, 5, 10]:
            df[f'temp_lag_{lag}'] = df.groupby('server_area')['temperature'].shift(lag)
        
        # 2. Enhanced Rolling Stats (Self)
        for window in [3, 6, 12, 24]:
            df[f'rolling_mean_{window}'] = df.groupby('server_area')['temperature'].transform(
                lambda x: x.rolling(window=window, min_periods=1).mean()
            )
            df[f'rolling_std_{window}'] = df.groupby('server_area')['temperature'].transform(
                lambda x: x.rolling(window=window, min_periods=1).std().fillna(0)
            )
            df[f'rolling_max_{window}'] = df.groupby('server_area')['temperature'].transform(
                lambda x: x.rolling(window=window, min_periods=1).max()
            )
            df[f'rolling_min_{window}'] = df.groupby('server_area')['temperature'].transform(
                lambda x: x.rolling(window=window, min_periods=1).min()
            )
        
        # 3. Trend Features
        df['temp_change_1'] = df.groupby('server_area')['temperature'].diff(1)
        df['temp_change_3'] = df.groupby('server_area')['temperature'].diff(3)
        df['temp_acceleration'] = df.groupby('server_area')['temp_change_1'].diff(1)
        
        # 4. Spike History Features
        df['is_spike'] = (df['temperature'] > 85.0).astype(int)
        df['spikes_last_10'] = df.groupby('server_area')['is_spike'].transform(
            lambda x: x.rolling(window=10, min_periods=1).sum()
        )
        df['spikes_last_24'] = df.groupby('server_area')['is_spike'].transform(
            lambda x: x.rolling(window=24, min_periods=1).sum()
        )
        
        # Time since last spike
        def calc_time_since_spike(group):
            try:
                spike_indices = group[group['is_spike'] == 1].index
                if len(spike_indices) == 0:
                    return pd.Series([999.0] * len(group), index=group.index)
                
                result = pd.Series([999.0] * len(group), index=group.index)
                for idx in spike_indices:
                    spike_time = group.loc[idx, 'timestamp']
                    mask = group.index >= idx
                    time_diffs = (group.loc[mask, 'timestamp'] - spike_time).dt.total_seconds() / 3600
                    result.loc[mask] = time_diffs.values
                return result
            except:
                return pd.Series([999.0] * len(group), index=group.index)
        
        try:
            df['time_since_spike'] = df.groupby('server_area', group_keys=False).apply(calc_time_since_spike)
        except:
            df['time_since_spike'] = 999.0
        
        # 5. SPATIAL FEATURES (Neighbors) - Optimized
        try:
            pivot_df = df.pivot(index='timestamp', columns='server_area', values='temperature')
            pivot_df = pivot_df.ffill().fillna(70.0)
            
            # Calculate neighbor statistics for each server area
            neighbor_means = {}
            neighbor_maxs = {}
            neighbor_stds = {}
            neighbor_spikes = {}
            
            for area_id in range(24):
                neighbors = self._get_neighbors(area_id)
                if neighbors and area_id in pivot_df.columns:
                    available_neighbors = [n for n in neighbors if n in pivot_df.columns]
                    if available_neighbors:
                        neighbor_means[area_id] = pivot_df[available_neighbors].mean(axis=1)
                        neighbor_maxs[area_id] = pivot_df[available_neighbors].max(axis=1)
                        neighbor_stds[area_id] = pivot_df[available_neighbors].std(axis=1).fillna(0)
                        neighbor_spikes[area_id] = (pivot_df[available_neighbors] > 85).sum(axis=1)
                    else:
                        neighbor_means[area_id] = pd.Series(70.0, index=pivot_df.index)
                        neighbor_maxs[area_id] = pd.Series(70.0, index=pivot_df.index)
                        neighbor_stds[area_id] = pd.Series(0, index=pivot_df.index)
                        neighbor_spikes[area_id] = pd.Series(0, index=pivot_df.index)
                else:
                    if area_id in pivot_df.columns:
                        neighbor_means[area_id] = pivot_df[area_id]
                        neighbor_maxs[area_id] = pivot_df[area_id]
                    else:
                        neighbor_means[area_id] = pd.Series(70.0, index=pivot_df.index)
                        neighbor_maxs[area_id] = pd.Series(70.0, index=pivot_df.index)
                    neighbor_stds[area_id] = pd.Series(0, index=pivot_df.index)
                    neighbor_spikes[area_id] = pd.Series(0, index=pivot_df.index)
        except Exception as e:
            # Fallback: create dummy spatial features
            print(f"Warning: Spatial feature calculation failed: {e}")
            neighbor_means = {i: pd.Series(70.0, index=df['timestamp'].unique()) for i in range(24)}
            neighbor_maxs = {i: pd.Series(70.0, index=df['timestamp'].unique()) for i in range(24)}
            neighbor_stds = {i: pd.Series(0, index=df['timestamp'].unique()) for i in range(24)}
            neighbor_spikes = {i: pd.Series(0, index=df['timestamp'].unique()) for i in range(24)}
        
        # Map back to original df - simpler approach
        spatial_df = pd.DataFrame(neighbor_means).stack().reset_index()
        spatial_df.columns = ['timestamp', 'server_area', 'neighbor_mean_temp']
        spatial_df['server_area'] = spatial_df['server_area'].astype(int)
        
        # Add other neighbor features
        neighbor_max_df = pd.DataFrame(neighbor_maxs).stack().reset_index()
        neighbor_max_df.columns = ['timestamp', 'server_area', 'neighbor_max_temp']
        neighbor_max_df['server_area'] = neighbor_max_df['server_area'].astype(int)
        
        neighbor_std_df = pd.DataFrame(neighbor_stds).stack().reset_index()
        neighbor_std_df.columns = ['timestamp', 'server_area', 'neighbor_std_temp']
        neighbor_std_df['server_area'] = neighbor_std_df['server_area'].astype(int)
        
        neighbor_spike_df = pd.DataFrame(neighbor_spikes).stack().reset_index()
        neighbor_spike_df.columns = ['timestamp', 'server_area', 'neighbor_spike_count']
        neighbor_spike_df['server_area'] = neighbor_spike_df['server_area'].astype(int)
        
        df = pd.merge(df, spatial_df, on=['timestamp', 'server_area'], how='left')
        df = pd.merge(df, neighbor_max_df, on=['timestamp', 'server_area'], how='left')
        df = pd.merge(df, neighbor_std_df, on=['timestamp', 'server_area'], how='left')
        df = pd.merge(df, neighbor_spike_df, on=['timestamp', 'server_area'], how='left')
        
        # Fill NaN values
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        df[numeric_cols] = df[numeric_cols].fillna(0)
        
        return df
    
    def train(self, force_retrain=False):
        """Train the dual models on historical data"""
        # Check if model is already trained and data hasn't changed
        if not force_retrain and self.is_trained:
            # Check if data file exists and get its modification time
            if os.path.exists(self.data_file):
                import time
                file_mtime = os.path.getmtime(self.data_file)
                # If model was trained after data was last modified, skip retraining
                if hasattr(self, '_last_train_time') and self._last_train_time > file_mtime:
                    print("Model is already trained and data hasn't changed. Use force_retrain=True to retrain.")
                    return
        
        df = self._load_data()
        
        # Auto-seed if empty
        if len(df) < 50:
            print("Insufficient data found. Generating synthetic training data...")
            try:
                generate_synthetic_data(num_samples=2000) # Generates ~48k rows (24 servers * 2000 steps)
                df = self._load_data()
            except Exception as e:
                print(f"Failed to seed data: {e}")
                
        if len(df) < 100:
            self.is_trained = False
            return
        
        # Clean and optimize data BEFORE feature creation (much faster!)
        print(f"Cleaning and optimizing dataset ({len(df):,} records)...")
        original_len = len(df)
        
        # Remove duplicates first (fastest operation)
        df = df.drop_duplicates(subset=['timestamp', 'server_area'], keep='last')
        print(f"  • Removed {original_len - len(df):,} duplicates")
        
        # Remove outliers (temperatures outside realistic server range)
        before_outliers = len(df)
        df = df[(df['temperature'] >= 50) & (df['temperature'] <= 120)]
        print(f"  • Removed {before_outliers - len(df):,} outliers")
        
        # Sort by timestamp for efficient processing
        df = df.sort_values(['server_area', 'timestamp']).reset_index(drop=True)
        
        # For very large datasets, use intelligent sampling BEFORE feature creation
        if len(df) > 100000:
            # Keep all recent data (last 30 days) and sample older data
            df['timestamp'] = pd.to_datetime(df['timestamp'])
            cutoff_date = df['timestamp'].max() - pd.Timedelta(days=30)
            recent_data = df[df['timestamp'] >= cutoff_date]
            old_data = df[df['timestamp'] < cutoff_date]
            
            # Sample old data to keep it manageable
            if len(old_data) > 50000:
                old_data = old_data.sample(n=50000, random_state=42)
            
            df = pd.concat([recent_data, old_data]).sort_values(['server_area', 'timestamp']).reset_index(drop=True)
            print(f"  • Sampled to {len(df):,} records (kept all recent + sampled older data)")
        
        print(f"✓ Cleaned dataset: {len(df):,} records ready for training")
        
        print("Preprocessing data and creating enhanced features...")
        df = self._create_features(df)
        
        # Remove rows with too many NaN values (keep at least 50% valid features)
        df = df.dropna(subset=['temperature', 'timestamp', 'server_area'])
        
        if len(df) < 50:
            self.is_trained = False
            return
        
        # Enhanced feature list
        feature_cols = [
            'hour', 'day_of_week', 'minute',
            'is_weekend', 'is_business_hours', 'is_night',
            'hour_sin', 'hour_cos', 'day_sin', 'day_cos',
            'temp_lag_1', 'temp_lag_2', 'temp_lag_3', 'temp_lag_5',
            'rolling_mean_3', 'rolling_mean_6', 'rolling_mean_12',
            'rolling_std_3', 'rolling_std_6', 'rolling_std_12',
            'rolling_max_3', 'rolling_max_6',
            'rolling_min_3', 'rolling_min_6',
            'temp_change_1', 'temp_change_3', 'temp_acceleration',
            'spikes_last_10', 'spikes_last_24', 'time_since_spike',
            'neighbor_mean_temp', 'neighbor_max_temp', 'neighbor_std_temp', 'neighbor_spike_count'
        ]
        
        available_features = [f for f in feature_cols if f in df.columns]
        
        # Fill remaining NaN values
        df[available_features] = df[available_features].fillna(0)
        
        X = df[available_features].values
        y_temp = df['temperature'].values
        y_spike = (df['temperature'] > 85.0).astype(int)  # Binary classification target
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Split data for evaluation
        if HAS_TRAIN_TEST_SPLIT and len(df) > 200:
            X_train, X_test, y_temp_train, y_temp_test, y_spike_train, y_spike_test = train_test_split(
                X_scaled, y_temp, y_spike, test_size=0.2, random_state=42, stratify=None
            )
        else:
            X_train, X_test = X_scaled, X_scaled
            y_temp_train, y_temp_test = y_temp, y_temp
            y_spike_train, y_spike_test = y_spike, y_spike
        
        # Train temperature regression model
        model_type = "Gradient Boosting" if USE_GRADIENT_BOOSTING else "Random Forest"
        print(f"Training {model_type} Regressor for temperature prediction...")
        self.temp_model.fit(X_train, y_temp_train)
        
        # Train spike classification model
        print(f"Training {model_type} Classifier for spike prediction...")
        self.spike_classifier.fit(X_train, y_spike_train)
        
        # Evaluate models
        if HAS_METRICS and len(X_test) > 0:
            try:
                y_temp_pred = self.temp_model.predict(X_test)
                y_spike_pred = self.spike_classifier.predict(X_test)
                
                self.model_metrics['temp_mae'] = mean_absolute_error(y_temp_test, y_temp_pred)
                self.model_metrics['temp_r2'] = r2_score(y_temp_test, y_temp_pred)
                self.model_metrics['spike_precision'] = precision_score(y_spike_test, y_spike_pred, zero_division=0)
                self.model_metrics['spike_recall'] = recall_score(y_spike_test, y_spike_pred, zero_division=0)
                self.model_metrics['spike_f1'] = f1_score(y_spike_test, y_spike_pred, zero_division=0)
                
                print(f"\nModel Performance Metrics:")
                print(f"  Temperature Prediction - MAE: {self.model_metrics['temp_mae']:.2f}°F, R²: {self.model_metrics['temp_r2']:.3f}")
                print(f"  Spike Classification - Precision: {self.model_metrics['spike_precision']:.3f}, "
                      f"Recall: {self.model_metrics['spike_recall']:.3f}, F1: {self.model_metrics['spike_f1']:.3f}")
            except Exception as e:
                print(f"Warning: Could not calculate metrics: {e}")
        
        self.is_trained = True
        self.feature_cols = available_features
        
        # Record training time
        import time
        self._last_train_time = time.time()
        
        print(f"\n✓ Models trained on {len(df)} samples with {len(available_features)} features.")
        
        # Save model (optional/future)
    
    def predict(self, server_area, current_time=None):
        """Predict heat spike likelihood using dual models"""
        if not self.is_trained:
            return {'predicted_temperature': 70.0, 'spike_probability': 0.1, 'confidence': 0.0}
        
        if current_time is None:
            current_time = datetime.now()
        
        df = self._load_data()
        
        # Get recent history for this area to build lag features
        area_data = df[df['server_area'] == server_area].tail(24).copy()
        
        # Get neighbor data for spatial features
        neighbors = self._get_neighbors(server_area)
        neighbor_temps = []
        neighbor_spikes = 0
        if neighbors:
            # Get latest temp for each neighbor
            for n_id in neighbors:
                n_data = df[df['server_area'] == n_id].tail(1)
                if not n_data.empty:
                    temp = n_data.iloc[-1]['temperature']
                    neighbor_temps.append(temp)
                    if temp > 85:
                        neighbor_spikes += 1
        
        neighbor_mean = np.mean(neighbor_temps) if neighbor_temps else 70.0
        neighbor_max = np.max(neighbor_temps) if neighbor_temps else 70.0
        neighbor_std = np.std(neighbor_temps) if len(neighbor_temps) > 1 else 0.0
        
        # Build enhanced feature vector
        if len(area_data) > 0:
            recent_temps = area_data['temperature'].values
            temp_lag_1 = recent_temps[-1] if len(recent_temps) >= 1 else 70.0
            temp_lag_2 = recent_temps[-2] if len(recent_temps) >= 2 else 70.0
            temp_lag_3 = recent_temps[-3] if len(recent_temps) >= 3 else 70.0
            temp_lag_5 = recent_temps[-5] if len(recent_temps) >= 5 else 70.0
            
            rolling_mean_3 = np.mean(recent_temps[-3:]) if len(recent_temps) >= 3 else temp_lag_1
            rolling_mean_6 = np.mean(recent_temps[-6:]) if len(recent_temps) >= 6 else temp_lag_1
            rolling_mean_12 = np.mean(recent_temps[-12:]) if len(recent_temps) >= 12 else temp_lag_1
            
            rolling_std_3 = np.std(recent_temps[-3:]) if len(recent_temps) >= 3 else 0.0
            rolling_std_6 = np.std(recent_temps[-6:]) if len(recent_temps) >= 6 else 0.0
            rolling_std_12 = np.std(recent_temps[-12:]) if len(recent_temps) >= 12 else 0.0
            
            rolling_max_3 = np.max(recent_temps[-3:]) if len(recent_temps) >= 3 else temp_lag_1
            rolling_max_6 = np.max(recent_temps[-6:]) if len(recent_temps) >= 6 else temp_lag_1
            
            rolling_min_3 = np.min(recent_temps[-3:]) if len(recent_temps) >= 3 else temp_lag_1
            rolling_min_6 = np.min(recent_temps[-6:]) if len(recent_temps) >= 6 else temp_lag_1
            
            temp_change_1 = temp_lag_1 - temp_lag_2 if len(recent_temps) >= 2 else 0.0
            temp_change_3 = temp_lag_1 - temp_lag_3 if len(recent_temps) >= 3 else 0.0
            temp_acceleration = temp_change_1 - (temp_lag_2 - temp_lag_3) if len(recent_temps) >= 3 else 0.0
            
            spikes_last_10 = np.sum(recent_temps[-10:] > 85) if len(recent_temps) >= 10 else np.sum(recent_temps > 85)
            spikes_last_24 = np.sum(recent_temps > 85) if len(recent_temps) >= 24 else np.sum(recent_temps > 85)
            
            # Time since last spike
            spike_indices = np.where(recent_temps > 85)[0]
            if len(spike_indices) > 0:
                time_since_spike = len(recent_temps) - spike_indices[-1] - 1
            else:
                time_since_spike = 999
        else:
            temp_lag_1 = temp_lag_2 = temp_lag_3 = temp_lag_5 = 70.0
            rolling_mean_3 = rolling_mean_6 = rolling_mean_12 = 70.0
            rolling_std_3 = rolling_std_6 = rolling_std_12 = 0.0
            rolling_max_3 = rolling_max_6 = 70.0
            rolling_min_3 = rolling_min_6 = 70.0
            temp_change_1 = temp_change_3 = temp_acceleration = 0.0
            spikes_last_10 = spikes_last_24 = 0
            time_since_spike = 999
        
        # Build feature dictionary
        features = {
            'hour': current_time.hour,
            'day_of_week': current_time.weekday(),
            'minute': current_time.minute,
            'is_weekend': 1 if current_time.weekday() >= 5 else 0,
            'is_business_hours': 1 if 9 <= current_time.hour <= 17 else 0,
            'is_night': 1 if current_time.hour >= 22 or current_time.hour <= 6 else 0,
            'hour_sin': np.sin(2 * np.pi * current_time.hour / 24),
            'hour_cos': np.cos(2 * np.pi * current_time.hour / 24),
            'day_sin': np.sin(2 * np.pi * current_time.weekday() / 7),
            'day_cos': np.cos(2 * np.pi * current_time.weekday() / 7),
            'temp_lag_1': temp_lag_1,
            'temp_lag_2': temp_lag_2,
            'temp_lag_3': temp_lag_3,
            'temp_lag_5': temp_lag_5,
            'rolling_mean_3': rolling_mean_3,
            'rolling_mean_6': rolling_mean_6,
            'rolling_mean_12': rolling_mean_12,
            'rolling_std_3': rolling_std_3,
            'rolling_std_6': rolling_std_6,
            'rolling_std_12': rolling_std_12,
            'rolling_max_3': rolling_max_3,
            'rolling_max_6': rolling_max_6,
            'rolling_min_3': rolling_min_3,
            'rolling_min_6': rolling_min_6,
            'temp_change_1': temp_change_1,
            'temp_change_3': temp_change_3,
            'temp_acceleration': temp_acceleration,
            'spikes_last_10': spikes_last_10,
            'spikes_last_24': spikes_last_24,
            'time_since_spike': time_since_spike,
            'neighbor_mean_temp': neighbor_mean,
            'neighbor_max_temp': neighbor_max,
            'neighbor_std_temp': neighbor_std,
            'neighbor_spike_count': neighbor_spikes
        }
        
        # Use the feature columns from training
        feature_cols = getattr(self, 'feature_cols', [
            'hour', 'day_of_week', 'is_weekend', 'is_business_hours',
            'temp_lag_1', 'temp_lag_2', 'temp_lag_3',
            'rolling_mean_3', 'rolling_mean_6', 'neighbor_mean_temp'
        ])
        
        X = np.array([[features.get(f, 0) for f in feature_cols]])
        
        try:
            X_scaled = self.scaler.transform(X)
            
            # Predict temperature using regression model
            predicted_temp = self.temp_model.predict(X_scaled)[0]
            
            # Predict spike probability using classification model
            spike_proba = self.spike_classifier.predict_proba(X_scaled)[0, 1]
            
            # Calculate confidence based on model metrics
            if self.model_metrics['temp_r2'] is not None:
                confidence = min(0.95, max(0.5, self.model_metrics['temp_r2'] * 0.9 + self.model_metrics['spike_f1'] * 0.1))
            else:
                confidence = 0.85
            
        except Exception as e:
            print(f"Prediction Error: {e}")
            return {'predicted_temperature': 70.0, 'spike_probability': 0.0, 'confidence': 0.0}
            
        return {
            'predicted_temperature': float(predicted_temp),
            'spike_probability': float(spike_proba),
            'confidence': float(confidence)
        }

    def get_metrics(self):
        """Get model performance metrics"""
        return self.model_metrics.copy()
    
    def record_heat_spike(self, server_area, temperature, timestamp=None):
        if timestamp is None: timestamp = datetime.now()
        
        df = self._load_data()
        new_record = pd.DataFrame([{
            'timestamp': timestamp,
            'server_area': server_area,
            'temperature': temperature,
            'time_of_day': timestamp.hour,
            'day_of_week': timestamp.weekday()
        }])
        
        if df.empty: df = new_record
        else: df = pd.concat([df, new_record], ignore_index=True)
        
        os.makedirs(os.path.dirname(self.data_file), exist_ok=True)
        df.to_csv(self.data_file, index=False)
