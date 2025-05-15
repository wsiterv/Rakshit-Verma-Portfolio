import { useState, useEffect } from 'react';
import { Terminal, User, Menu, X } from 'lucide-react';

const PORTFOLIO_OWNER = "Rakshit Verma";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact Me", href: "#contact" }
];

export default function Navbar({ currentMode, onModeChange }) {
  const [mode, setMode] = useState(currentMode || 'gui'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (onModeChange) {
      onModeChange(mode);
    }
  }, [mode, onModeChange]);
  
  const toggleMode = () => {
    setMode(mode === 'gui' ? 'cli' : 'gui');
    setMobileMenuOpen(false); 
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`w-full transition-all duration-300 ease-in-out ${mode === 'gui' 
      ? 'bg-white text-gray-800 shadow-md py-4' 
      : 'bg-gray-900 text-green-400 border-b border-green-500 py-6 font-mono'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items justify-between">
          {mode === 'gui' && (
            <a href="#" className="font-bold text-xl ">
              {PORTFOLIO_OWNER}
            </a>
          )}

          {mode === 'cli' && <div></div>}

          <button 
            onClick={toggleMode}
            className={`flex items-center justify-center p-2 rounded-full transition-all ${
              mode === 'gui' 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                : 'bg-gray-800 hover:bg-gray-700 text-green-400 border border-green-500'
            }`}
            aria-label={mode === 'gui' ? 'Switch to CLI Mode' : 'Switch to GUI Mode'}
          >
            {mode === 'gui' ? (
              <>
              <pre className='text-emerald-700 font-bold'>CLI  </pre>
              <Terminal size={20} />
              </>
              
            ) : (
                  <>
              <pre className='text-emerald-700 font-bold'>GUI  </pre>
              <User size={20} />
              </>
            )}
          </button>

          {mode === 'gui' && (
            <div className="hidden md:flex space-x-4">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="hover:text-blue-900 hover:font-bold transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          {/* Mobile menu button (only in GUI mode) */}
          {mode === 'gui' && (
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-800 p-1"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}

          {/* CLI mode shows nothing on right */}
          {mode === 'cli' && <div></div>}
        </div>
        
        {/* Mobile menu dropdown (only in GUI mode) */}
        {mode === 'gui' && mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="hover:text-blue-600 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}