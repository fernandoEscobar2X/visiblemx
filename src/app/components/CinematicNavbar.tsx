import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Menu, X, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';

export function CinematicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      }
    );
  }, []);

  const navItems = [
    { label: 'Productos', href: '#productos' },
    { label: 'Demos', href: '#demos' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? 'w-[95%] max-w-7xl' : 'w-[95%] max-w-7xl'
      }`}
    >
      {/* Glassmorphism Container */}
      <div
        className={`relative rounded-[1rem] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-[#00F0FF]/10'
            : 'bg-transparent border border-white/5'
        }`}
      >
        {/* Glow effect on scroll */}
        {scrolled && (
          <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-r from-[#00F0FF]/10 via-transparent to-[#00F0FF]/10 blur-xl -z-10" />
        )}

        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-cyan-500 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              
              {/* Logo container */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#00F0FF] via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-xl font-black text-[#000000]">V</span>
              </div>
            </div>
            
            <div>
              <span className="text-lg font-black text-white tracking-tight">
                VISIBLE MX
              </span>
              <p className="text-[10px] text-[#00F0FF] font-bold uppercase tracking-widest">
                Digital Growth
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm font-bold text-gray-300 hover:text-white transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00F0FF] to-cyan-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button con efecto magnético */}
          <a
            href="#contacto"
            className="hidden lg:flex relative px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-cyan-500 rounded-xl font-black text-sm text-[#000000] overflow-hidden group"
          >
            {/* Animated shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            <span className="relative flex items-center gap-2">
              <Zap className="w-4 h-4" />
              INICIAR PROYECTO
            </span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0A0A0B]/95 backdrop-blur-2xl rounded-b-[1rem]">
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-bold text-gray-300 hover:text-[#00F0FF] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                className="block w-full px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-cyan-500 rounded-xl font-black text-center text-[#000000]"
              >
                INICIAR PROYECTO
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
