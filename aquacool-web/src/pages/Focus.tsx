import { Target, AlertTriangle, Shield } from 'lucide-react';

export default function Focus() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/ourFocusBg.png)',
            filter: 'brightness(0.25)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/90"></div>

        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our focus</h1>
          <div className="w-20 h-1 bg-blue-400 mb-8"></div>
          <p className="text-2xl text-gray-200 leading-relaxed">
            Prioritizing AI-dense rows, water-constrained campuses, and operators who need defensible savings metrics —
            not just cooler charts.
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
          <h2 className="text-4xl font-bold mb-12 text-center">Priority thermal profiles</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border-l-4 border-red-500">
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">GPU training bursts</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                All-reducers and checkpoint I/O create sharp, synchronized heat steps — the classic failure mode for
                reactive cooling.
              </p>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-red-500 font-bold">10–30 MW</span> per hall spikes
                </p>
                <p>
                  <span className="text-red-500 font-bold">Minutes</span> ramp time
                </p>
                <p>
                  <span className="text-red-500 font-bold">High</span> water penalty if late
                </p>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border-l-4 border-yellow-600">
              <AlertTriangle className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Water-budget campuses</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Sites under municipal allocation caps or drought watches need every ton-hour rejected with minimum
                evaporation.
              </p>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-yellow-600 font-bold">Permit-limited</span> makeup flows
                </p>
                <p>
                  <span className="text-yellow-600 font-bold">High $/gal</span> during peak seasons
                </p>
                <p>
                  <span className="text-yellow-600 font-bold">Critical</span> ESG reporting fidelity
                </p>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border-l-4 border-blue-400">
              <AlertTriangle className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Air-side constrained halls</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Legacy CRAC capacity hits ceilings before liquid upgrades finish — predictive staging buys time without
                tripping breakers.
              </p>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-blue-400 font-bold">Hot spots</span> at aisle ends
                </p>
                <p>
                  <span className="text-blue-400 font-bold">Recirculation</span> risk
                </p>
                <p>
                  <span className="text-blue-400 font-bold">Mixed</span> rack densities
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Risk scoring methodology</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              AquaCool ranks cabinets using spike probability, derivative stress, neighbor coupling, and historical
              vulnerability — not just instantaneous temperature.
            </p>
            <div className="flex items-center gap-4">
              <Target className="w-10 h-10 text-green-400" />
              <p className="text-gray-300">
                Operators see a prioritized queue: where to pre-position flow first when budgets are tight.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900">
        <div className="relative max-w-5xl mx-auto text-center">
          <Shield className="w-14 h-14 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Safety never negotiates</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Even when models disagree, hardware interlocks and human overrides stay authoritative — savings are a bonus,
            not a gamble with silicon or people.
          </p>
        </div>
      </section>
    </div>
  );
}
