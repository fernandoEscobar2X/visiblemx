import { useEffect, useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export function GymLandingNavbar() {
  const { language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const labels = {
    es: {
      brand: 'IRON PERFORMANCE',
      links: [
        { href: '#inicio', label: 'Inicio' },
        { href: '#servicios', label: 'Servicios' },
        { href: '#metodo', label: 'Metodo' },
        { href: '#membresias', label: 'Membresias' },
        { href: '#entrenadores', label: 'Entrenadores' },
        { href: '#contacto', label: 'Contacto' }
      ],
      cta: 'Prueba Gratis'
    },
    en: {
      brand: 'IRON PERFORMANCE',
      links: [
        { href: '#inicio', label: 'Home' },
        { href: '#servicios', label: 'Services' },
        { href: '#metodo', label: 'Method' },
        { href: '#membresias', label: 'Memberships' },
        { href: '#entrenadores', label: 'Trainers' },
        { href: '#contacto', label: 'Contact' }
      ],
      cta: 'Free Trial'
    }
  }[language];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[90] transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-black/82 backdrop-blur-2xl' : 'bg-transparent'
      }`}
      aria-label="Gym main navigation"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#inicio" className="font-teko text-3xl uppercase tracking-[0.08em] text-[#F1F5F9]">
          {labels.brand}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {labels.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.18em] text-white/78 transition-colors hover:text-[#3B82F6]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="https://wa.me/5216645551234?text=Hola, quiero mi prueba gratis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#3B82F6] bg-[#3B82F6] px-5 py-2 font-teko text-xl uppercase tracking-[0.12em] text-black transition-colors hover:bg-transparent hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            {labels.cta}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-white/30 text-white md:hidden"
          aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-black/92 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {labels.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-xs uppercase tracking-[0.2em] text-white/80"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/5216645551234?text=Hola, quiero mi prueba gratis"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-[#3B82F6] bg-[#3B82F6] px-4 py-3 font-teko text-lg uppercase tracking-[0.12em] text-black"
              >
                <MessageCircle className="h-4 w-4" />
                {labels.cta}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
