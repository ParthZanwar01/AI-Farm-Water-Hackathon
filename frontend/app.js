// Frontend JavaScript for AI Farm Water Management System

// API Base URL - supports both localhost and deployed environments
// For Netlify: Set REACT_APP_API_URL environment variable in Netlify dashboard
// Format: https://your-render-app.onrender.com/api
const getApiBase = () => {
    // Check for window variable (injected by Netlify build or HTML script tag)
    if (window.API_BASE_URL && window.API_BASE_URL !== '%REACT_APP_API_URL%' && window.API_BASE_URL.startsWith('http')) {
        return window.API_BASE_URL;
    }
    
    // Localhost development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5001/api';
    }
    
    // Production: Check for meta tag (set during build)
    const metaApiUrl = document.querySelector('meta[name="api-url"]')?.getAttribute('content');
    if (metaApiUrl && metaApiUrl !== '%REACT_APP_API_URL%' && metaApiUrl.startsWith('http')) {
        return metaApiUrl;
    }
    
    // Fallback: Use relative path (won't work for cross-origin)
    // In production, you MUST set REACT_APP_API_URL in Netlify
    console.warn('⚠️ API URL not configured. Set REACT_APP_API_URL in Netlify environment variables.');
    return '/api';
};

const API_BASE = getApiBase();
let updateInterval = null;
let simulationActive = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeServerGrid();
    setupEventListeners();
    startStatusUpdates();

    // Mode toggles
    document.querySelectorAll('input[name="systemMode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const mode = e.target.id === 'modeAI' ? 'ai' : 'standard';
            setSystemMode(mode);
        });
    });

    // Auto-Spike Toggle
    const autoSpikeToggle = document.getElementById('autoSpikesToggle');
    if (autoSpikeToggle) {
        autoSpikeToggle.addEventListener('change', (e) => {
            toggleAutoSpikes(e.target.checked);
        });
    }

    // Dismiss loading notice
    const dismissBtn = document.getElementById('dismissNotice');
    const loadingNotice = document.getElementById('loadingNotice');
    const appContainer = document.querySelector('.app-container');
    
    if (dismissBtn && loadingNotice) {
        dismissBtn.addEventListener('click', () => {
            loadingNotice.classList.add('hidden');
            appContainer.classList.remove('with-notice');
            setTimeout(() => {
                loadingNotice.style.display = 'none';
            }, 300);
        });

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (loadingNotice && !loadingNotice.classList.contains('hidden')) {
                dismissBtn.click();
            }
        }, 10000);
    }
});

let currentSystemMode = 'standard';

async function setSystemMode(mode) {
    try {
        const response = await fetch(`${API_BASE}/mode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mode: mode })
        });
        const data = await response.json();
        if (data.status === 'success') {
            console.log(`System mode set to: ${mode}`);
            currentSystemMode = mode;
        }
    } catch (error) {
        console.error('Error setting mode:', error);
    }
}

async function toggleAutoSpikes(enabled) {
    try {
        const response = await fetch(`${API_BASE}/simulation/toggle-spikes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enabled: enabled })
        });
        const data = await response.json();
        console.log("Auto-spikes toggled:", data);
    } catch (error) {
        console.error('Error toggling auto-spikes:', error);
        // Revert toggle on error
        const toggle = document.getElementById('autoSpikesToggle');
        if (toggle) toggle.checked = !enabled;
    }
}

// Three.js variables
let scene, camera, renderer;
let serverMeshes = [];

