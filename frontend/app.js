// AquaCool AI — Frontend Application

// API Base URL
const getApiBase = () => {
    if (window.API_BASE_URL && window.API_BASE_URL !== '%REACT_APP_API_URL%' && window.API_BASE_URL.startsWith('http')) {
        return window.API_BASE_URL;
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5001/api';
    }
    const metaApiUrl = document.querySelector('meta[name="api-url"]')?.getAttribute('content');
    if (metaApiUrl && metaApiUrl !== '%REACT_APP_API_URL%' && metaApiUrl.startsWith('http')) {
        return metaApiUrl;
    }
    console.warn('API URL not configured. Set REACT_APP_API_URL in environment variables.');
    return '/api';
};

const API_BASE = getApiBase();
let updateInterval = null;
let simulationActive = false;
let simulationPaused = false;
let currentSystemMode = 'standard';
let previousTemps = {};
let tempHistory = {};      // id → rolling array of last 40 readings
let currentPollInterval = 2000;

// ── Toast Notifications ──────────────────────────────────────────────────────

function showToast(title, body, type = 'danger', duration = 4000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-body">${body}</div>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('removing');
        toast.addEventListener('animationend', () => toast.remove());
    }, duration);
}

// ── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initializeServerGrid();
    initHeatmap();
    setupEventListeners();
    startStatusUpdates();

    document.querySelectorAll('input[name="systemMode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const mode = e.target.id === 'modeAI' ? 'ai' : 'standard';
            setSystemMode(mode);
        });
    });

    const autoSpikeToggle = document.getElementById('autoSpikesToggle');
    if (autoSpikeToggle) {
        autoSpikeToggle.addEventListener('change', (e) => toggleAutoSpikes(e.target.checked));
    }

    const dismissBtn = document.getElementById('dismissNotice');
    const loadingNotice = document.getElementById('loadingNotice');
    const appContainer = document.querySelector('.app-container');

    if (dismissBtn && loadingNotice) {
        dismissBtn.addEventListener('click', () => {
            loadingNotice.classList.add('hidden');
            appContainer.classList.remove('with-notice');
            setTimeout(() => { loadingNotice.style.display = 'none'; }, 300);
        });
        setTimeout(() => {
            if (loadingNotice && !loadingNotice.classList.contains('hidden')) {
                dismissBtn.click();
            }
        }, 10000);
    }
});

// ── Mode & Controls ───────────────────────────────────────────────────────────

