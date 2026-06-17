import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import { LanguageProvider } from '../context/LanguageContext';
import { EliteNavbar } from '../components/EliteNavbar';
import { Footer } from '../components/Footer';
import { CustomSystemsSection } from '../components/CustomSystemsSection';
import { MultichannelPlatformsSection } from '../components/MultichannelPlatformsSection';
import { ContactSection } from '../components/ContactSection';
import { ArrowRight } from 'lucide-react';

export function ServicesPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Add a small delay to ensure rendering is complete
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
          <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 px-6 overflow-hidden">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl mb-8"
              >
                Sistemas y plataformas para operar con más orden
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg lg:text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto"
              >
                Construimos herramientas digitales para negocios que necesitan controlar clientes, citas, pedidos, inventario, reportes, usuarios y canales desde una operación más clara y conectada.
              </motion.p>
            </div>
          </section>

          {/* Sections */}
          <CustomSystemsSection />
          <MultichannelPlatformsSection />

          {/* Final CTA Banner */}
          <section className="py-24 bg-white text-center px-6">
            <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-12">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Cuéntanos qué necesitas ordenar</h2>
              <a 
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors"
              >
                Solicitar propuesta
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
