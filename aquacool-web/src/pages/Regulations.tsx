import { Scale, Users, FileText } from 'lucide-react';

export default function Regulations() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/23769/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1920)',
            filter: 'brightness(0.25)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/90"></div>

        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Compliance &amp; standards</h1>
          <div className="w-20 h-1 bg-red-500 mb-8"></div>
          <p className="text-2xl text-gray-200 leading-relaxed">
            Cooling touches life-safety, electrical codes, water permits, and workplace rules — AquaCool is designed for
            auditability from day one.
          </p>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Frameworks we align with</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Scale className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">ASHRAE / TC 9.9</h3>
              <p className="text-gray-400 leading-relaxed">
                Mission-critical class guidance for temperature/humidity bands — our policies map to the same envelope
                definitions facilities already certify against.
              </p>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <FileText className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">ISO / IEC 27001</h3>
              <p className="text-gray-400 leading-relaxed">
                Security controls for telemetry ingestion, key management, and vendor access — required before
                enterprise procurement teams stamp approval.
              </p>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <FileText className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">NERC / grid interconnection</h3>
              <p className="text-gray-400 leading-relaxed">
                When AquaCool participates in demand response, we document control-loop latency and fail-safe paths for
                grid operators.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Safety case philosophy</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              ML recommendations are advisory until mechanical engineers sign interlock matrices. We ship hazard analyses
              tying each software release to valve provenance, pump curves, and human override latency measurements.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/2166476/pexels-photo-2166476.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Stakeholder engagement</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Facilities + IT joint governance</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Thermal policy is inherently cross-functional. AquaCool ships RACI templates so CIO, VP Engineering, and
                Chief Engineer sign the same control narrative.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Quarterly tabletop exercises</li>
                <li>• Signed rollback drills before model promotion</li>
                <li>• Joint on-call bridges during heat waves</li>
              </ul>
            </div>
            <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
              <h4 className="text-xl font-semibold mb-3 text-yellow-600">Water permits</h4>
              <p className="text-gray-400 leading-relaxed">
                Municipal discharge and intake permits often cap blowdown rates. Savings dashboards translate model
                behavior into language environmental regulators already expect.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
