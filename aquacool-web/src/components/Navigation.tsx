import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { SIMULATOR_URL } from '../config';

export default function Navigation() {
  const [businessPlanOpen, setBusinessPlanOpen] = useState(false);
  const [prototypesOpen, setPrototypesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const businessPlanRef = useRef<HTMLDivElement>(null);
  const prototypesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (businessPlanRef.current && !businessPlanRef.current.contains(event.target as Node)) {
        setBusinessPlanOpen(false);
      }
      if (prototypesRef.current && !prototypesRef.current.contains(event.target as Node)) {
        setPrototypesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeAllDropdowns = () => {
    setBusinessPlanOpen(false);
    setPrototypesOpen(false);
  };

  return (
    <nav className="bg-black/80 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 min-w-0">
            <img src="/favicon.svg" alt="" className="w-8 h-8 object-contain shrink-0" />
            <span className="text-lg sm:text-xl font-bold tracking-wide truncate">
              AquaCool AI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-red-500 transition-colors shrink-0">
              Home
            </Link>
            <a
              href={SIMULATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors shrink-0"
            >
              Live simulator
            </a>

            <div className="relative" ref={businessPlanRef}>
              <button
                type="button"
                onClick={() => {
                  setBusinessPlanOpen(!businessPlanOpen);
                  setPrototypesOpen(false);
                }}
                className="flex items-center space-x-1 hover:text-red-500 transition-colors"
              >
                <span>Project plan</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${businessPlanOpen ? 'rotate-180' : ''}`} />
              </button>
              {businessPlanOpen && (
                <div className="absolute top-full mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
                  <Link to="/development" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">Development</Link>
                  <Link to="/financial" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">Financial outlook</Link>
                  <Link to="/scalability" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">Scalability &amp; sustainability</Link>
                  <Link to="/regulations" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">Compliance &amp; standards</Link>
                  <Link to="/focus" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">Our focus</Link>
                  <Link to="/future" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors">Future</Link>
                </div>
              )}
            </div>

            <div className="relative" ref={prototypesRef}>
              <button
                type="button"
                onClick={() => {
                  setPrototypesOpen(!prototypesOpen);
                  setBusinessPlanOpen(false);
                }}
                className="flex items-center space-x-1 hover:text-red-500 transition-colors"
              >
                <span>System &amp; tech</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${prototypesOpen ? 'rotate-180' : ''}`} />
              </button>
              {prototypesOpen && (
                <div className="absolute top-full mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
                  <Link to="/orca" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">Cooling platform</Link>
                  <Link to="/neural-detection" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">Heat prediction engine</Link>
                  <Link to="/technologies" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">Technologies</Link>
                  <Link to="/components" onClick={closeAllDropdowns} className="block px-4 py-3 hover:bg-gray-700 transition-colors">Core components</Link>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <a href={SIMULATOR_URL} target="_blank" rel="noopener noreferrer" className="block text-cyan-400 font-semibold">Live simulator</a>
            <div className="space-y-2">
              <p className="font-semibold text-gray-400 text-sm">Project plan</p>
              <Link to="/development" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Development</Link>
              <Link to="/financial" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Financial outlook</Link>
              <Link to="/scalability" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Scalability &amp; sustainability</Link>
              <Link to="/regulations" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Compliance &amp; standards</Link>
              <Link to="/focus" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Our focus</Link>
              <Link to="/future" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Future</Link>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-400 text-sm">System &amp; tech</p>
              <Link to="/orca" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Cooling platform</Link>
              <Link to="/neural-detection" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Heat prediction engine</Link>
              <Link to="/technologies" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Technologies</Link>
              <Link to="/components" className="block pl-4 hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Core components</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
