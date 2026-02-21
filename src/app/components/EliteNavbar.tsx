import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function EliteNavbar() {
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

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
        { label: 'Sistemas', href: '#sistemas' },
        { label: 'Filosofia', href: '#filosofia' },
        { label: 'Proceso', href: '#proceso' }
      ],
      cta: 'Iniciar Proyecto'
    },
    en: {
      nav: [
        { label: 'Systems', href: '#sistemas' },
        { label: 'Philosophy', href: '#filosofia' },
        { label: 'Process', href: '#proceso' }
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
        aria-label={language === 'es' ? 'Navegacion principal' : 'Main navigation'}
        className="fixed inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
        style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <div
          className={`
            pointer-events-auto
            relative flex items-center justify-between
            h-16 px-6 sm:px-8
            rounded-full transition-all duration-500 ease-out
            ${
              isScrolled
                ? 'w-full max-w-5xl bg-white/80 backdrop-blur-2xl border border-slate-200/50 shadow-sm shadow-slate-900/5'
                : 'w-full max-w-[95%] bg-transparent border border-transparent'
            }
          `}
        >
          <a href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
            <span className="font-bold tracking-tight text-lg text-slate-900">
              VISIBLE<span className="text-slate-400">MX</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-900 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              aria-label={language === 'es' ? 'Cambiar idioma a ingles' : 'Switch language to Spanish'}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
            >
              {language}
            </button>

            <a
              href="#contacto"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wide rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="w-1.5 h-1.5 bg-[#00E676] rounded-full animate-pulse" />
              {t.cta}
            </a>

            <button
              className="md:hidden p-2 text-slate-900"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={
                isMenuOpen
                  ? language === 'es'
                    ? 'Cerrar menu'
                    : 'Close menu'
                  : language === 'es'
                    ? 'Abrir menu'
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
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-slate-900"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 px-8 py-4 bg-slate-900 text-white text-sm font-bold uppercase tracking-wide rounded-full inline-flex justify-center"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
