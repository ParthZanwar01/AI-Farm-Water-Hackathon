import { Target, Zap, Shield, Rocket, Calendar, Wrench, Network } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ORCA() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-32 px-4 overflow-hidden h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            filter: 'brightness(0.25)',
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform',
            backgroundAttachment: 'fixed',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/90"></div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">AquaCool Cooling Platform</h1>
            <div className="w-20 h-1 bg-red-500 mb-6"></div>
            <p className="text-2xl text-gray-200 leading-relaxed mb-6 font-light">
              Predictive liquid cooling for dense AI compute — same safety, less water.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              AquaCool unifies rack telemetry, ML inference, and cooling actuation so operators intervene before thermal
              runaway instead of after. The stack mirrors mission-critical aerospace control: observe, decide, commit
              resources, verify.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our demo maps a 4×6 server room with simulated spikes; production deployments would attach to your BMS,
              CRAC metrics, and facility water meters for fleet-wide optimization.
            </p>
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
          <h2 className="text-4xl font-bold mb-12 text-center">Key Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Target className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Thermal targeting</h3>
              <p className="text-gray-400">
                Per-server awareness with rack neighbor coupling so cooling follows the heat gradient instead of
                blanketing the hall.
              </p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Zap className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Predictive actuation</h3>
              <p className="text-gray-400">
                Models trained on historical spikes output short-horizon risk scores to arm valves and pumps early.
              </p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Shield className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Failsafe envelope</h3>
              <p className="text-gray-400">
                Reactive trip still exists at 85°F; AI mode aims to absorb spikes below that line to reduce stress and
                flow minutes.
              </p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <img src="/favicon.svg" alt="" className="w-16 h-16 mb-4 object-contain" />
              <h3 className="text-xl font-bold mb-3">Simulation-ready</h3>
              <p className="text-gray-400">
                Flask API + Three.js room for stakeholder walkthroughs — toggle Standard vs AI and watch water savings
                accrue.
              </p>
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
          <h2 className="text-4xl font-bold mb-8">The Problem We Solve</h2>
          <div className="w-20 h-1 bg-red-500 mb-8"></div>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Hyperscale AI training pushes facility heat rejection faster than many campuses can justify in evaporative
              water draw. Cooling towers are effective — and thirsty. Small improvements in gallons per kWh compound
              across thousands of servers.
            </p>
            <p>
              Traditional reactive controls wait for a trip temperature, then open loops wide. That guarantees peak
              flow and peak hardware exposure. There is no lookahead — only damage control.
            </p>
            <p>
              AquaCool provides the missing layer: a software-defined cooling coordinator that predicts localized
              spikes, stages gentler flow sooner, and releases sooner — preserving margins while cutting hydraulic duty.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">AquaCool System Architecture</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-12"></div>

          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-blue-400">Control plane</h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  The control plane ingests normalized telemetry from every node, aligns timestamps, and publishes
                  predictions to the actuation service. It owns model versioning, A/B between Standard and AI modes,
                  and audit logs for each cooling event.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  In the hackathon build this is a lightweight Flask service; in production it would sit beside your
                  DCIM stack with authenticated callbacks to plant controllers.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-semibold mb-2 text-blue-400">Key statistics (demo)</h4>
                  <p className="text-gray-300">
                    24 instrumented zones · 1 Hz sampling · 37+ engineered features per inference tick · dual mode
                    (reactive vs predictive) for apples-to-apples comparison.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/satellite.png"
                  alt="Control stack illustration"
                  className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] object-contain"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/images/grabsat.png"
                  alt="Cooling distribution"
                  className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] object-contain mx-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4 text-green-400">Loop &amp; manifold layer</h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Secondary loops move water to cold plates and rear-door heat exchangers. AquaCool issues zone-level
                  requests — which manifold branches to bias, which CRAC setpoints to nudge — instead of saturating the
                  entire white space.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  The demo collapses this into per-server &quot;cooling active&quot; flags; a facility integration would map
                  those intents to valve positions and pump VFD curves with rate limits for mechanical safety.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-semibold mb-2 text-green-400">Key statistics</h4>
                  <p className="text-gray-300">
                    ~0.8 gal per proactive event vs ~2.0 gal reactive in simulation — roughly 60% reduction in water
                    mass for comparable peak temperature containment.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-yellow-400">Edge sensing fabric</h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Dense edge sampling catches micro-trends: a neighbor rack warming before your aisle shows stress,
                  accelerations in temperature derivative, and calendar-driven training windows.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Feature engineering mirrors industrial time-series practice — multi-step lags, rolling means/std,
                  neighbor aggregates — so the model generalizes beyond a single lab rig.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-semibold mb-2 text-yellow-400">Key statistics</h4>
                  <p className="text-gray-300">
                    ~30 seconds effective lookahead in the demo stack; horizons tune with physics timestep and sensor
                    cadence in deployment.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/websat.png"
                  alt="Edge sensing illustration"
                  className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TimelineSection />
    </div>
  );
}

function TimelineSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px',
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    {
      year: 'Now',
      title: 'Simulation + API hardening',
      description:
        'Ship the Three.js digital twin, Flask endpoints, and dataset capture so teams can replay heat scenarios and label interventions.',
      icon: Rocket,
      color: 'text-blue-400',
    },
    {
      year: 'Next',
      title: 'Pilot in a live lab row',
      description:
        'Attach read-only telemetry from a single cold-aisle, shadow-mode predictions against operator baselines, and measure forecast skill.',
      icon: Calendar,
      color: 'text-green-400',
    },
    {
      year: 'Then',
      title: 'Closed-loop advisory',
      description:
        'Human-in-the-loop recommendations to plant controllers; tune guardrails for pump ramp rates and minimum flow contracts.',
      icon: Wrench,
      color: 'text-yellow-400',
    },
    {
      year: 'Scale',
      title: 'Fleet learning',
      description:
        'Federated model updates across sites with differential privacy — better priors for new campuses without centralizing raw telemetry.',
      icon: Network,
      color: 'text-purple-400',
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      ></div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Product roadmap</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From credible simulation to production-grade cooling coordination.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 via-yellow-500 to-purple-500 rounded-full"></div>

          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const IconComponent = item.icon;
              const isVisible = visibleItems.includes(index);

              return (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className={`relative flex items-center transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-gray-900 z-10 flex items-center justify-center">
                    <IconComponent className={`w-6 h-6 ${item.color}`} />
                  </div>

                  <div className={`ml-16 md:ml-0 w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                      <div className="flex items-center mb-3">
                        <IconComponent className={`w-6 h-6 ${item.color} mr-3`} />
                        <span className="text-2xl font-bold text-white">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-100">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
