import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { LayoutGrid, AppWindow, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function ServicesArchitecture() {
  const { language } = useLanguage();

  const t = language === 'es' ? {
    eyebrow: "Nuestra Arquitectura",
    title: "Tres niveles de operación",
    subtitle: "Construimos herramientas digitales estructuradas en tres niveles, diseñadas para resolver desde la captación de clientes hasta el control total de operaciones complejas.",
    levels: [
      {
        num: "01",
        title: "Presencia digital",
        desc: "Para que te encuentren, confíen y te contacten de forma rápida y profesional.",
        icon: AppWindow,
        to: "/presencia-digital"
      },
      {
        num: "02",
        title: "Sistemas a medida",
        desc: "Herramientas internas para ordenar procesos, ventas, clientes e inventario.",
        icon: LayoutGrid,
        to: "/servicios#sistemas"
      },
      {
        num: "03",
        title: "Plataformas multicanal",
        desc: "Una base centralizada para que equipo y clientes operen sin fricción.",
        icon: Network,
        to: "/servicios#plataformas"
      }
    ]
  } : {
    eyebrow: "Our Architecture",
    title: "Three levels of operation",
    subtitle: "We build digital tools structured in three levels, designed to solve everything from lead generation to full multichannel operational control.",
    levels: [
      {
        num: "01",
        title: "Digital presence",
        desc: "So they find you, trust you, and contact you quickly and professionally.",
        icon: AppWindow,
        to: "/presencia-digital"
      },
      {
        num: "02",
        title: "Custom systems",
        desc: "Internal tools to order processes, sales, clients, and inventory.",
        icon: LayoutGrid,
        to: "/servicios#sistemas"
      },
      {
        num: "03",
        title: "Multichannel platforms",
        desc: "A centralized base for your team and clients to operate seamlessly.",
        icon: Network,
        to: "/servicios#plataformas"
      }
    ]
  };

  return (
    <section className="relative w-full bg-white py-24 lg:py-32 border-y border-slate-100">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
           <div className="mb-6 flex items-center gap-3">
             <div className="h-px w-12 bg-slate-900" />
             <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{t.eyebrow}</span>
           </div>
           <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{t.title}</h2>
           <p className="mt-6 text-lg leading-8 text-slate-600">{t.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.levels.map((level, i) => {
            const Icon = level.icon;
            return (
              <motion.div 
                key={level.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={level.to}
                  className="block h-full relative group p-8 lg:p-10 rounded-3xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-slate-900 transition-colors duration-300">{level.num}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-4 pr-8">{level.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed mb-6">{level.desc}</p>
                  
                  <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-slate-900" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