function initializeServerGrid() {
    initThreeJS();

    // Create UI controls for each server below the 3D view
    const controlsGrid = document.querySelector('.server-controls-grid');
    controlsGrid.innerHTML = '';

    for (let i = 0; i < 24; i++) {
        const controls = createServerControls(i);
        controlsGrid.appendChild(controls);
    }
}

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight || 400; // Use container height or fallback

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Match CSS bg-darkish
    scene.fog = new THREE.Fog(0x0f172a, 10, 60);

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 8);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const blueSpot = new THREE.SpotLight(0x06b6d4, 1);
    blueSpot.position.set(-10, 20, 0);
    scene.add(blueSpot);

    // --- SCENE SETUP ---
    // Floor
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    scene.add(floor);

    // Grid
    const gridHelper = new THREE.GridHelper(60, 60, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -1.9;
    scene.add(gridHelper);

    // Servers Setup (24 servers: 4 racks x 6 servers)
    // Racks at X: -12, -4, 4, 12
    const rackXPositions = [-12, -4, 4, 12];
    serverMeshes = [];
    const serverBoxGeo = new THREE.BoxGeometry(3, 1.2, 3);

    // Create 24 Servers
    for (let i = 0; i < 24; i++) {
        const rackIndex = Math.floor(i / 6);
        const serverInRackIndex = i % 6;

        const mat = new THREE.MeshStandardMaterial({
            color: 0x22c55e, // Success green
            roughness: 0.4,
            metalness: 0.7
        });
        const mesh = new THREE.Mesh(serverBoxGeo, mat);

        const x = rackXPositions[rackIndex];
        const y = (serverInRackIndex * 1.2) - 1;
        const z = 0;

        mesh.position.set(x, y, z);
        scene.add(mesh);
        serverMeshes.push(mesh);

        // Edges
        const edges = new THREE.EdgesGeometry(serverBoxGeo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        line.position.copy(mesh.position);
        scene.add(line);
    }

    // Rack Structure
    const cabinetHeight = 7.8;
    const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.2
    });

    rackXPositions.forEach(x => {
        // Simple rack frame
        const frameGeo = new THREE.BoxGeometry(3.4, 8, 3.4);
        const edges = new THREE.EdgesGeometry(frameGeo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x475569 }));
        line.position.set(x, 2.6, 0);
        scene.add(line);
    });

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

function createServerControls(id) {
    const card = document.createElement('div');
    card.className = 'server-card';
    card.id = `server-${id}`;
    card.innerHTML = `
        <div class="cooling-status">❄</div>
        <div class="card-header">
            <span class="server-id">SRV-${id.toString().padStart(2, '0')}</span>
            <span class="temp-indicator" id="temp-${id}">--°F</span>
        </div>
        <div class="prediction-mini">
            <span>Pred: <span id="pred-temp-${id}">--</span></span>
            <span id="spike-prob-${id}">--%</span>
        </div>
    `;
    // Add click event to toggle manual cooling (optional feature)
    card.addEventListener('click', () => {
        // toggleCooling(id); // Implement if needed
    });
    return card;
}

function setupEventListeners() {
    document.getElementById('startSim').addEventListener('click', startSimulation);
    document.getElementById('stopSim').addEventListener('click', stopSimulation);
    const pauseBtn = document.getElementById('pauseSim');
    const stepBtn = document.getElementById('stepSim');
    if (pauseBtn) pauseBtn.addEventListener('click', pauseSimulation);
    if (stepBtn) stepBtn.addEventListener('click', stepSimulation);
    document.getElementById('triggerSpike').addEventListener('click', triggerHeatSpike);
}

