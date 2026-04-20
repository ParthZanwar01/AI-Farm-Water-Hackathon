import { Calendar, CheckCircle, Clock } from 'lucide-react';

export default function Development() {
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

        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">AquaCool Development Plan</h1>
          <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
          <p className="text-2xl text-gray-200 leading-relaxed">
            A three-phase path from credible simulation to closed-loop advisory cooling in production data halls.
          </p>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(/images/predictiveMaintainence.png)',
          }}
        ></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="space-y-12">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border-l-4 border-red-500">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-red-500 mr-4" />
                <h2 className="text-3xl font-bold">Phase 1: Simulation &amp; API (months 0–6)</h2>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                Ship the digital twin, Flask endpoints, and reproducible datasets. Hard goal: demonstrate 60% water
                reduction vs reactive baseline in Monte Carlo spike suites without touching production hardware.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-red-400">Key milestones</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Three.js room + heatmap + mode toggles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Sklearn pipeline with versioned pickles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>CSV ingest + synthetic spike generators</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>CI smoke tests on API contracts</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-red-400">Funding / resourcing</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Hackathon + university credits</li>
                    <li>• Cloud credits for training jobs</li>
                    <li>• Partner facility in-kind telemetry (optional)</li>
                    <li>• Open-source release for community review</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-blue-400 mr-4" />
                <h2 className="text-3xl font-bold">Phase 2: Shadow deployment (months 6–18)</h2>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                Read-only taps on a live row — predictions logged beside operator actions without commanding valves.
                Tune calibration, measure false positives, and align timestamps with BMS historians.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Key milestones</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Secure gateway + secret rotation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Probability calibration dashboards</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>On-call runbooks for model rollback</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Water meter cross-checks</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Funding / resourcing</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Seed round for field engineering hires</li>
                    <li>• Facility pilot stipends</li>
                    <li>• OEM partnerships for valve maps</li>
                    <li>• Insurance + liability review</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border-l-4 border-yellow-600">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-yellow-600 mr-4" />
                <h2 className="text-3xl font-bold">Phase 3: Closed-loop advisory (18+ months)</h2>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                Human-approved or policy-bounded actuation: suggest setpoints, nudge valves, participate in demand
                response. Expand fleet learning with privacy-preserving aggregation across campuses.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-600">Key milestones</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Signed commands + mechanical interlocks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Multi-site control plane</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>DR planning for inference outage</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>ISO-aligned documentation kits</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-600">Funding / resourcing</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Series A for fleet SOC</li>
                    <li>• Performance contracts tied to gal/kWh</li>
                    <li>• Utility co-marketing for water savings</li>
                    <li>• Enterprise support tiers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900">
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Risk management</h2>
          <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Cooling mistakes can strand GPUs or void warranties. AquaCool treats ML as advisory until mechanical teams
            sign off — every release bundles fault trees, rollback switches, and dry-run simulations.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Partnerships with controls integrators de-risk field deployments; open telemetry formats keep customers from
            feeling locked in.
          </p>
        </div>
      </section>
    </div>
  );
}
