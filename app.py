"""
Flask backend API server for AI Farm Water Management System
"""

# Fix OpenBLAS threading issues on macOS (prevents segfaults)
import os
os.environ.setdefault('OPENBLAS_NUM_THREADS', '1')
os.environ.setdefault('OMP_NUM_THREADS', '1')
os.environ.setdefault('MKL_NUM_THREADS', '1')
os.environ.setdefault('VECLIB_MAXIMUM_THREADS', '1')
os.environ.setdefault('NUMEXPR_NUM_THREADS', '1')

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from datetime import datetime
import random
import threading
import time
import pandas as pd
import numpy as np
from models.heat_predictor import HeatSpikePredictor

app = Flask(__name__, static_folder='frontend')
CORS(app)

# Helper to sanitize JSON response
def sanitize_float(val):
    if isinstance(val, float) and (np.isnan(val) or np.isinf(val)):
        return None
    return val

def sanitize_dict(d):
    return {k: sanitize_float(v) if isinstance(v, (float, int)) else (sanitize_dict(v) if isinstance(v, dict) else v) for k, v in d.items()}

# Initialize the ML predictor
predictor = HeatSpikePredictor()
predictor.train()

# Simulated server state (24 server areas)
server_state = {
    'areas': [
        {'id': i, 'current_temp': 72.0 + random.uniform(-2, 2), 'water_active': False}
        for i in range(24)
    ],
    'simulation_active': False,
    'system_mode': 'standard',  # 'standard' (reactive) or 'ai' (predictive)
    'auto_spikes_enabled': True # Toggle for automatic random spikes
}

# Simulation thread
simulation_thread = None
HEAT_TRANSFER_RATE = 0.05
VULNERABLE_SERVERS = [4, 9, 14, 19]

def get_neighbors(id):
    """Get list of neighbor IDs (up, down, left, right)"""
    neighbors = []
    rack_id = id // 6
    pos_in_rack = id % 6
    
    # Vertical neighbors (same rack)
    if pos_in_rack < 5: neighbors.append(id + 1) # Above
    if pos_in_rack > 0: neighbors.append(id - 1) # Below
    
    # Horizontal neighbors (adjacent racks)
    # Racks are 0, 1, 2, 3. So +/- 6 is next/prev rack
    if rack_id < 3: neighbors.append(id + 6) # Right Rack
    if rack_id > 0: neighbors.append(id - 6) # Left Rack
        
    return neighbors

def generate_random_heat_spike():
    """Generate a heat spike, favoring vulnerable servers to create a learnable pattern"""
    # 80% chance it matches our "Vulnerable Server" pattern
    if random.random() < 0.8:
        area_id = random.choice(VULNERABLE_SERVERS)
    else:
        area_id = random.randint(0, 23)
        
    temperature = random.uniform(88, 98)
    return area_id, temperature

