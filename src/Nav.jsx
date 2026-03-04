import { useState, useEffect } from 'react';
import { Terminal, User, Menu, X } from 'lucide-react';

const PORTFOLIO_OWNER = "Rakshit Verma";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ currentMode, onModeChange }) {
  const [mode, setMode] = useState(currentMode || 'gui');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (onModeChange) onModeChange(mode);
  }, [mode, onModeChange]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMode = () => {
    setMode(mode === 'gui' ? 'cli' : 'gui');
    setMobileMenuOpen(false);
  };

  if (mode === 'cli') {
    return (
      <nav style={{
        background: '#1f2937',
        borderBottom: '1px solid #374151',
        padding: '0 1.5rem',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: "'Courier New', monospace",
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 600 }}>
          rakshit@portfolio:~$
        </span>
        <button
          onClick={toggleMode}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 14px', borderRadius: 6,
            background: '#111827', border: '1px solid #4ade80',
            color: '#4ade80', fontSize: '0.78rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1f2937'}
          onMouseLeave={e => e.currentTarget.style.background = '#111827'}
        >
          <User size={14} /> GUI mode
        </button>
      </nav>
    );
  }

  // GUI mode nav — matches the light theme of Gui.jsx
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,250,248,0.95)' : 'rgba(250,250,248,0.98)',
      backdropFilter: 'blur(14px)',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
      padding: '0 2.5rem', height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      transition: 'border-color 0.3s, background 0.3s',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,wght@1,600&display=swap');
        .nav-link {
          font-size: 0.82rem; font-weight: 500; color: #64748b;
          text-decoration: none; letter-spacing: 0.02em;
          transition: color 0.2s; padding: 4px 0;
          position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1.5px; background: #0e7490;
          transition: width 0.2s;
        }
        .nav-link:hover { color: #0e7490; }
        .nav-link:hover::after { width: 100%; }
        .cli-toggle {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 16px; border-radius: 7px;
          background: transparent; border: 1.5px solid #e2e8f0;
          color: #475569; font-size: 0.78rem; font-weight: 600;
          cursor: pointer; font-family: inherit; letter-spacing: 0.04em;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .cli-toggle:hover { border-color: #0e7490; color: #0e7490; background: #f0fdfa; }
      `}</style>

      {/* Logo */}
      <a href="#" style={{
        fontFamily: "'Fraunces', serif", fontStyle: 'italic',
        fontWeight: 600, fontSize: '1rem', color: '#1a1a2e',
        textDecoration: 'none', letterSpacing: '-0.01em',
      }}>
        {PORTFOLIO_OWNER}
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex" style={{ gap: '2rem', alignItems: 'center' }}>
        {NAV_ITEMS.map(item => (
          <a key={item.label} href={item.href} className="nav-link">{item.label}</a>
        ))}
      </div>

      {/* Right side: CLI toggle + mobile menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={toggleMode} className="cli-toggle">
          <Terminal size={14} /> CLI
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute', top: '60px', left: 0, right: 0,
          background: '#fafaf8', borderBottom: '1px solid #f1f5f9',
          padding: '16px 2rem 20px', display: 'flex', flexDirection: 'column', gap: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.9rem', fontWeight: 500, color: '#475569', textDecoration: 'none' }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
