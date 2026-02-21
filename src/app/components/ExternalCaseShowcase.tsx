import { useRef } from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, ExternalLink, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const CASE_URL = 'https://cltj.netlify.app';
const WHATSAPP_URL = 'https://wa.me/526633634237?text=Hola,%20me%20gustaria%20cotizar';

const PREVIEW_IMAGES = [
  `${CASE_URL}/img-featured/letrero-agara.jpeg`,
  `${CASE_URL}/img-featured/display-shulas.jpeg`,
  `${CASE_URL}/img-featured/letrero-wafflix.jpeg`,
  `${CASE_URL}/img-featured/mapa-mundi-led.jpeg`,
  `${CASE_URL}/img-featured/display-santiago.jpeg`,
  `${CASE_URL}/img-featured/placas-halcon.jpeg`
];

type PreviewSection = 'inicio' | 'servicios' | 'galeria';

const content = {
  es: {
    overtitle: 'Caso Destacado',
    title: 'Corte Laser Tijuana para cerrar propuestas completas',
    subtitle: 'Un sitio web que presenta, vende y convierte desde el primer vistazo.',
    badges: ['Entrega agil', 'Personalizacion total', 'Atencion inmediata'],
    services: ['Displays acrilicos', 'Corte laser', 'Grabado personalizado', 'Llaveros y senaletica'],
    primaryCta: 'Ver sitio',
    secondaryCta: 'Cotizar por WhatsApp',
    footer: 'Visualiza la experiencia digital y abre el sitio en vivo en un clic.',
    previewNav: {
      inicio: 'Inicio',
      servicios: 'Servicios',
      galeria: 'Galeria'
    },
    previewTitle: 'Corte Laser Tijuana',
    previewSubtitle: 'Displays, grabado y piezas personalizadas con entrega rapida.',
    previewCta: 'Cotizar ahora',
    featuredTitle: 'Trabajos destacados'
  },
  en: {
    overtitle: 'Featured Case',
    title: 'Corte Laser Tijuana for complete proposal closing',
    subtitle: 'A website designed to present, sell, and convert from first contact.',
    badges: ['Fast delivery', 'Full customization', 'Immediate contact'],
    services: ['Acrylic displays', 'Laser cutting', 'Custom engraving', 'Keychains and signage'],
    primaryCta: 'Visit site',
    secondaryCta: 'Quote on WhatsApp',
    footer: 'Preview the digital experience and open the live site in one click.',
    previewNav: {
      inicio: 'Home',
      servicios: 'Services',
      galeria: 'Gallery'
    },
    previewTitle: 'Corte Laser Tijuana',
    previewSubtitle: 'Displays, engraving, and custom pieces with fast turnaround.',
    previewCta: 'Get a quote',
    featuredTitle: 'Featured work'
  }
} as const;

export function ExternalCaseShowcase() {
  const { language } = useLanguage();
  const t = content[language];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<PreviewSection, HTMLDivElement | null>>({
    inicio: null,
    servicios: null,
    galeria: null
  });

  const goToSection = (section: PreviewSection) => {
    const container = scrollContainerRef.current;
    const target = sectionRefs.current[section];
    if (!container || !target) return;

    container.scrollTo({
      top: target.offsetTop - 52,
      behavior: 'smooth'
    });
  };

  return (
    <section id="caso-real" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,23,42,0.07),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-slate-900" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{t.overtitle}</span>
            </div>

            <div className="space-y-6">
              <h2 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                {t.title}
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">{t.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {t.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <BadgeCheck className="h-4 w-4 text-slate-900" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href={CASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-slate-800"
              >
                {t.primaryCta}
                <ExternalLink className="h-4 w-4" />
              </motion.a>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-900"
              >
                {t.secondaryCta}
                <MessageCircle className="h-4 w-4" />
              </motion.a>
            </div>

            <p className="text-sm text-slate-500">{t.footer}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  cltj.netlify.app
                </span>
              </div>

              <div className="border-b border-slate-200 bg-white px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(t.previewNav) as PreviewSection[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => goToSection(key)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 transition hover:bg-slate-900 hover:text-white"
                    >
                      {t.previewNav[key]}
                    </button>
                  ))}
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                className="h-[560px] overflow-y-auto bg-slate-50 p-4 md:h-[660px] md:p-5"
                style={{ scrollbarWidth: 'thin' }}
              >
                <div className="space-y-5">
                  <div
                    ref={(el) => {
                      sectionRefs.current.inicio = el;
                    }}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={PREVIEW_IMAGES[0]}
                        alt="Corte Laser Tijuana hero"
                        className="h-[220px] w-full object-cover md:h-[260px]"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-4 py-4">
                        <h3 className="text-xl font-black text-white md:text-2xl">{t.previewTitle}</h3>
                        <p className="mt-1 text-xs text-slate-200 md:text-sm">{t.previewSubtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">www.cltj.netlify.app</span>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white"
                      >
                        {t.previewCta}
                        <MessageCircle className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  <div
                    ref={(el) => {
                      sectionRefs.current.servicios = el;
                    }}
                    className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5"
                  >
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{t.previewNav.servicios}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {t.services.map((service) => (
                        <div
                          key={service}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700"
                        >
                          <BadgeCheck className="h-4 w-4 text-slate-900" />
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    ref={(el) => {
                      sectionRefs.current.galeria = el;
                    }}
                    className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5"
                  >
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{t.featuredTitle}</p>
                    <div className="grid gap-3 grid-cols-2">
                      {PREVIEW_IMAGES.slice(1).map((src, index) => (
                        <div key={src} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          <ImageWithFallback
                            src={src}
                            alt={`Corte Laser Tijuana trabajo ${index + 1}`}
                            className="h-32 w-full object-cover md:h-40"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
