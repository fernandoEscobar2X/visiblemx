import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import { LanguageProvider } from '../context/LanguageContext';
import { EliteNavbar } from '../components/EliteNavbar';
import { Footer } from '../components/Footer';
import { MinimalProducts } from '../components/MinimalProducts';
import { ContactSection } from '../components/ContactSection';
import { ArrowRight } from 'lucide-react';

export function DigitalPresencePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white antialiased">
        <EliteNavbar />
        
        <main className="relative">
          {/* Internal Hero */}
          <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 px-6 overflow-hidden bg-slate-50">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl mb-8"
              >
                Presencia digital para vender mejor desde el primer contacto
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg lg:text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto"
              >
                Creamos sitios, landings, menús y experiencias digitales que ayudan a que tu negocio se vea profesional, explique mejor su oferta y convierta visitas en conversaciones reales.
              </motion.p>
            </div>
          </section>

          {/* Sections */}
          <MinimalProducts />

          {/* Final CTA Banner */}
          <section className="py-24 bg-white text-center px-6 border-t border-slate-100">
            <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-12 shadow-sm">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Cuéntanos qué necesitas mostrar</h2>
              <a 
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
              >
                Cotizar proyecto
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>

          {/* Contact Form for the anchor to work */}
          <ContactSection />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
