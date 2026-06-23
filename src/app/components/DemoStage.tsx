import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type DemoItem = {
  id: string;
  name: string;
  desc: string;
  url: string;
};

const demos: DemoItem[] = [
  { id: '01', name: 'Agenda Inteligente', desc: 'Sistema de reservas Quiet Luxury', url: '/demo/agenda' },
  { id: '02', name: 'Menú Digital', desc: 'Experiencia inmersiva para restaurantes', url: '/demo/menu' },
  { id: '03', name: 'Smart Tap NFC', desc: 'Tarjeta de presentación digital PWA', url: '/demo/link' },
];

export function DemoStage() {
  const { language } = useLanguage();
  const [hoveredDemo, setHoveredDemo] = useState<DemoItem | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(prev => prev === id ? null : id);
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-[#09090b] flex flex-col justify-center py-24 lg:py-32 overflow-hidden cursor-default"
      onMouseLeave={() => setHoveredDemo(null)}
    >
      <div className="absolute top-12 left-6 lg:left-12">
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-slate-500 uppercase">
          {language === 'es' ? 'Sistemas en acción' : 'Systems in action'}
        </span>
      </div>

      <motion.div layout className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col gap-0">
        {demos.map((demo) => {
          const isHovered = hoveredDemo?.id === demo.id;
          const isFaded = hoveredDemo !== null && hoveredDemo.id !== demo.id;
          const isExpanded = activeAccordion === demo.id;

          return (
            <motion.div 
              layout
              key={demo.id}
              className="group relative border-b border-slate-800 last:border-0"
              onMouseEnter={() => setHoveredDemo(demo)}
            >
              <div 
                className={`flex flex-col md:flex-row md:items-center justify-between py-10 lg:py-16 transition-all duration-700 ease-[0.16,1,0.3,1] cursor-pointer lg:cursor-default ${isFaded ? 'lg:opacity-20' : 'opacity-100'} ${isHovered ? 'lg:px-12' : 'px-0'}`}
                onClick={() => toggleAccordion(demo.id)}
              >
                
                <motion.div layout className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 lg:gap-16">
                  <span className={`text-xs sm:text-sm font-mono mt-1 lg:mt-6 transition-colors duration-500 ${isHovered || isExpanded ? 'text-emerald-500 font-bold' : 'text-slate-600'}`}>
                    [{demo.id}]
                  </span>
                  <h3 className={`text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] transition-colors duration-500 ${isHovered || isExpanded ? 'text-white' : 'text-slate-700'}`}>
                    {demo.name}
                  </h3>
                </motion.div>

                <motion.div layout className="mt-6 md:mt-0 flex flex-col items-start md:items-end md:text-right w-full md:w-64 shrink-0">
                  <p className={`text-xs sm:text-sm font-medium transition-colors duration-500 ${isHovered || isExpanded ? 'text-slate-300' : 'text-slate-600'}`}>
                    {demo.desc}
                  </p>
                  
                  {/* Interact button text - changes based on state and device */}
                  <div className={`mt-6 flex items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-500 ${isHovered || isExpanded ? 'text-emerald-400 opacity-100 lg:translate-x-0' : 'text-slate-700 opacity-100 lg:opacity-0 lg:-translate-x-4'}`}>
                    <span className="lg:hidden">{isExpanded ? 'CERRAR DEMO' : 'ABRIR DEMO'}</span>
                    <span className="hidden lg:inline">INTERACTUAR</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? '-rotate-90 lg:rotate-0' : 'rotate-0'}`} />
                  </div>
                </motion.div>

              </div>

              {/* Mobile/Tablet Accordion Content (Hidden on Desktop) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    key={`accordion-${demo.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:hidden w-full overflow-hidden"
                  >
                    <div className="pb-10 pt-4 flex flex-col items-center">
                      <div className="relative w-full max-w-[400px] aspect-[9/16] bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Mobile Scaled Iframe: scale to 33% to fit a 375px screen perfectly */}
                        <div 
                          className="absolute top-0 left-0" 
                          style={{ 
                            width: '1125px', 
                            height: '2000px', 
                            transform: 'scale(0.333)', 
                            transformOrigin: 'top left' 
                          }}
                        >
                          <iframe 
                            src={demo.url}
                            className="w-full h-full border-0 pointer-events-auto"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      
                      <a 
                        href={demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full"
                      >
                        Pantalla Completa <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Desktop click target wrapper for the whole row (Hidden on Mobile) */}
              <a 
                href={demo.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden lg:block absolute inset-0 z-20"
                aria-label={`Ver demo de ${demo.name}`}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* The Central Reveal Window (Desktop Only) */}
      <div className="hidden lg:flex absolute inset-0 pointer-events-none items-center justify-center z-0 overflow-hidden">
        <AnimatePresence>
          {hoveredDemo && (
            <motion.div
              key="reveal-window"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[800px] h-[500px] bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Scaled Iframe Container */}
              <div 
                className="absolute top-0 left-0" 
                style={{ 
                  width: '1600px', 
                  height: '1000px', 
                  transform: 'scale(0.5)', 
                  transformOrigin: 'top left' 
                }}
              >
                <iframe 
                  src={hoveredDemo.url}
                  className="w-full h-full border-0 pointer-events-none opacity-80"
                  loading="lazy"
                />
              </div>

              {/* Glassmorphic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 mix-blend-overlay" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
