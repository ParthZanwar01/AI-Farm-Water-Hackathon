import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

def get_neighbors(id):
    """Get list of neighbor IDs (up, down, left, right)"""
    neighbors = []
    rack_id = id // 6
    pos_in_rack = id % 6
    if pos_in_rack < 5: neighbors.append(id + 1)
    if pos_in_rack > 0: neighbors.append(id - 1)
    if rack_id < 3: neighbors.append(id + 6)
    if rack_id > 0: neighbors.append(id - 6)
    return neighbors

def generate_synthetic_data(num_samples=2000):
    print(f"Generating {num_samples} synthetic data samples with PATTERNS...")
    
    data = []
    start_time = datetime.now() - timedelta(days=7)
    
    # Initialize base temps for all areas
    current_temps = {i: 70.0 + random.uniform(-2, 2) for i in range(24)}
    
    # Define PATTERN: Vulnerable servers that spike often
    vulnerable_servers = [4, 9, 14, 19] 
    
    # Simulation loop
    time_step = timedelta(minutes=5)
    current_timestamp = start_time
    
    for _ in range(num_samples):
        # 1. Heat Spikes with Pattern
        if random.random() < 0.1: # 10% chance of spike event
            # 80% chance it's a vulnerable server
            if random.random() < 0.8:
                target_id = random.choice(vulnerable_servers)
            else:
                target_id = random.randint(0, 23)
                
            current_temps[target_id] = random.uniform(92, 102) # Make them HOT
            
        # 2. Heat Diffusion (Simplified)
        new_temps = current_temps.copy()
        for id in range(24):
            neighbors = get_neighbors(id)
            for n_id in neighbors:
                if current_temps[n_id] > current_temps[id]:
                    new_temps[id] += (current_temps[n_id] - current_temps[id]) * 0.1
        current_temps = new_temps

        # 3. Cooling / Normalization
        for id in range(24):
            if current_temps[id] > 72:
                current_temps[id] -= 0.8 # Stronger cooling for training simulation
            else:
                current_temps[id] += random.uniform(-0.1, 0.1) # Noise

        # 4. Record Data
        for id in range(24):
            data.append({
                'timestamp': current_timestamp,
                'server_area': id,
                'temperature': current_temps[id],
                'time_of_day': current_timestamp.hour,
                'day_of_week': current_timestamp.weekday()
            })
            
        current_timestamp += time_step

    df = pd.DataFrame(data)
    
    # Save
    output_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'heat_spikes.csv')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"Saved {len(df)} records to {output_path}")

if __name__ == '__main__':
    generate_synthetic_data()
