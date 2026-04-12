export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <img src="/favicon.svg" alt="" className="w-6 h-6 object-contain" />
          <span className="text-xl font-bold">AquaCool AI</span>
        </div>
        <p className="text-gray-400">Adaptive Cooling &amp; Predictive Aqueduct</p>
        <p className="text-gray-500 mt-4 text-sm">
          Intelligent water cooling for AI-scale data centers — hackathon prototype site (layout forked from Space Apps ORCA project).
        </p>
      </div>
    </footer>
  );
}
