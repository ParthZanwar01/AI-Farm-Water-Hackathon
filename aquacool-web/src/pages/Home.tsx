export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-24 pb-32 px-4 overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            filter: 'brightness(0.3)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-gray-900"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight">
              AquaCool AI
              <br />
              Technologies
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
              Adaptive Cooling &amp; Predictive Aqueduct — transforming reactive data-center water cooling into
              targeted, ML-driven thermal control before heat spikes breach safe limits.
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mt-6">
              Pioneering lower hydraulic intensity for AI farms through sub-second telemetry, ensemble heat-spike
              prediction, and proactive liquid cooling that activates in the high-70s °F instead of waiting for 85°F+.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">AquaCool Mission Overview</h2>
          <div className="w-24 h-1 bg-red-500 mb-12 mx-auto"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-red-500">Observe</h3>
              <p className="text-gray-300 leading-relaxed">
                24 servers across 4 racks sampled every second — temperatures, cooling state, and neighbor heat
                diffusion feed a live buffer used for inference and continuous model refresh.
              </p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Infer</h3>
              <p className="text-gray-300 leading-relaxed">
                Gradient boosting / random forest models score spike probability from 37+ features (lags, rolling
                stats, spatial neighbors, time-of-day). Above ~70% confidence, cooling pre-arms before thresholds.
              </p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">Interdict</h3>
              <p className="text-gray-300 leading-relaxed">
                Partial-flow interventions (~0.8 gal per proactive event vs ~2.0 gal reactive) shave roughly 60% water
                while keeping peaks out of the danger band — with a reactive failsafe if physics diverges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
