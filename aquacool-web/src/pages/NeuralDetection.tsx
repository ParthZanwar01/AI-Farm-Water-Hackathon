import { Brain, Network, Activity, Database } from 'lucide-react';
import { SIMULATOR_URL } from '../config';

export default function NeuralDetection() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            filter: 'brightness(0.25)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/90"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <Brain className="w-64 h-64 text-cyan-400 opacity-80" />
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Heat Prediction Engine</h1>
              <div className="w-20 h-1 bg-cyan-500 mb-6"></div>
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                Ensemble classifiers consume per-server time series and spatial context to estimate the probability of an
                imminent heat spike — driving proactive cooling instead of threshold-only alarms.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The same patterns that power computer-vision &quot;detection&quot; pipelines appear here as tabular
                forecasting: windows, trends, and neighbor coupling become the signal for liquid cooling policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Model architecture</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <Network className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Feature fabric</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Temporal encodings (hour, day, business hours), multi-step temperature lags, rolling means/std/min/max,
                derivative and acceleration, and neighbor statistics across the 4×6 topology.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Spatial: neighbor mean / max / spike counts</li>
                <li>• Temporal: cyclical sin/cos clocks + weekend flags</li>
                <li>• Stability: rolling windows 3/6/12/24 steps</li>
                <li>• Risk output: spike probability 0–1 each tick</li>
              </ul>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <Activity className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Inference cadence</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The demo scores every simulated second per node; production would align to SCADA scan blocks (250ms–2s)
                with backpressure-aware batching.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Threshold: P(spike) &gt; 0.70 arms proactive cooling</li>
                <li>• Failsafe: hardware trip still at 85°F</li>
                <li>• Explainability: top features logged per event</li>
                <li>• Retraining: CSV append for offline refresh</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Training &amp; validation</h2>
          <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Models train on historical spike tables augmented with simulation exports. Walk-forward splits respect
              time ordering so we do not leak future ambient conditions into past predictions.
            </p>
            <p>
              Validation tracks precision/recall on spike labels and calibration of predicted probabilities — critical
              when plant engineers need to trust pre-cooling recommendations.
            </p>
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 mt-8">
              <Database className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Demo metrics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-cyan-400 mb-2">37+</p>
                  <p className="text-gray-400">Features per tick</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-500 mb-2">1 Hz</p>
                  <p className="text-gray-400">Simulation sample rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-600 mb-2">~30s</p>
                  <p className="text-gray-400">Effective lookahead window</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Try the live twin</h2>
          <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            The Flask + Three.js simulator visualizes rack temperatures, mode toggles, and cumulative water deltas. Run
            it locally alongside this marketing site for investor-style demos.
          </p>
          <div className="text-center">
            <a
              href={SIMULATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Brain className="w-5 h-5 mr-2" />
              Open simulator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
