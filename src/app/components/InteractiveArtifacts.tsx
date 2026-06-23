import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';

const content = {
  es: {
    tag: "ESPECIFICACIONES",
    title: "Ingeniería en Producción",
    subtitle: "La arquitectura que respalda nuestras experiencias. Cero dependencias innecesarias, código optimizado al byte y despliegue global en el edge.",
    artifacts: [
      {
        id: "01",
        metric: "99/100",
        metricLabel: "PageSpeed Score",
        title: "Obsesión por el Rendimiento",
        desc: "Optimizamos cada línea de código. Sitios web servidos estáticamente desde el edge con tiempos de carga sub-segundo, garantizando máxima visibilidad orgánica.",
        features: ["React Server Components", "WebP & AVIF Compression", "Edge Caching"]
      },
      {
        id: "02",
        metric: "100%",
        metricLabel: "Uptime SLA",
        title: "Infraestructura Viva",
        desc: "Implementamos seguridad avanzada, monitoreo de amenazas en tiempo real y escalabilidad automática sin servidores que gestionar.",
        features: ["DDoS Protection", "Automated Backups", "Global CDN"]
      },
      {
        id: "03",
        metric: "AA+",
        metricLabel: "WCAG Standard",
        title: "Accesibilidad Nativa",
        desc: "Código semántico y diseño inclusivo. Incrementamos el alcance de tu producto cumpliendo con los estándares internacionales de accesibilidad web.",
        features: ["Screen-reader ready", "Keyboard Navigation", "High Contrast"]
      }
    ]
  },
  en: {
    tag: "SPECS",
    title: "Production Engineering",
    subtitle: "The architecture behind our experiences. Zero unnecessary dependencies, byte-optimized code, and global edge deployment.",
    artifacts: [
      { 
        id: "01",
        metric: "99/100",
        metricLabel: "PageSpeed Score",
        title: "Performance Obsessed", 
        desc: "We optimize every line of code. Statically served websites from the edge with sub-second load times, ensuring maximum organic visibility.",
        features: ["React Server Components", "WebP & AVIF Compression", "Edge Caching"]
      },
      { 
        id: "02",
        metric: "100%",
        metricLabel: "Uptime SLA",
        title: "Living Infrastructure", 
        desc: "We implement advanced security, real-time threat monitoring, and automatic scalability with zero servers to manage.",
        features: ["DDoS Protection", "Automated Backups", "Global CDN"]
      },
      { 
        id: "03",
        metric: "AA+",
        metricLabel: "WCAG Standard",
        title: "Native Accessibility", 
        desc: "Semantic code and inclusive design. We increase your product's reach by complying with international web accessibility standards.",
        features: ["Screen-reader ready", "Keyboard Navigation", "High Contrast"]
      }
    ]
  }
};

export function InteractiveArtifacts() {
  const { language } = useLanguage();
  const t = content[language];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="ingenieria" ref={containerRef} className="py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-2 border-slate-900 pb-12">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
              [{t.tag}]
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              {t.title}
            </h2>
          </div>
          <p className="text-lg text-slate-600 font-medium max-w-md">
            {t.subtitle}
          </p>
        </div>

        {/* Brutalist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-y-2 border-slate-900">
          
          {t.artifacts.map((artifact, index) => (
            <div 
              key={artifact.id} 
              className={`flex flex-col relative p-8 lg:p-12 ${index !== 2 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900' : ''} group overflow-hidden`}
            >
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] -z-10" />

              <div className="flex items-center justify-between mb-16">
                <span className="text-sm font-mono font-bold text-slate-400">
                  {artifact.id}
                </span>
                <div className="w-3 h-3 bg-slate-900 rounded-full" />
              </div>

              <div className="mb-12">
                <div className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-2">
                  {artifact.metric}
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  {artifact.metricLabel}
                </div>
              </div>

              <div className="mt-auto pt-12 border-t border-slate-200 group-hover:border-slate-300 transition-colors">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {artifact.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {artifact.desc}
                </p>
                <ul className="space-y-3">
                  {artifact.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-900">
                      <span className="w-1.5 h-1.5 bg-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
