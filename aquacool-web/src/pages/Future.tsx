import { Sparkles, Factory, Network, Rocket } from 'lucide-react';

export default function Future() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/longTermVisionBg.png)',
            filter: 'brightness(0.25)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/90"></div>

        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Future</h1>
          <div className="w-20 h-1 bg-yellow-600 mb-8"></div>
          <p className="text-2xl text-gray-200 leading-relaxed">
            From single-site twins to grid-aware fleets that co-optimize AI throughput, water, and electricity in real
            time.
          </p>
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
          <h2 className="text-4xl font-bold mb-12 text-center">Next decade vision</h2>

          <div className="space-y-12">
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-5 rounded-lg"
                style={{
                  backgroundImage: 'url(/images/orbitalTrafficManagement.png)',
                }}
              ></div>
              <div>
                <div className="flex items-center mb-6">
                  <Network className="w-12 h-12 text-blue-400 mr-4" />
                  <h3 className="text-3xl font-bold">Fleet digital twins</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Cross-campus digital twins share anonymized fingerprints so new regions inherit priors for ambient
                  humidity, tariff windows, and chiller plant quirks.
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Federated learning with DP noise budgets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Global what-if sandboxes for capex planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Automatic drift watchdogs per site</span>
                  </li>
                </ul>
              </div>
              <div
                className="h-96 bg-cover bg-center rounded-lg border border-gray-800"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800)',
                }}
              ></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className="h-96 bg-cover bg-center rounded-lg border border-gray-800 order-2 md:order-1"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800)',
                }}
              ></div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <Factory className="w-12 h-12 text-green-400 mr-4" />
                  <h3 className="text-3xl font-bold">Plant-aware schedulers</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Job schedulers speak the same language as cooling controllers — delaying non-urgent training waves a
                  few minutes to dodge tariff peaks becomes a first-class optimization variable.
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Coupled SLAs for GPU + BTU</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Closed-loop curtailment contracts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Carbon-intensity aware routing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Sparkles className="w-12 h-12 text-yellow-400 mr-4" />
                  <h3 className="text-3xl font-bold">Physics-informed ML</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Hybrid models blend CFD reduced-basis surrogates with field telemetry so extrapolation stays grounded
                  when AI workloads evolve faster than history alone can capture.
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Digital twin calibration from CFD snapshots</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Uncertainty bands on every prediction</span>
                  </li>
                </ul>
              </div>
              <div
                className="h-96 bg-cover bg-center rounded-lg border border-gray-800"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900 text-center">
        <Rocket className="w-14 h-14 text-red-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Let&apos;s build calmer data halls</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Start with the hackathon simulator, graduate to shadow deployments, then open the loop with mechanical
          partners when the math — and the culture — are ready.
        </p>
      </section>
    </div>
  );
}