def simulation_loop():
    """Background simulation loop that generates random heat spikes and manages cooling"""
    global server_state
    
    while server_state['simulation_active']:
        # Occasionally generate a heat spike (Random Event)
        # ONLY IF auto_spikes_enabled is True
        if server_state['auto_spikes_enabled'] and random.random() < 0.15:  # 15% chance
            area_id, temperature = generate_random_heat_spike()
            # Only apply if not currently being cooled effectively
            if not server_state['areas'][area_id]['water_active']:
                 server_state['areas'][area_id]['current_temp'] = temperature
                 # Record in ML model
                 predictor.record_heat_spike(area_id, temperature)
            
        # --- HEAT SPREAD (DIFFUSION) ---
        # Calculate deltas first (synchronous update)
        heat_deltas = {i: 0.0 for i in range(24)}
        
        for area in server_state['areas']:
            id = area['id']
            current_temp = area['current_temp']
            neighbors = get_neighbors(id)
            
            for n_id in neighbors:
                neighbor_temp = server_state['areas'][n_id]['current_temp']
                # Heat flows from hot to cold
                if neighbor_temp > current_temp:
                    # Absorb heat from hotter neighbor
                    diff = neighbor_temp - current_temp
                    heat_deltas[id] += diff * HEAT_TRANSFER_RATE

        # Apply Heat Spread
        for id, delta in heat_deltas.items():
            if not server_state['areas'][id]['water_active']: # Don't heat up if active cooling is winning
                 server_state['areas'][id]['current_temp'] += delta

        # Manage Cooling & Temperature Drift
        for area in server_state['areas']:
            area_id = area['id']
            
            # --- AUTO-COOLING LOGIC ---
            if server_state['system_mode'] == 'standard':
                # REACTIVE: If hot (>85), turn on water
                if area['current_temp'] > 85.0 and not area['water_active']:
                    area['water_active'] = True
                    print(f"[Standard] Reactive cooling activated for Server {area_id} at {area['current_temp']:.1f}F")
                    
            elif server_state['system_mode'] == 'ai':
                # PREDICTIVE: Check ML model
                pred = predictor.predict(area_id)
                
                # Logic: High probability predicts spike OR Failsafe (Reactive backup)
                predictive_trigger = pred['spike_probability'] > 0.7
                failsafe_trigger = area['current_temp'] > 85.0
                
                if (predictive_trigger or failsafe_trigger) and not area['water_active']:
                    area['water_active'] = True
                    
                    if predictive_trigger:
                        print(f"[AI] PREDICTIVE cooling activated for Server {area_id} (Prob: {pred['spike_probability']:.2f})")
                    else:
                        print(f"[AI] FAILSAFE cooling activated for Server {area_id} (Temp: {area['current_temp']:.1f}F)")

            # --- PHYSICS ---
            if area['water_active']:
                # Cooling down
                area['current_temp'] = max(65, area['current_temp'] - random.uniform(2.0, 4.0)) # Faster cooling
                # Auto-turn off when cool enough
                if area['current_temp'] <= 68.0:
                    area['water_active'] = False
            else:
                # Normal temperature drift
                target_temp = 72.0 + random.uniform(-1, 1)
                # Drift slower
                if area['current_temp'] > target_temp:
                    area['current_temp'] -= random.uniform(0.1, 0.3)
                elif area['current_temp'] < target_temp:
                    area['current_temp'] += random.uniform(0.1, 0.3)
        
        time.sleep(1)  # Faster updates (1s)

@app.route('/api/status', methods=['GET'])
def get_status():
    """Get current server status and predictions"""
    predictions = {}
    
    for area_id in range(24): # Updated loop for 24 servers
        prediction = predictor.predict(area_id)
        predictions[area_id] = prediction
    
    return jsonify(sanitize_dict({
        'areas': server_state['areas'],
        'predictions': predictions,
        'simulation_active': server_state['simulation_active'],
        'system_mode': server_state['system_mode'],
        'auto_spikes_enabled': server_state['auto_spikes_enabled']
    }))

