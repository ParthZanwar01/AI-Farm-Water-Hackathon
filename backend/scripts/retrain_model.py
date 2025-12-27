#!/usr/bin/env python3
"""
Retrain the ML model with progress updates and smart retraining
"""

import sys
import os
import time
from datetime import datetime

# Set environment variables for OpenBLAS (critical for macOS)
os.environ.setdefault('OPENBLAS_NUM_THREADS', '1')
os.environ.setdefault('OMP_NUM_THREADS', '1')
os.environ.setdefault('MKL_NUM_THREADS', '1')
os.environ.setdefault('VECLIB_MAXIMUM_THREADS', '1')
os.environ.setdefault('NUMEXPR_NUM_THREADS', '1')

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from models.heat_predictor import HeatSpikePredictor
import pandas as pd

def retrain_with_progress(force=False):
    """Retrain model with visual progress"""
    print('=' * 70)
    print('🔄 Retraining ML Model')
    print('=' * 70)
    print()
    
    # Check data
    data_path = 'data/heat_spikes.csv'
    if not os.path.exists(data_path):
        print('❌ Error: No data file found at', data_path)
        return False
    
    # Step 1: Load dataset
    print('📊 Step 1/5: Loading dataset...', end=' ', flush=True)
    start_time = time.time()
    df = pd.read_csv(data_path)
    load_time = time.time() - start_time
    print(f'✓ ({load_time:.1f}s)')
    print(f'   • {len(df):,} records loaded')
    print(f'   • Temperature range: {df["temperature"].min():.1f}°F - {df["temperature"].max():.1f}°F')
    print(f'   • Heat spikes: {len(df[df["temperature"] > 85]):,} ({len(df[df["temperature"] > 85])/len(df)*100:.1f}%)')
    print()
    
    # Step 2: Initialize predictor
    print('🤖 Step 2/5: Initializing predictor...', end=' ', flush=True)
    predictor = HeatSpikePredictor()
    
    # Check if already trained
    if not force and predictor.is_trained:
        print('✓ (already trained)')
        print()
        print('ℹ️  Model is already trained.')
        print('   Use --force flag to force retraining.')
        print()
        
        # Show current metrics if available
        if hasattr(predictor, 'model_metrics') and predictor.model_metrics:
            metrics = predictor.model_metrics
            print('📊 Current Model Performance:')
            if metrics.get('temp_mae'):
                print(f'   • Temperature MAE: {metrics["temp_mae"]:.2f}°F')
            if metrics.get('temp_r2'):
                print(f'   • Temperature R²: {metrics["temp_r2"]:.3f}')
            if metrics.get('spike_f1'):
                print(f'   • Spike F1-Score: {metrics["spike_f1"]:.3f}')
            print()
        
        return True
    
    print('✓')
    print()
    
    # Step 3: Create features (this is the slow part)
    print('⚙️  Step 3/5: Creating features...')
    print('   This may take 1-3 minutes with large datasets...')
    
    # Step 4: Train models
    print()
    print('🎯 Step 4/5: Training models...')
    print('   Training temperature regression model...', end='\r')
    
    train_start = time.time()
    try:
        predictor.train(force_retrain=force)
        train_time = time.time() - train_start
        
        print('   ✓ Temperature model trained')
        print('   ✓ Spike classifier trained')
        print()
        
        # Step 5: Get metrics
        print('📈 Step 5/5: Evaluating performance...', end=' ', flush=True)
        metrics = predictor.model_metrics  # Access the metrics dictionary directly
        print('✓')
        print()
        
        print('=' * 70)
        print('✅ Model Retrained Successfully!')
        print('=' * 70)
        print(f'⏱️  Total time: {train_time:.1f} seconds ({train_time/60:.1f} minutes)')
        print()
        
        if metrics:
            print('📊 Performance Metrics:')
            print()
            print('   🌡️  Temperature Prediction:')
            if metrics.get('temp_mae'):
                print(f'      • Mean Absolute Error: {metrics["temp_mae"]:.2f}°F')
            if metrics.get('temp_r2'):
                r2 = metrics["temp_r2"]
                quality = "Excellent" if r2 > 0.9 else "Good" if r2 > 0.7 else "Fair"
                print(f'      • R² Score: {r2:.3f} ({quality})')
            print()
            print('   🔥 Heat Spike Classification:')
            if metrics.get('spike_precision'):
                print(f'      • Precision: {metrics["spike_precision"]:.3f}')
            if metrics.get('spike_recall'):
                print(f'      • Recall: {metrics["spike_recall"]:.3f}')
            if metrics.get('spike_f1'):
                f1 = metrics["spike_f1"]
                quality = "Excellent" if f1 > 0.8 else "Good" if f1 > 0.6 else "Fair"
                print(f'      • F1-Score: {f1:.3f} ({quality})')
            print()
        
        print('✅ The model is ready to use!')
        print('   Switch to "AI Predictive" mode for better predictions.')
        return True
        
    except Exception as e:
        print()
        print('❌ Error during training:')
        print(f'   {str(e)}')
        print()
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Retrain the ML model')
    parser.add_argument('--force', action='store_true', help='Force retraining even if model is already trained')
    args = parser.parse_args()
    
    success = retrain_with_progress(force=args.force)
    sys.exit(0 if success else 1)
