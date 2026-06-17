import { motion } from 'motion/react';
import { MinimalProducts } from '../components/MinimalProducts';
import { ContactSection } from '../components/ContactSection';
import { ArrowRight, Globe } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function DigitalPresencePage() {
  useDocumentMeta(
    'Presencia digital — Sitios, landings y menús · Visible MX',
    'Sitios, landings, menús y experiencias digitales para que tu negocio se vea profesional, explique mejor su oferta y convierta visitas en conversaciones.'
  );

  return (
    <>
      <div className="min-h-screen bg-white antialiased">

        <main className="relative">
          {/* Internal Hero */}
          <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 px-6 overflow-hidden border-b border-slate-100 bg-slate-50">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
            
            <div className="relative mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium mb-6 shadow-sm"
              >
                <Globe className="w-4 h-4" />
                <span>Soluciones base</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl mb-8"
              >
                Presencia digital para vender mejor desde el primer contacto
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg lg:text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto mb-10"
              >
                Creamos sitios, landings, menús y experiencias digitales que ayudan a que tu negocio se vea profesional, explique mejor su oferta y convierta visitas en conversaciones reales.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <a 
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                >
                  Cotizar proyecto
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
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
      </div>
    </>
  );
}
