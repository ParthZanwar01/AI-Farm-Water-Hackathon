import { Layers, Recycle, Globe } from 'lucide-react';

export default function Scalability() {
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

        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Scalability &amp; sustainability</h1>
          <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
          <p className="text-2xl text-gray-200 leading-relaxed">
            Multi-site software architecture and water-stewardship narratives that compound as AquaCool attaches to more
            megawatts of AI load.
          </p>
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
          <h2 className="text-4xl font-bold mb-12 text-center">Scalable architecture</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center mb-6">
                <Layers className="w-12 h-12 text-yellow-600 mr-4" />
                <h3 className="text-3xl font-bold">Modular services</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Each facility runs an edge collector + local inference with optional cloud burst for retraining. Sites
                stay online when WAN links flap — cooling policies degrade to reactive baselines, never silent failure.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Containerized model servers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Feature store compatible exports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Federated aggregation hooks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Per-tenant RBAC boundaries</span>
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

          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-6">Network effects</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              More campuses contributing anonymized thermal traces improves priors for new installs — cold start risk
              drops with every additional MW under monitoring.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-600 mb-2">2×</p>
                <p className="text-gray-400">Faster calibration with shared priors</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400 mb-2">40%</p>
                <p className="text-gray-400">Ops cost reduction at 10+ sites</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-500 mb-2">15%</p>
                <p className="text-gray-400">Additional water savings at fleet scale</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-500 mb-2">99.95%</p>
                <p className="text-gray-400">Target control-plane availability</p>
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
              'url(https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Environmental sustainability</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div
              className="h-96 bg-cover bg-center rounded-lg border border-gray-800"
              style={{
                backgroundImage:
                  'url(https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800)',
              }}
            ></div>
            <div>
              <div className="flex items-center mb-6">
                <Recycle className="w-12 h-12 text-green-500 mr-4" />
                <h3 className="text-3xl font-bold">Water stewardship</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Every gallon avoided at the tower is a gallon left for watersheds hosting AI infrastructure. AquaCool
                documents savings for ESG disclosures and utility rebate filings.
              </p>
              <div className="space-y-4">
                <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                  <h4 className="text-xl font-semibold mb-2 text-green-400">Makeup reduction</h4>
                  <p className="text-gray-400">
                    Shorter peak flows cut evaporation losses and treatment chemical usage — measurable in conductivity
                    trends, not just marketing slides.
                  </p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                  <h4 className="text-xl font-semibold mb-2 text-blue-400">Wastewater alignment</h4>
                  <p className="text-gray-400">
                    Coordinated blowdown schedules with permit limits become easier when thermal spikes are flattened.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-6">Zero-regret operations</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Software guardrails ensure we never chase marginal savings into SLA breaches — customer workloads stay
              protected while sustainability KPIs improve.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-green-500 mb-2">0</p>
                <p className="text-gray-400">Cooling-related SLA violations (target)</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500 mb-2">100%</p>
                <p className="text-gray-400">Auditable intervention logs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500 mb-2">60%</p>
                <p className="text-gray-400">Demo water reduction vs reactive</p>
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
              'url(https://images.pexels.com/photos/796206/pexels-photo-796206.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Global footprint</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Globe className="w-12 h-12 text-blue-400 mr-4" />
                <h3 className="text-3xl font-bold">Regional deployments</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Water scarcity profiles differ by geography — models learn local ambient wet-bulb behavior, tariff
                structures, and seasonal restrictions to prioritize interventions when it matters most.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Multi-language operator consoles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>GDPR / SOC2 aligned logging modes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Edge caching for submarine cable RTT</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Partner SIs in each major market</span>
                </li>
              </ul>
            </div>
            <div
              className="h-96 bg-cover bg-center rounded-lg border border-gray-800"
              style={{
                backgroundImage:
                  'url(https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=800)',
              }}
            ></div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/2166722/pexels-photo-2166722.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Long-term vision</h2>
          <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Fleet-scale AquaCool becomes the default coordination layer between AI schedulers and facility plants —
            training jobs negotiate their thermal envelopes the same way they negotiate GPUs.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Revenue from savings shares funds open research into low-GWP refrigerants and closed-loop water tech —
            software margin subsidizing hardware sustainability bets.
          </p>
        </div>
      </section>
    </div>
  );
}