@app.route('/api/simulation/toggle-spikes', methods=['POST'])
def toggle_spikes():
    """Toggle automatic heat spike generation"""
    try:
        data = request.json
        enabled = data.get('enabled')
        if enabled is None:
            return jsonify({'status': 'error', 'message': 'Missing enabled flag'}), 400
        
        server_state['auto_spikes_enabled'] = bool(enabled)
        state_str = "enabled" if enabled else "disabled"
        return jsonify({'status': 'success', 'enabled': enabled, 'message': f'Auto-spikes {state_str}'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/mode', methods=['POST'])
def set_mode():
    """Set the system mode (standard vs ai)"""
    try:
        data = request.json
        mode = data.get('mode')
        if mode not in ['standard', 'ai']:
            return jsonify({'status': 'error', 'message': 'Invalid mode'}), 400
        
        server_state['system_mode'] = mode
        return jsonify({'status': 'success', 'mode': mode, 'message': f'Switched to {mode.upper()} mode'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/predict', methods=['GET'])
def get_predictions():
    """Get heat spike predictions for all server areas"""
    predictions = {}
    
    for area_id in range(24):
        prediction = predictor.predict(area_id)
        predictions[area_id] = prediction
    
    return jsonify(sanitize_dict(predictions))

@app.route('/api/heat-spike', methods=['POST'])
def record_heat_spike():
    """Record a new heat spike event"""
    try:
        data = request.json
        if not data:
            return jsonify({'status': 'error', 'message': 'No data provided'}), 400
        
        area_id = data.get('server_area')
        temperature = data.get('temperature')
        timestamp = data.get('timestamp')
        
        # Validate inputs
        if area_id is None or temperature is None:
            return jsonify({'status': 'error', 'message': 'Missing required fields: server_area and temperature'}), 400
        
        if not isinstance(area_id, int) or area_id < 0 or area_id >= 24: # Updated check
            return jsonify({'status': 'error', 'message': 'Invalid server_area (must be 0-23)'}), 400
        
        if not isinstance(temperature, (int, float)) or temperature < 0 or temperature > 200:
            return jsonify({'status': 'error', 'message': 'Invalid temperature'}), 400
        
        if timestamp:
            try:
                timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
            except ValueError:
                return jsonify({'status': 'error', 'message': 'Invalid timestamp format'}), 400
        
        predictor.record_heat_spike(area_id, temperature, timestamp)
        
        # Update server state
        if 0 <= area_id < len(server_state['areas']):
            server_state['areas'][area_id]['current_temp'] = temperature
        
        return jsonify({'status': 'recorded', 'message': 'Heat spike recorded successfully'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get historical heat spike data"""
    df = predictor._load_data()
    
    # Convert to list of dicts (handle empty dataframe)
    if df.empty:
        history = []
    else:
        history = df.tail(100).to_dict('records')
    
    # Convert datetime to string
    for record in history:
        if 'timestamp' in record and pd.notna(record['timestamp']):
            record['timestamp'] = record['timestamp'].isoformat()
    
    return jsonify(history)

@app.route('/api/cooling/activate', methods=['POST'])
def activate_cooling():
    """Activate water cooling for a specific server area"""
    try:
        data = request.json or {}
        area_id = data.get('area_id')
        
        if area_id is None:
            return jsonify({'status': 'error', 'message': 'Missing area_id'}), 400
        
        if not isinstance(area_id, int) or area_id < 0 or area_id >= len(server_state['areas']):
            return jsonify({'status': 'error', 'message': 'Invalid area ID (must be 0-7)'}), 400
        
        server_state['areas'][area_id]['water_active'] = True
        return jsonify({'status': 'activated', 'area_id': area_id})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/cooling/deactivate', methods=['POST'])
def deactivate_cooling():
    """Deactivate water cooling for a specific server area"""
    try:
        data = request.json or {}
        area_id = data.get('area_id')
        
        if area_id is None:
            return jsonify({'status': 'error', 'message': 'Missing area_id'}), 400
        
        if not isinstance(area_id, int) or area_id < 0 or area_id >= len(server_state['areas']):
            return jsonify({'status': 'error', 'message': 'Invalid area ID (must be 0-7)'}), 400
        
        server_state['areas'][area_id]['water_active'] = False
        return jsonify({'status': 'deactivated', 'area_id': area_id})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/simulation/start', methods=['POST'])
def start_simulation():
    """Start the simulation"""
    global simulation_thread, server_state
    
    if not server_state['simulation_active']:
        server_state['simulation_active'] = True
        simulation_thread = threading.Thread(target=simulation_loop, daemon=True)
        simulation_thread.start()
        return jsonify({'status': 'started', 'message': 'Simulation started'})
    
    return jsonify({'status': 'already_running', 'message': 'Simulation already running'})

@app.route('/api/simulation/stop', methods=['POST'])
def stop_simulation():
    """Stop the simulation"""
    global server_state
    server_state['simulation_active'] = False
    return jsonify({'status': 'stopped', 'message': 'Simulation stopped'})

@app.route('/api/simulation/trigger-spike', methods=['POST'])
def trigger_spike():
    """Trigger a random heat spike manually"""
    global server_state
    area_id, temperature = generate_random_heat_spike()
    server_state['areas'][area_id]['current_temp'] = temperature
    predictor.record_heat_spike(area_id, temperature)
    return jsonify({
        'status': 'triggered', 
        'message': f'Heat spike triggered on Server {area_id} ({temperature:.1f}°F)',
        'area_id': area_id,
        'temperature': temperature
    })

@app.route('/api/model/retrain', methods=['POST'])
def retrain_model():
    """Retrain the ML model"""
    predictor.train(force_retrain=True)
    return jsonify({'status': 'retrained', 'message': 'Model retrained successfully'})

@app.route('/')
def index():
    """Serve the main frontend page"""
    return send_from_directory('frontend', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files from frontend directory"""
    return send_from_directory('frontend', path)

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    print("Starting AI Farm Water Management System...")
    print("Access the frontend at: http://localhost:5001")
    
    app.run(debug=True, host='0.0.0.0', port=5001)