async function setSystemMode(mode) {
    try {
        const response = await fetch(`${API_BASE}/mode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mode })
        });
        const data = await response.json();
        if (data.status === 'success') {
            currentSystemMode = mode;
            const modeEl = document.getElementById('currentMode');
            if (modeEl) modeEl.textContent = mode === 'ai' ? 'AI Predictive' : 'Standard';
            showToast(
                mode === 'ai' ? 'AI Predictive Mode Active' : 'Standard Mode Active',
                mode === 'ai'
                    ? 'ML model will predict and prevent heat spikes proactively.'
                    : 'Cooling activates reactively when temperature exceeds threshold.',
                'info',
                3500
            );
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
            body: JSON.stringify({ enabled })
        });
        await response.json();
    } catch (error) {
        console.error('Error toggling auto-spikes:', error);
        const toggle = document.getElementById('autoSpikesToggle');
        if (toggle) toggle.checked = !enabled;
    }
}

// ── Three.js Setup ────────────────────────────────────────────────────────────

let scene, camera, renderer;
let serverMeshes = [];

function initializeServerGrid() {
    initThreeJS();
    const controlsGrid = document.querySelector('.server-controls-grid');
    controlsGrid.innerHTML = '';
    for (let i = 0; i < 24; i++) {
        controlsGrid.appendChild(createServerControls(i));
    }
}

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090e18);
    scene.fog = new THREE.FogExp2(0x090e18, 0.018);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 6, 22);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 12, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Cyan accent light (water theme)
    const cyanPoint = new THREE.PointLight(0x00d4ff, 1.2, 40);
    cyanPoint.position.set(0, 10, 5);
    scene.add(cyanPoint);

    const bluePoint = new THREE.PointLight(0x3b82f6, 0.8, 30);
    bluePoint.position.set(-10, 5, -5);
    scene.add(bluePoint);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0d1117, roughness: 0.9, metalness: 0.1 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid
    const gridHelper = new THREE.GridHelper(60, 40, 0x1a2030, 0x0d1117);
    gridHelper.position.y = -1.95;
    scene.add(gridHelper);

    // Build 24 servers: 4 racks × 6 servers
    const rackXPositions = [-12, -4, 4, 12];
    serverMeshes = [];
    const serverBoxGeo = new THREE.BoxGeometry(3, 1.1, 2.8);

    for (let i = 0; i < 24; i++) {
        const rackIndex = Math.floor(i / 6);
        const posInRack = i % 6;

        const mat = new THREE.MeshStandardMaterial({
            color: 0x10b981,  // default: green (normal temp)
            roughness: 0.35,
            metalness: 0.75,
            emissive: 0x000000,
        });
        const mesh = new THREE.Mesh(serverBoxGeo, mat);
        const x = rackXPositions[rackIndex];
        const y = (posInRack * 1.15) - 1;
        mesh.position.set(x, y, 0);
        mesh.castShadow = true;
        scene.add(mesh);
        serverMeshes.push(mesh);

        // Edge outline
        const edges = new THREE.EdgesGeometry(serverBoxGeo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.8 }));
        line.position.copy(mesh.position);
        scene.add(line);
    }

    // Rack frames
    rackXPositions.forEach(x => {
        const frameGeo = new THREE.BoxGeometry(3.5, 7.5, 3.2);
        const edges = new THREE.EdgesGeometry(frameGeo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x2d3748, transparent: true, opacity: 0.7 }));
        line.position.set(x, 2.25, 0);
        scene.add(line);

        // Rack label plane
        const labelGeo = new THREE.PlaneGeometry(2.5, 0.4);
        const labelMat = new THREE.MeshBasicMaterial({ color: 0x1a2030, side: THREE.DoubleSide });
        const label = new THREE.Mesh(labelGeo, labelMat);
        label.position.set(x, 6.2, 0);
        scene.add(label);
    });

    // Orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 8;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
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
            <div class="temp-right">
                <span class="trend-arrow neutral" id="trend-${id}">→</span>
                <span class="temp-indicator" id="temp-${id}">--°F</span>
            </div>
        </div>
        <canvas class="sparkline" id="sparkline-${id}" width="130" height="22"></canvas>
        <div class="prediction-mini">
            <span>Pred: <span id="pred-temp-${id}">--</span></span>
            <span id="spike-prob-${id}">--%</span>
        </div>
    `;
    return card;
}

// ── Sparklines & Trend Arrows ──────────────────────────────────────────────────

function pushHistory(id, temp) {
    if (!tempHistory[id]) tempHistory[id] = [];
    tempHistory[id].push(temp);
    if (tempHistory[id].length > 40) tempHistory[id].shift();
}

function drawSparkline(id) {
    const canvas = document.getElementById(`sparkline-${id}`);
    if (!canvas) return;
    const hist = tempHistory[id] || [];
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    if (hist.length < 2) return;

    const minV = Math.min(...hist) - 0.5;
    const maxV = Math.max(...hist) + 0.5;
    const range = maxV - minV || 1;

    // Gradient fill
    const latest = hist[hist.length - 1];
    const lineColor = latest >= 90 ? '#ef4444'
                    : latest >= 85 ? '#f97316'
                    : latest >= 80 ? '#f59e0b'
                    : latest >= 73 ? '#10b981'
                    : '#3b82f6';

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, lineColor + '55');
    grad.addColorStop(1, lineColor + '00');

    ctx.beginPath();
    hist.forEach((t, i) => {
        const x = (i / (hist.length - 1)) * w;
        const y = h - ((t - minV) / range) * (h - 2) - 1;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    hist.forEach((t, i) => {
        const x = (i / (hist.length - 1)) * w;
        const y = h - ((t - minV) / range) * (h - 2) - 1;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.stroke();
}

function updateTrendArrow(id) {
    const hist = tempHistory[id] || [];
    const el = document.getElementById(`trend-${id}`);
    if (!el || hist.length < 4) return;

    const recent = hist.slice(-4);
    const older = hist.slice(-8, -4);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.length ? older.reduce((a, b) => a + b, 0) / older.length : recentAvg;
    const diff = recentAvg - olderAvg;

    if (diff > 3)       { el.textContent = '↑↑'; el.className = 'trend-arrow critical'; }
    else if (diff > 1)  { el.textContent = '↑';  el.className = 'trend-arrow rising'; }
    else if (diff < -3) { el.textContent = '↓↓'; el.className = 'trend-arrow cooling'; }
    else if (diff < -1) { el.textContent = '↓';  el.className = 'trend-arrow falling'; }
    else                { el.textContent = '→';  el.className = 'trend-arrow neutral'; }
}

// ── Event Listeners ───────────────────────────────────────────────────────────

function setupEventListeners() {
    document.getElementById('startSim').addEventListener('click', startSimulation);
    document.getElementById('stopSim').addEventListener('click', stopSimulation);
    const pauseBtn = document.getElementById('pauseSim');
    const stepBtn  = document.getElementById('stepSim');
    if (pauseBtn) pauseBtn.addEventListener('click', pauseSimulation);
    if (stepBtn)  stepBtn.addEventListener('click', stepSimulation);
    document.getElementById('triggerSpike').addEventListener('click', triggerHeatSpike);

    const speedSelect = document.getElementById('simSpeed');
    if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
            currentPollInterval = parseInt(e.target.value, 10);
            if (updateInterval) {
                clearInterval(updateInterval);
                updateInterval = setInterval(updateStatus, currentPollInterval);
            }
        });
    }
}

async function triggerHeatSpike() {
    try {
        await fetch(`${API_BASE}/simulation/trigger-spike`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        updateStatus();
        showToast('Heat Spike Triggered', 'Manual heat spike injected into the simulation.', 'danger', 3000);
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
            showToast('Simulation Started', 'Server heat simulation is now running.', 'success', 2500);
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

async function pauseSimulation() {
    try {
        const response = await fetch(`${API_BASE}/simulation/pause`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.status === 'paused') {
            simulationPaused = true;
            updateStatusUI(true, true);
        }
    } catch (error) {
        console.error('Error pausing simulation:', error);
    }
}

async function stepSimulation() {
    try {
        const response = await fetch(`${API_BASE}/simulation/step`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.status === 'stepped') {
            updateStatus();
        }
    } catch (error) {
        console.error('Error stepping simulation:', error);
    }
}

function updateStatusUI(isRunning, isPaused) {
    const statusEl  = document.getElementById('simStatus');
    const startBtn  = document.getElementById('startSim');
    const stopBtn   = document.getElementById('stopSim');
    const pauseBtn  = document.getElementById('pauseSim');
    const stepBtn   = document.getElementById('stepSim');

    const show = (el, visible) => { if (el) el.style.display = visible ? 'flex' : 'none'; };

    if (isRunning) {
        if (isPaused) {
            statusEl.textContent = 'Paused';
            statusEl.className = 'status-badge paused';
            show(startBtn, false); show(stopBtn, true); show(pauseBtn, false); show(stepBtn, true);
        } else {
            statusEl.textContent = 'Running';
            statusEl.className = 'status-badge running';
            show(startBtn, false); show(stopBtn, true); show(pauseBtn, true); show(stepBtn, false);
        }
    } else {
        statusEl.textContent = 'Stopped';
        statusEl.className = 'status-badge stopped';
        show(startBtn, true); show(stopBtn, false); show(pauseBtn, false); show(stepBtn, false);
    }
}

// ── Status Polling ────────────────────────────────────────────────────────────

function startStatusUpdates() {
    updateStatus();
    updateInterval = setInterval(updateStatus, currentPollInterval);
}

async function updateStatus() {
    try {
        // Health check
        try {
            const hc = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(5000) });
            if (!hc.ok) throw new Error('not ready');
        } catch {
            const notice = document.getElementById('loadingNotice');
            const app = document.querySelector('.app-container');
            if (notice && notice.style.display === 'none') {
                notice.style.display = 'block';
                notice.classList.remove('hidden');
                app.classList.add('with-notice');
            }
            return;
        }

        const response = await fetch(`${API_BASE}/status`, { signal: AbortSignal.timeout(10000) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        // Hide loading notice on successful connection
        const notice = document.getElementById('loadingNotice');
        if (notice && !notice.classList.contains('hidden')) {
            setTimeout(() => {
                const btn = document.getElementById('dismissNotice');
                if (btn) btn.click();
            }, 1500);
        }

        let activeCoolingCount = 0;

        updateHeatmap(data.areas);

        data.areas.forEach(area => {
            const prevTemp = previousTemps[area.id];
            // Detect sudden temperature spike and notify
            if (prevTemp !== undefined && area.current_temp - prevTemp > 8 && !area.water_active) {
                showToast(
                    `Heat Spike on SRV-${area.id.toString().padStart(2, '0')}`,
                    `Temperature jumped to ${area.current_temp.toFixed(1)}°F`,
                    'danger',
                    4000
                );
            }
            previousTemps[area.id] = area.current_temp;
            pushHistory(area.id, area.current_temp);
            drawSparkline(area.id);
            updateTrendArrow(area.id);
            updateServerArea(area.id, area.current_temp, area.water_active);
            if (area.water_active) activeCoolingCount++;
        });

        // Metrics bar
        const countEl = document.getElementById('activeCoolingCount');
        if (countEl) countEl.textContent = activeCoolingCount;

        if (data.metrics) {
            const m = data.metrics;
            const waterEl = document.getElementById('waterSaved');
            if (waterEl) waterEl.textContent = `${m.water_saved_gallons.toFixed(1)} gal`;

            const prevEl = document.getElementById('spikesPrevented');
            if (prevEl) prevEl.textContent = m.spikes_prevented;

            const effEl = document.getElementById('aiEfficiency');
            if (effEl) {
                effEl.textContent = `${m.ai_efficiency_pct}%`;
                effEl.className = 'metric-value';
                if (m.ai_efficiency_pct >= 60) effEl.classList.add('green');
                else if (m.ai_efficiency_pct >= 30) effEl.classList.add('blue');
            }

            const totalEl = document.getElementById('totalSpikes');
            if (totalEl) totalEl.textContent = m.total_spikes_detected;

            // Runtime & cycles
            const runtimeEl = document.getElementById('simRuntime');
            if (runtimeEl && m.runtime_seconds !== undefined) {
                const s = m.runtime_seconds;
                const hh = String(Math.floor(s / 3600)).padStart(2, '0');
                const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
                const ss = String(s % 60).padStart(2, '0');
                runtimeEl.textContent = s > 0 ? `${hh}:${mm}:${ss}` : '--';
            }
            const cyclesEl = document.getElementById('simCycles');
            if (cyclesEl && m.simulation_cycles !== undefined) {
                cyclesEl.textContent = m.simulation_cycles.toLocaleString();
            }
        }

        // Predictions
        Object.keys(data.predictions).forEach(areaId => {
            updatePrediction(parseInt(areaId), data.predictions[areaId]);
        });

        // Sync simulation state
        if (data.simulation_active !== simulationActive || data.simulation_paused !== simulationPaused) {
            simulationActive = data.simulation_active;
            simulationPaused = data.simulation_paused || false;
            updateStatusUI(simulationActive, simulationPaused);
        }

        // Sync auto-spike toggle
        const autoSpikeToggle = document.getElementById('autoSpikesToggle');
        if (autoSpikeToggle && data.auto_spikes_enabled !== undefined) {
            autoSpikeToggle.checked = data.auto_spikes_enabled;
        }

        // Model confidence
        if (data.predictions) {
            const preds = Object.values(data.predictions);
            if (preds.length > 0) {
                const avg = preds.reduce((s, p) => s + (p.confidence || 0), 0) / preds.length;
                const el = document.getElementById('modelConfidence');
                if (el) el.textContent = `${(avg * 100).toFixed(1)}%`;
            }
        }

        // Sync mode radio buttons
        if (data.system_mode && data.system_mode !== currentSystemMode) {
            currentSystemMode = data.system_mode;
            const modeEl = document.getElementById('currentMode');
            if (modeEl) modeEl.textContent = currentSystemMode === 'ai' ? 'AI Predictive' : 'Standard';
            const modeRadio = document.getElementById(currentSystemMode === 'ai' ? 'modeAI' : 'modeStandard');
            if (modeRadio) modeRadio.checked = true;
        }

    } catch (error) {
        console.error('Error updating status:', error);
    }
}

// ── Server Area Updates ───────────────────────────────────────────────────────

function updateServerArea(areaId, temperature, waterActive) {
    const card = document.getElementById(`server-${areaId}`);
    if (!card) return;

    const mesh = serverMeshes[areaId];
    if (mesh) {
        if (waterActive) {
            // Cyan: active cooling
            mesh.material.color.setHex(0x00d4ff);
            mesh.material.emissive.setHex(0x004466);
            mesh.material.emissiveIntensity = 0.4;
        } else {
            mesh.material.emissiveIntensity = 0;
            mesh.material.emissive.setHex(0x000000);
            if (temperature >= 90)      mesh.material.color.setHex(0xef4444); // red: critical
            else if (temperature >= 85) mesh.material.color.setHex(0xf97316); // orange: hot
            else if (temperature >= 80) mesh.material.color.setHex(0xf59e0b); // yellow: warm
            else                         mesh.material.color.setHex(0x10b981); // green: normal
        }
    }

    if (temperature !== null) {
        const tempEl = document.getElementById(`temp-${areaId}`);
        if (tempEl) {
            tempEl.textContent = `${temperature.toFixed(1)}°F`;
            if (temperature >= 90)      tempEl.style.color = '#ef4444';
            else if (temperature >= 85) tempEl.style.color = '#f97316';
            else if (temperature >= 80) tempEl.style.color = '#f59e0b';
            else                         tempEl.style.color = '#10b981';
        }

        if (waterActive) {
            card.classList.add('cooling-active');
        } else {
            card.classList.remove('cooling-active');
        }
    }
}

// ── Heatmap ───────────────────────────────────────────────────────────────────

let heatmapCells = [];

function initHeatmap() {
    const grid = document.getElementById('heatmapGrid');
    if (!grid) return;
    grid.innerHTML = '';
    heatmapCells = [];

    for (let rack = 0; rack < 4; rack++) {
        const rackEl = document.createElement('div');
        rackEl.className = 'heatmap-rack';

        const label = document.createElement('div');
        label.className = 'heatmap-rack-label';
        label.textContent = `Rack ${rack + 1}`;
        rackEl.appendChild(label);

        for (let pos = 5; pos >= 0; pos--) {  // top to bottom (pos 5 = top)
            const serverId = rack * 6 + pos;
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            cell.id = `hm-cell-${serverId}`;
            cell.innerHTML = `<span>${'--°F'}</span><span class="heatmap-cell-id">SRV-${serverId.toString().padStart(2,'0')}</span>`;
            rackEl.appendChild(cell);
            heatmapCells[serverId] = cell;
        }

        grid.appendChild(rackEl);
    }

    document.getElementById('openHeatmap').addEventListener('click', () => {
        document.getElementById('heatmapOverlay').classList.add('open');
    });
    document.getElementById('closeHeatmap').addEventListener('click', () => {
        document.getElementById('heatmapOverlay').classList.remove('open');
    });
    document.getElementById('heatmapOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
    });
}

function tempToColor(temp, waterActive) {
    if (waterActive) return { bg: '#0ea5e9', shadow: 'rgba(0,212,255,0.5)' };
    // 65°F = cold blue → 72°F = green → 80°F = yellow → 85°F = orange → 95°F+ = red
    if (temp <= 70)      return { bg: '#3b82f6', shadow: null };
    if (temp <= 75)      return { bg: '#10b981', shadow: null };
    if (temp <= 80)      return { bg: '#84cc16', shadow: null };
    if (temp <= 85)      return { bg: '#f59e0b', shadow: 'rgba(245,158,11,0.3)' };
    if (temp <= 90)      return { bg: '#f97316', shadow: 'rgba(249,115,22,0.4)' };
    return               { bg: '#ef4444', shadow: 'rgba(239,68,68,0.5)' };
}

function updateHeatmap(areas) {
    if (!heatmapCells.length) return;

    let min = Infinity, max = -Infinity, sum = 0, hotCount = 0;

    areas.forEach(area => {
        const cell = heatmapCells[area.id];
        if (!cell) return;

        const temp = area.current_temp;
        const { bg, shadow } = tempToColor(temp, area.water_active);

        cell.style.backgroundColor = bg;
        cell.style.boxShadow = shadow ? `0 0 10px ${shadow}` : 'none';
        cell.querySelector('span').textContent = `${temp.toFixed(1)}°F`;

        if (area.water_active) {
            cell.classList.add('cooling-pulse');
        } else {
            cell.classList.remove('cooling-pulse');
        }

        min = Math.min(min, temp);
        max = Math.max(max, temp);
        sum += temp;
        if (temp >= 85) hotCount++;
    });

    const avg = sum / areas.length;
    const minEl  = document.getElementById('hmMinTemp');
    const avgEl  = document.getElementById('hmAvgTemp');
    const maxEl  = document.getElementById('hmMaxTemp');
    const hotEl  = document.getElementById('hmHotCount');

    if (minEl) minEl.textContent = `${min.toFixed(1)}°F`;
    if (avgEl) avgEl.textContent = `${avg.toFixed(1)}°F`;
    if (maxEl) { maxEl.textContent = `${max.toFixed(1)}°F`; maxEl.style.color = max >= 85 ? 'var(--danger)' : 'var(--text-primary)'; }
    if (hotEl) hotEl.textContent = hotCount;
}

function updatePrediction(areaId, prediction) {
    const predTempEl  = document.getElementById(`pred-temp-${areaId}`);
    const spikeProbEl = document.getElementById(`spike-prob-${areaId}`);

    if (predTempEl) {
        predTempEl.textContent = `${prediction.predicted_temperature.toFixed(1)}°`;
    }

    if (spikeProbEl) {
        const prob = prediction.spike_probability;
        spikeProbEl.textContent = `${(prob * 100).toFixed(0)}%`;
        spikeProbEl.className = '';
        if (prob > 0.7)      spikeProbEl.classList.add('prob-high');
        else if (prob > 0.4) spikeProbEl.classList.add('prob-med');
        else                  spikeProbEl.classList.add('prob-low');
    }
}
