import { Cpu, Droplets, Radio, Camera, Zap } from 'lucide-react';

export default function Technologies() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            filter: 'brightness(0.25)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/90"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">AquaCool Core Technologies</h1>
              <div className="w-20 h-1 bg-yellow-600 mb-6"></div>
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                Liquid cooling, edge telemetry, and ML policy engines working together to shave water intensity without
                sacrificing thermal envelopes.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Three pillars — sense heat precisely, predict spikes early, and modulate flow surgically — replace
                all-or-nothing chiller reactions.
              </p>
            </div>
            <div className="flex justify-center">
              <Cpu className="w-64 h-64 text-yellow-600 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                <Droplets className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-3xl font-bold mb-4">Liquid-to-chip delivery</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cold plates, CDUs, and rear-door exchangers move heat to water more efficiently than air alone,
                  reducing the fan power stack and improving headroom for AI bursts.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Zone-level flow allocation (demo abstraction)</li>
                  <li>• Compatible with dual-loop designs</li>
                  <li>• Supports partial valve staging narratives</li>
                  <li>• Integrates with existing BMS tags (roadmap)</li>
                </ul>
              </div>
              <div className="h-64 rounded-lg border border-gray-800 flex items-center justify-center bg-gray-900">
                <img src="/images/ebam.png" alt="Cooling hardware illustration" className="w-3/5 h-3/5 object-contain" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="h-64 rounded-lg border border-gray-800 order-2 md:order-1 flex items-center justify-center bg-gray-900">
                <img src="/images/ebchm.png" alt="Process loop illustration" className="w-3/5 h-3/5 object-contain" />
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800 order-1 md:order-2">
                <Cpu className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-3xl font-bold mb-4">Policy &amp; optimization layer</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Translates model scores into cooling intents with guardrails: minimum off-time, ramp limits, and
                  hysteresis so mechanical equipment is not thrashed by jittery probabilities.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Dual mode: Standard reactive vs AI predictive</li>
                  <li>• Water accounting per intervention</li>
                  <li>• Confidence-aware staging</li>
                  <li>• API-first for integration testing</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                <Radio className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-3xl font-bold mb-4">Telemetry mesh</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  High-resolution sampling captures the shape of approaching spikes — not just the magnitude — enabling
                  controllers to act while curves are still tractable.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• 1 Hz demo cadence</li>
                  <li>• Neighbor coupling for cross-aisle effects</li>
                  <li>• Durable CSV export for offline science</li>
                  <li>• WebSocket / poll friendly API surface</li>
                </ul>
              </div>
              <div className="h-64 rounded-lg border border-gray-800 flex items-center justify-center bg-gray-900">
                <img src="/images/gecko.png" alt="Sensing fabric illustration" className="w-3/5 h-3/5 object-contain" />
              </div>
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
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Supporting systems</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Camera className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Visualization</h3>
              <p className="text-gray-400">
                Three.js room + heatmap modal translate tensors into operator trust — color, motion, and counters for
                water saved vs baseline.
              </p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Zap className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Power coupling</h3>
              <p className="text-gray-400">
                GPU/TPU power ramps precede temperature shifts; future builds ingest PDU readings as leading indicators
                for even sharper forecasts.
              </p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <img src="/favicon.svg" alt="" className="w-12 h-12 mb-4 object-contain" />
              <h3 className="text-xl font-bold mb-3">Service fabric</h3>
              <p className="text-gray-400">
                Flask today, container-ready tomorrow — health endpoints, structured logs, and deterministic simulation
                seeds for CI.
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
              'url(https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Integration &amp; testing</h2>
          <div className="w-20 h-1 bg-yellow-600 mb-8"></div>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            The hackathon stack emphasizes reproducibility: scripted data fetches, pinned sklearn versions, and a static
            frontend that can be hosted separately from the API for Netlify + Render style splits.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Moving toward production means HIL benches with real valves-in-the-loop, fault injection, and signed command
            paths — the same discipline as aerospace avionics, applied to thermal hydraulics.
          </p>
        </div>
      </section>
    </div>
  );
}
