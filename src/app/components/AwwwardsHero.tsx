import { Fragment, type ComponentType, MouseEvent, useEffect } from 'react';
import { motion, useReducedMotion, useSpring, useMotionTemplate } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Globe,
  MessageCircle,
  PieChart,
  Server,
  Settings,
  Target,
  Users,
  Workflow,
  FileSpreadsheet,
  StickyNote,
  MailQuestion
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type IconType = ComponentType<{ className?: string }>;

interface FlowNode {
  title: string;
  description: string;
  Icon: IconType;
}

interface Chip {
  label: string;
  Icon: IconType;
}

function ChaosLayer({ language }: { language: 'es' | 'en' }) {
  const t = language === 'es' ? {
    msg1: 'Info en WhatsApp',
    msg2: 'Datos perdidos en Excel',
    msg3: 'Notas manuales',
    msg4: 'Pedidos sueltos'
  } : {
    msg1: 'Info in WhatsApp',
    msg2: 'Data lost in Excel',
    msg3: 'Manual notes',
    msg4: 'Scattered orders'
  };

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-50 grayscale blur-[0.5px]">
      <div className="relative w-full h-full max-w-lg min-h-[300px]">
        <motion.div 
           initial={{ y: 15, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
           className="absolute left-[2%] top-[10%] flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm rotate-[-4deg]"
        >
           <MessageCircle className="h-4 w-4 text-slate-500" />
           <span className="text-xs font-medium text-slate-500">{t.msg1}</span>
        </motion.div>

        <motion.div 
           initial={{ y: 15, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
           className="absolute right-[5%] top-[25%] flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm rotate-[5deg]"
        >
           <FileSpreadsheet className="h-4 w-4 text-slate-500" />
           <span className="text-xs font-medium text-slate-500">{t.msg2}</span>
        </motion.div>

        <motion.div 
           initial={{ y: 15, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
           className="absolute left-[15%] bottom-[20%] flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm rotate-[-6deg]"
        >
           <StickyNote className="h-4 w-4 text-slate-500" />
           <span className="text-xs font-medium text-slate-500">{t.msg3}</span>
        </motion.div>

        <motion.div 
           initial={{ y: 15, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
           className="absolute right-[10%] bottom-[5%] flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm rotate-[7deg]"
        >
           <MailQuestion className="h-4 w-4 text-slate-500" />
           <span className="text-xs font-medium text-slate-500">{t.msg4}</span>
        </motion.div>
      </div>
    </div>
  );
}

export function AwwwardsHero() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();

  const content = {
    es: {
      eyebrow: 'Estudio de software',
      title: 'Sistemas digitales para vender más y operar con menos caos.',
      subtitle:
        'Creamos sitios web, CRM, dashboards y automatizaciones para negocios que quieren dejar atrás WhatsApp, Excel y procesos manuales.',
      ctaPrimary: 'Iniciar proyecto',
      ctaSecondary: 'Ver soluciones',
      loop: 'Mejora continua',
      chips: [
        { label: 'Sitios web', Icon: Globe },
        { label: 'Sistemas internos', Icon: Server },
        { label: 'Automatización multicanal', Icon: Workflow },
        { label: 'Dashboards', Icon: BarChart3 }
      ] as Chip[],
      nodes: [
        { title: 'Web / WhatsApp', description: 'Captamos y centralizamos tus conversaciones y formularios.', Icon: MessageCircle },
        { title: 'CRM', description: 'Organizamos contactos, oportunidades y actividades.', Icon: Users },
        { title: 'Automatización', description: 'Disparadores y flujos que ahorran tiempo y evitan tareas manuales.', Icon: Settings },
        { title: 'Dashboard', description: 'Métricas en tiempo real para entender y mejorar tu negocio.', Icon: PieChart },
        { title: 'Decisiones', description: 'Información clara para decidir mejor y crecer con foco.', Icon: Target }
      ] as FlowNode[]
    },
    en: {
      eyebrow: 'Software studio',
      title: 'Digital systems to sell more and operate with less chaos.',
      subtitle:
        'We build websites, CRM, dashboards and automations for businesses ready to leave WhatsApp, spreadsheets and manual processes behind.',
      ctaPrimary: 'Start project',
      ctaSecondary: 'See solutions',
      loop: 'Continuous improvement',
      chips: [
        { label: 'Websites', Icon: Globe },
        { label: 'Internal systems', Icon: Server },
        { label: 'Multichannel automation', Icon: Workflow },
        { label: 'Dashboards', Icon: BarChart3 }
      ] as Chip[],
      nodes: [
        { title: 'Web / WhatsApp', description: 'We capture and centralize your conversations and forms.', Icon: MessageCircle },
        { title: 'CRM', description: 'We organize contacts, opportunities and activities.', Icon: Users },
        { title: 'Automation', description: 'Triggers and flows that save time and remove manual work.', Icon: Settings },
        { title: 'Dashboard', description: 'Real-time metrics to understand and improve your business.', Icon: PieChart },
        { title: 'Decisions', description: 'Clear information to decide better and grow with focus.', Icon: Target }
      ] as FlowNode[]
    }
  };

  const t = content[language];

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }
        };

  // Scanner Logic
  const maskXPercent = useSpring(50, { stiffness: 100, damping: 20 });
  const maskYPercent = useSpring(50, { stiffness: 100, damping: 20 });
  const maskRadius = useSpring(0, { stiffness: 40, damping: 25 }); 
  const maskImage = useMotionTemplate`radial-gradient(${maskRadius}px circle at ${maskXPercent}% ${maskYPercent}%, black 0%, transparent 100%)`;

  useEffect(() => {
    if (reduce) return;
    // Auto-reveal after a delay to show the chaos first, then solve it.
    const t1 = setTimeout(() => {
      maskRadius.set(1500); 
    }, 1200);
    return () => clearTimeout(t1);
  }, [reduce, maskRadius]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    maskXPercent.set((x / width) * 100);
    maskYPercent.set((y / height) * 100);
    maskRadius.set(350); 
  }

  function handleMouseLeave() {
    if (reduce) return;
    // Fully reveal when leaving so it acts as a commercial piece
    maskRadius.set(1500); 
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-28 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-8 lg:py-0">
        {/* Left: message + actions */}
        <div className="max-w-2xl relative z-20">
          <motion.div {...rise(0)} className="mb-6 flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">{t.eyebrow}</span>
          </motion.div>

          <motion.h1
            {...rise(0.06)}
            className="text-4xl font-black leading-[1.05] tracking-tight text-[#0A1128] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            {t.title}
          </motion.h1>

          <motion.p {...rise(0.12)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            {t.subtitle}
          </motion.p>

          <motion.div {...rise(0.18)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1128] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0A1128]/90"
            >
              {t.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#productos"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold uppercase tracking-wide text-[#0A1128] transition-colors hover:border-[#0A1128]"
            >
              {t.ctaSecondary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.ul {...rise(0.24)} className="mt-8 flex flex-wrap gap-2.5">
            {t.chips.map((chip) => (
              <li
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700"
              >
                <chip.Icon className="h-4 w-4 text-emerald-600" />
                {chip.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: system flow with Scanner effect */}
        <motion.div 
           {...rise(0.2)} 
           className="relative flex flex-col justify-center min-h-[450px] lg:min-h-[500px]" 
           aria-label={language === 'es' ? 'Cómo conectamos tu operación' : 'How we connect your operation'}
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
        >
          {/* Layer 1: Chaos (Base) */}
          {!reduce && <ChaosLayer language={language} />}

          {/* Layer 2: System (Revealed by Scanner) */}
          <motion.div 
             className="relative z-10 w-full"
             style={reduce ? undefined : { maskImage, WebkitMaskImage: maskImage }}
          >
            {/* Wide desktop: horizontal pipeline with connectors */}
            <div className="hidden items-stretch xl:flex">
              {t.nodes.map((node, index) => (
                <Fragment key={node.title}>
                  <FlowCard node={node} />
                  {index < t.nodes.length - 1 ? (
                    <div className="flex w-4 shrink-0 items-center" aria-hidden>
                      <div className="relative h-px w-full bg-slate-200">
                        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              ))}
            </div>

            {/* Wide desktop: continuous-improvement loop */}
            <div className="relative mt-5 hidden h-9 xl:block" aria-hidden>
              <div className="absolute left-[8%] top-0 h-4 w-px border-l border-dashed border-slate-300" />
              <div className="absolute right-[8%] top-0 h-4 w-px border-r border-dashed border-slate-300" />
              <div className="absolute left-[8%] right-[8%] top-4 border-t border-dashed border-slate-300" />
              <span className="absolute left-1/2 top-4 -translate-x-1/2 -translate-y-1/2 bg-white px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                {t.loop}
              </span>
            </div>

            {/* Mobile, tablet and small desktop: stacked capability cards */}
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
              {t.nodes.map((node) => (
                <li key={node.title} className="contents">
                  <FlowCard node={node} />
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FlowCard({ node }: { node: FlowNode }) {
  const { Icon } = node;
  return (
    <article className="flex min-w-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <h3 className="text-sm font-bold text-[#0A1128]">{node.title}</h3>
      <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-700">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">{node.description}</p>
    </article>
  );
}
