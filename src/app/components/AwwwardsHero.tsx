import { Fragment, type ComponentType } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Globe,
  Server,
  Workflow
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OperationVisibleDemo } from './demo/operacion-visible/OperationVisibleDemo';

type IconType = ComponentType<{ className?: string }>;

interface Chip {
  label: string;
  Icon: IconType;
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
      ] as Chip[]
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
      ] as Chip[]
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

  return (
    <section className="relative w-full overflow-hidden bg-[#0A1128]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-28 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-8 lg:py-0">
        {/* Left: message + actions */}
        <div className="max-w-2xl">
          <motion.div {...rise(0)} className="mb-6 flex items-center gap-2.5">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">{t.eyebrow}</span>
          </motion.div>

          <motion.h1
            {...rise(0.06)}
            className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            {t.title}
          </motion.h1>

          <motion.p {...rise(0.12)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            {t.subtitle}
          </motion.p>

          <motion.div {...rise(0.18)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#0A1128] transition-all hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              {t.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#demos"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-emerald-500 hover:text-emerald-400"
            >
              {t.ctaSecondary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.ul {...rise(0.24)} className="mt-12 flex flex-wrap gap-3">
            {t.chips.map((chip) => (
              <li
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-xs font-semibold tracking-wide text-slate-300"
              >
                <chip.Icon className="h-4 w-4 text-emerald-500" />
                {chip.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: Isometric Demo System */}
        <motion.div {...rise(0.2)} className="relative h-[400px] w-full lg:h-full lg:min-h-[700px] flex items-center justify-center overflow-visible">
          <OperationVisibleDemo variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
