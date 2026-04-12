import { DollarSign, TrendingUp, PieChart } from 'lucide-react';

export default function Financial() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Financial outlook</h1>
          <div className="w-20 h-1 bg-blue-400 mb-8"></div>
          <p className="text-2xl text-gray-200 leading-relaxed">
            SaaS + performance fees tied to measurable water and energy savings — not science-project budgets alone.
          </p>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-black">
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Funding requirements (illustrative)</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <DollarSign className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Pre-seed</h3>
              <p className="text-4xl font-bold text-blue-400 mb-4">$1.5M</p>
              <p className="text-gray-300 mb-4">Months 0–12</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Core ML + controls engineers</li>
                <li>• Pilot site instrumentation</li>
                <li>• Security review + pen tests</li>
                <li>• Compliance templates</li>
              </ul>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <DollarSign className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Seed</h3>
              <p className="text-4xl font-bold text-yellow-600 mb-4">$6M</p>
              <p className="text-gray-300 mb-4">Months 12–24</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Multi-row shadow deployments</li>
                <li>• Integrator certifications</li>
                <li>• Customer success team</li>
                <li>• On-prem air-gapped option</li>
              </ul>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <DollarSign className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Series A</h3>
              <p className="text-4xl font-bold text-green-500 mb-4">$18M</p>
              <p className="text-gray-300 mb-4">Months 24–42</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Fleet SOC + 24/7 support</li>
                <li>• OEM valve partnerships</li>
                <li>• Global field engineering</li>
                <li>• Advanced optimization R&amp;D</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-10 h-10 text-green-500 mr-4" />
              <div>
                <h3 className="text-3xl font-bold">Illustrative raise through Series A</h3>
                <p className="text-5xl font-bold text-green-500 mt-2">~$25.5M</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              Enough to graduate from hackathon-class demos to signed pilots with measurable gal/kWh deltas and insurer
              comfort letters.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Revenue streams</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <PieChart className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">SaaS control plane</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Per-MW or per-rack subscriptions for telemetry ingestion, model hosting, dashboards, and API keys.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Year 2 ARR (target)</span>
                  <span className="text-xl font-bold text-blue-400">$2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Year 4 ARR (target)</span>
                  <span className="text-xl font-bold text-blue-400">$18M</span>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <PieChart className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Performance fees</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Shared savings on water and demand-charge reductions verified against baseline months — aligns incentives
                with sustainability KPIs.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Year 3 fee income</span>
                  <span className="text-xl font-bold text-yellow-600">$1M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Year 5 fee income</span>
                  <span className="text-xl font-bold text-yellow-600">$12M</span>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <PieChart className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Professional services</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Commissioning, digital twin calibration, and controls integration sold with statement-of-work pricing.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Year 2 bookings</span>
                  <span className="text-xl font-bold text-green-500">$0.8M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Year 4 bookings</span>
                  <span className="text-xl font-bold text-green-500">$6M</span>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <PieChart className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Data &amp; insights</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Anonymized thermal benchmarks sold back to OEMs and utilities — optional, opt-in, with strict aggregation
                floors.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Year 3 revenue</span>
                  <span className="text-xl font-bold text-red-500">$0.3M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Year 5 revenue</span>
                  <span className="text-xl font-bold text-red-500">$4M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-lg border-2 border-green-500">
            <h3 className="text-3xl font-bold mb-4 text-center">Target blended ARR (year 5)</h3>
            <p className="text-6xl font-bold text-green-500 text-center">$40M</p>
            <p className="text-center text-gray-400 mt-4 text-sm">
              Illustrative only — depends on pilot conversion, fee structures, and geographic expansion pace.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Investor notes</h2>
          <div className="w-20 h-1 bg-blue-400 mb-8"></div>

          <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-12">
            <p>
              Gross margins for pure software can exceed 75%; blended margins land near 60% once field engineering is
              included. Working capital cycles are lighter than hardware-first cleantech because AquaCool orchestrates
              existing plant assets.
            </p>
            <p>
              Comparable exits include building IoT platforms and industrial AI controls vendors acquired by automation
              incumbents — strategics pay for recurring revenue plus energy/water outcomes narratives.
            </p>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-6">Returns &amp; exits</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Strategic acquirers include colocation operators, BMS majors, and hyperscale internal tooling teams looking
              to accelerate in-house optimization platforms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              IPO path exists only at fleet scale; earlier liquidity more likely via Series B+ growth rounds or
              tuck-in acquisitions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
