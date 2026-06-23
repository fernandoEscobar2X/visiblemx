import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useHashLink } from '../hooks/useHashScroll';

export function EliteNavbar() {
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { handleHashLinkClick } = useHashLink();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  const content = {
    es: {
      nav: [
        { label: 'Inicio', href: '/' },
        { label: 'Presencia digital', href: '/presencia-digital' },
        { label: 'Servicios', href: '/servicios' },
        { label: 'Contacto', href: '/#contacto' }
      ],
      cta: 'Iniciar proyecto'
    },
    en: {
      nav: [
        { label: 'Home', href: '/' },
        { label: 'Digital presence', href: '/presencia-digital' },
        { label: 'Services', href: '/servicios' },
        { label: 'Contact', href: '/#contacto' }
      ],
      cta: 'Start Project'
    }
  };

  const t = content[language];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}
        className="fixed inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
        style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <div
          className={`
            pointer-events-auto
            mx-auto flex h-14 items-center justify-between rounded-full px-2 transition-all duration-500 ease-out 
            ${
              isScrolled
                ? 'w-full max-w-5xl bg-white border border-slate-200 shadow-md'
                : 'w-[calc(100%-2rem)] max-w-7xl bg-transparent'
            }
          `}
        >
          <Link to="/" onClick={(e) => handleHashLinkClick(e, '/')} className="group flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-95 ${isScrolled ? 'bg-slate-900' : 'bg-white'}`}>
              <div className={`w-3 h-3 rounded-sm ${isScrolled ? 'bg-white' : 'bg-slate-900'}`} />
            </div>
            <span className={`font-bold tracking-tight text-lg transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              VISIBLE<span className={isScrolled ? 'text-slate-400' : 'text-slate-300'}>MX</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {t.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={(e) => handleHashLinkClick(e, item.href)}
                className={`text-sm font-medium transition-colors relative group ${isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-slate-900' : 'bg-white'}`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              aria-label={language === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'}
              className={`text-xs font-bold transition-colors uppercase tracking-wider ${isScrolled ? 'text-slate-500 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
            >
              {language}
            </button>

            <Link
              to="/#contacto"
              onClick={(e) => handleHashLinkClick(e, '/#contacto')}
              className={`hidden sm:flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wide rounded-full hover:scale-105 active:scale-95 transition-all duration-300 ${isScrolled ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
            >
              {t.cta}
            </Link>

            <button
              className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={
                isMenuOpen
                  ? language === 'es'
                    ? 'Cerrar menú'
                    : 'Close menu'
                  : language === 'es'
                    ? 'Abrir menú'
                    : 'Open menu'
              }
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transform transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{ opacity: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? 'auto' : 'none' }}
        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden"
      >
        <div className="min-h-[100dvh] overflow-y-auto px-8 pb-10" style={{ paddingTop: 'max(7rem, calc(env(safe-area-inset-top) + 5rem))' }}>
          <div className="mx-auto max-w-sm">
            <div className="flex flex-col gap-8">
              {t.nav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    handleHashLinkClick(e, item.href);
                  }}
                  className="text-2xl font-bold text-slate-900"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/#contacto"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleHashLinkClick(e, '/#contacto');
                }}
                className="mt-2 px-8 py-4 bg-slate-900 text-white text-sm font-bold uppercase tracking-wide rounded-full inline-flex justify-center"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