async function triggerHeatSpike() {
    try {
        await fetch(`${API_BASE}/simulation/trigger-spike`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        updateStatus(); // Immediate update
    } catch (error) {
        console.error('Error triggering heat spike:', error);
    }
}

async function startSimulation() {
    try {
        const response = await fetch(`${API_BASE}/simulation/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.status) {
            simulationActive = true;
            simulationPaused = false;
            updateStatusUI(true, false);
        }
    } catch (error) {
        console.error('Error starting simulation:', error);
    }
}

async function stopSimulation() {
    try {
        const response = await fetch(`${API_BASE}/simulation/stop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.status) {
            simulationActive = false;
            simulationPaused = false;
            updateStatusUI(false, false);
        }
    } catch (error) {
        console.error('Error stopping simulation:', error);
    }
}

function updateStatusUI(isRunning, isPaused) {
    const statusEl = document.getElementById('simStatus');
    const startBtn = document.getElementById('startSim');
    const stopBtn = document.getElementById('stopSim');
    const pauseBtn = document.getElementById('pauseSim');
    const stepBtn = document.getElementById('stepSim');

    if (isRunning) {
        if (isPaused) {
            statusEl.textContent = 'Paused';
            statusEl.className = 'status-badge paused';
            
            // Show pause and step buttons, hide start/stop
            if (pauseBtn) {
                pauseBtn.style.display = 'none';
            }
            if (stepBtn) {
                stepBtn.style.display = 'flex';
                stepBtn.disabled = false;
                stepBtn.style.opacity = '1';
            }
            if (startBtn) {
                startBtn.style.display = 'none';
            }
            if (stopBtn) {
                stopBtn.style.display = 'flex';
                stopBtn.disabled = false;
                stopBtn.style.opacity = '1';
            }
        } else {
            statusEl.textContent = 'Running';
            statusEl.className = 'status-badge running';
            
            // Show pause button, hide step button
            if (pauseBtn) {
                pauseBtn.style.display = 'flex';
                pauseBtn.disabled = false;
                pauseBtn.style.opacity = '1';
            }
            if (stepBtn) {
                stepBtn.style.display = 'none';
            }
            if (startBtn) {
                startBtn.style.display = 'none';
            }
            if (stopBtn) {
                stopBtn.style.display = 'flex';
                stopBtn.disabled = false;
                stopBtn.style.opacity = '1';
            }
        }
    } else {
        statusEl.textContent = 'Stopped';
        statusEl.className = 'status-badge stopped';

        // Show start button, hide pause/step/stop
        if (startBtn) {
            startBtn.style.display = 'flex';
            startBtn.disabled = false;
            startBtn.style.opacity = '1';
            startBtn.style.cursor = 'pointer';
        }
        if (stopBtn) {
            stopBtn.style.display = 'none';
        }
        if (pauseBtn) {
            pauseBtn.style.display = 'none';
        }
        if (stepBtn) {
            stepBtn.style.display = 'none';
        }
    }
}

function startStatusUpdates() {
    updateStatus();
    updateInterval = setInterval(updateStatus, 2000);
}

async function updateStatus() {
    try {
        // Check backend health first
        try {
            const healthCheck = await fetch(`${API_BASE}/health`, { 
                method: 'GET',
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });
            if (!healthCheck.ok) {
                throw new Error('Backend not ready');
            }
        } catch (e) {
            console.warn('Backend health check failed, retrying...');
            // Show loading notice if backend is slow
            const loadingNotice = document.getElementById('loadingNotice');
            const appContainer = document.querySelector('.app-container');
            if (loadingNotice && loadingNotice.style.display === 'none') {
                loadingNotice.style.display = 'block';
                loadingNotice.classList.remove('hidden');
                appContainer.classList.add('with-notice');
            }
            return; // Skip this update cycle
        }

        const response = await fetch(`${API_BASE}/status`, {
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        // Hide loading notice on successful connection
        const loadingNotice = document.getElementById('loadingNotice');
        const appContainer = document.querySelector('.app-container');
        if (loadingNotice && !loadingNotice.classList.contains('hidden')) {
            setTimeout(() => {
                if (loadingNotice && document.getElementById('dismissNotice')) {
                    document.getElementById('dismissNotice').click();
                }
            }, 2000);
        }

        let activeCoolingCount = 0;

        // Update each server area
        data.areas.forEach(area => {
            updateServerArea(area.id, area.current_temp, area.water_active);
            if (area.water_active) activeCoolingCount++;
        });

        // Update global counter
        const countEl = document.getElementById('activeCoolingCount');
        if (countEl) countEl.textContent = activeCoolingCount;

        // Update predictions
        Object.keys(data.predictions).forEach(areaId => {
            updatePrediction(parseInt(areaId), data.predictions[areaId]);
        });

        // Update simulation status
        if (data.simulation_active !== simulationActive || data.simulation_paused !== simulationPaused) {
            simulationActive = data.simulation_active;
            simulationPaused = data.simulation_paused || false;
            updateStatusUI(simulationActive, simulationPaused);
        }

        // Update Auto-Spike Toggle State (Sync with Backend)
        const autoSpikeToggle = document.getElementById('autoSpikesToggle');
        if (autoSpikeToggle && data.auto_spikes_enabled !== undefined) {
            autoSpikeToggle.checked = data.auto_spikes_enabled;
        }

        // Update model confidence
        if (data.predictions) {
            const preds = Object.values(data.predictions);
            if (preds.length > 0) {
                const avgConfidence = preds.reduce((sum, p) => sum + (p.confidence || 0), 0) / preds.length;
                document.getElementById('modelConfidence').textContent = `${(avgConfidence * 100).toFixed(1)}%`;
            }
        }

    } catch (error) {
        console.error('Error updating status:', error);
        // Show loading notice on persistent errors
        const loadingNotice = document.getElementById('loadingNotice');
        const appContainer = document.querySelector('.app-container');
        if (loadingNotice && loadingNotice.style.display === 'none') {
            loadingNotice.style.display = 'block';
            loadingNotice.classList.remove('hidden');
            appContainer.classList.add('with-notice');
        }
    }
}

function updateServerArea(areaId, temperature, waterActive) {
    const card = document.getElementById(`server-${areaId}`);
    if (!card) return;

    // Update 3D Mesh
    const mesh = serverMeshes[areaId];
    if (mesh) {
        if (waterActive) {
            mesh.material.color.setHex(0x3b82f6); // Blue
            mesh.material.emissive.setHex(0x1d4ed8);
        } else {
            mesh.material.emissive.setHex(0x000000);
            if (temperature >= 90) mesh.material.color.setHex(0xef4444); // Red
            else if (temperature >= 85) mesh.material.color.setHex(0xf97316); // Orange
            else if (temperature >= 80) mesh.material.color.setHex(0xeab308); // Yellow
            else mesh.material.color.setHex(0x22c55e); // Green
        }
    }

    // Update Card UI
    if (temperature !== null) {
        const tempEl = document.getElementById(`temp-${areaId}`);
        tempEl.textContent = `${temperature.toFixed(1)}°F`;

        // Text Color based on temp
        if (temperature >= 90) tempEl.style.color = '#ef4444';
        else if (temperature >= 85) tempEl.style.color = '#f97316';
        else if (temperature >= 80) tempEl.style.color = '#eab308';
        else tempEl.style.color = '#22c55e';

        if (waterActive) {
            card.classList.add('cooling-active');
        } else {
            card.classList.remove('cooling-active');
        }
    }
}

function updatePrediction(areaId, prediction) {
    const predTempEl = document.getElementById(`pred-temp-${areaId}`);
    const spikeProbEl = document.getElementById(`spike-prob-${areaId}`);

    if (predTempEl) {
        predTempEl.textContent = `${prediction.predicted_temperature.toFixed(1)}°`;
    }

    if (spikeProbEl) {
        const prob = prediction.spike_probability;
        spikeProbEl.textContent = `${(prob * 100).toFixed(0)}%`;

        // Color code probability
        spikeProbEl.className = '';
        if (prob > 0.7) spikeProbEl.classList.add('prob-high');
        else if (prob > 0.4) spikeProbEl.classList.add('prob-med');
        else spikeProbEl.classList.add('prob-low');
    }

    // Auto-cooling logic override check (if needed)
    if (prediction.spike_probability > 0.7 && !document.getElementById(`server-${areaId}`).classList.contains('cooling-active')) {
        // activateCooling(areaId); // Logic managed by backend or manual ? 
        // Keeping as is from previous code: commented out
    }
}

// Update total spikes count
async function updateTotalSpikes() {
    try {
        const response = await fetch(`${API_BASE}/history`);
        const data = await response.json();
        document.getElementById('totalSpikes').textContent = data.length;
    } catch (error) {
        console.error('Error fetching history:', error);
    }
}

setInterval(updateTotalSpikes, 5000);
updateTotalSpikes();

