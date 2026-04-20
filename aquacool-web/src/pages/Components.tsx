import { useState, useRef, useEffect } from 'react';
import { Zap, Settings, Grip, ArrowRight, ExternalLink } from 'lucide-react';

export default function Components() {
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

  const components = [
    {
      id: 1,
      title: 'Rack manifold & CDU tie-in',
      subtitle: 'Distribution',
      description:
        'Balances flow across four racks and twenty-four servers, enabling partial activation instead of hall-wide deluge when only one aisle is stressed.',
      image: '/images/bodydecant2.png',
      icon: Settings,
      color: 'text-blue-400',
      features: [
        'Per-rack flow budgeting',
        'Pressure-aware staging',
        'Secondary loop isolation',
        'Hot-swappable telemetry taps (roadmap)',
      ],
      applications: 'Cold-aisle containment, dual-loop facilities, retrofit manifolds',
    },
    {
      id: 2,
      title: 'Rear-door & cold-plate exchangers',
      subtitle: 'Heat capture',
      description:
        'Captures GPU and CPU heat close to the silicon so water does the heavy lifting before CRACs fight a losing air battle.',
      image: '/images/heatcont2.png',
      icon: Zap,
      color: 'text-red-400',
      features: [
        'High flux density zones',
        'Liquid-first rejection path',
        'Compatible with hybrid air assist',
        'Temperature stratification sensing',
      ],
      applications: 'AI training nodes, inference clusters, HPC bursts',
    },
    {
      id: 3,
      title: 'Telemetry aggregation bus',
      subtitle: 'Sense fabric',
      description:
        'Collects 1 Hz (demo) temperature traces, cooling flags, and neighbor aggregates used by the feature engineering pipeline feeding sklearn models.',
      image: '/images/centri2.png',
      icon: Grip,
      color: 'text-green-400',
      features: [
        'Time-aligned buffers',
        'CSV + API export',
        'Neighbor diffusion hints',
        'Simulation + live toggle',
      ],
      applications: 'Digital twin calibration, operator training, KPI dashboards',
    },
    {
      id: 4,
      title: 'Failsafe & alarm orchestration',
      subtitle: 'Safety',
      description:
        'Keeps reactive thresholds and manual overrides authoritative — AI suggestions never remove hardware interlocks.',
      image: '/images/slag2.png',
      icon: Settings,
      color: 'text-gray-400',
      features: [
        '85°F hardware trip path',
        'Operator acknowledgement hooks',
        'Audit log per intervention',
        'Graceful model-degrade mode',
      ],
      applications: 'Compliance reviews, incident retrospectives, commissioning',
    },
    {
      id: 5,
      title: 'Pump & valve actuation layer',
      subtitle: 'Actuation',
      description:
        'Maps ML intents to pump VFD curves and valve positions with ramp limits so hydraulics stay within mechanical warranties.',
      image: '/images/spool2.png',
      icon: Zap,
      color: 'text-yellow-400',
      features: [
        'Flow setpoint slewing',
        'Minimum runtime guards',
        'Water gallon accounting',
        'Predictive pre-positioning',
      ],
      applications: 'CRAC coordination, tower makeup reduction, demand response',
    },
    {
      id: 6,
      title: 'Operator cockpit (Three.js)',
      subtitle: 'Experience',
      description:
        'Immersive server room twin with heatmap modal, mode toggles, and live KPIs so finance and facilities share one narrative.',
      image: '/images/printer2.png',
      icon: Zap,
      color: 'text-purple-400',
      features: [
        '4×6 spatial fidelity',
        'Heatmap + rack cards',
        'Water saved counters',
        'Holiday / standard themes',
      ],
      applications: 'Hackathon demos, design reviews, executive walkthroughs',
    },
  ];

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

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">AquaCool Components</h1>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-200 leading-relaxed mb-6 font-light max-w-4xl mx-auto">
            Physical and digital subsystems that turn telemetry into measured water savings.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Visuals reuse the Space Apps art pack as stand-ins — swap for CAD exports or photogrammetry when available.
          </p>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Subsystem deep dives</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Six modules map cleanly onto observe → infer → interdict responsibilities.
            </p>
          </div>

          <div className="space-y-24">
            {components.map((component, index) => {
              const IconComponent = component.icon;
              const isVisible = visibleItems.includes(index);

              return (
                <div
                  key={component.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className={`relative transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-5 rounded-lg"
                    style={{
                      backgroundImage: `url(${component.image})`,
                    }}
                  ></div>

                  <div
                    className={`relative grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                  >
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="relative group h-64 rounded-lg border border-gray-800 flex items-center justify-center bg-gray-900">
                        <img
                          src={component.image}
                          alt={component.title}
                          className={`object-contain ${component.id === 4 ? 'w-5/6 h-5/6' : 'w-4/5 h-4/5'}`}
                        />
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-white text-sm font-medium">{component.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="flex items-center mb-4">
                        <IconComponent className={`w-8 h-8 ${component.color} mr-3`} />
                        <h3 className="text-3xl font-bold">{component.title}</h3>
                      </div>

                      <p className="text-lg text-gray-300 leading-relaxed mb-6">{component.description}</p>

                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-3 text-gray-200">Key features</h4>
                        <ul className="space-y-2">
                          {component.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <ArrowRight className="w-4 h-4 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <h4 className="text-lg font-semibold mb-2 text-gray-200 flex items-center">
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Applications
                        </h4>
                        <p className="text-gray-400">{component.applications}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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

        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Integrated architecture</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
            Sense fabric, inference service, and actuation policy share contracts so each layer can evolve independently
            — swap sklearn for XGBoost, or Flask for FastAPI, without rewriting the twin.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Grip className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">1. Observe</h3>
              <p className="text-gray-400">High-rate telemetry + neighbor coupling illuminate emerging hotspots.</p>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Settings className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">2. Infer</h3>
              <p className="text-gray-400">Ensemble models convert features into calibrated spike risk scores.</p>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">3. Interdict</h3>
              <p className="text-gray-400">Hydraulics execute partial-flow plans with mechanical guardrails.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
