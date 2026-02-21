import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Play, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function GymHero() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const layerY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.34, 0.78]);

  const content = useMemo(
    () => ({
      es: {
        kicker: 'Kinetic Brutalism / Athletic Lab',
        lineA: 'FORGE',
        lineB: 'SYSTEM',
        lineC: 'MODE',
        subtitle:
          'Entrenamiento industrial de precision con ciencia de rendimiento, biomecanica aplicada y protocolos reales de transformacion.',
        cta: 'Activar Prueba 7 Dias',
        secondary: 'Ver laboratorio',
        micro: 'LIVE METRICS ONLINE'
      },
      en: {
        kicker: 'Kinetic Brutalism / Athletic Lab',
        lineA: 'FORGE',
        lineB: 'SYSTEM',
        lineC: 'MODE',
        subtitle:
          'Industrial training with performance science, applied biomechanics and real transformation protocols.',
        cta: 'Activate 7-Day Trial',
        secondary: 'Explore lab',
        micro: 'LIVE METRICS ONLINE'
      }
    }),
    []
  );

  const t = content[language];

  return (
    <section id="inicio" ref={containerRef} className="relative min-h-[105svh] overflow-hidden bg-[#000000] text-[#E5E5E5]">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=1700&q=80"
          alt="Iron Performance"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="h-full w-full object-cover [filter:grayscale(100%)_contrast(155%)_brightness(28%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/66 to-black/94" />
      </motion.div>

      <motion.div style={{ opacity: overlayOpacity }} className="pointer-events-none absolute inset-0 bg-black" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(229,229,229,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(229,229,229,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(215,255,0,0.22),transparent_28%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[105svh] w-full max-w-[1680px] flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        <motion.p style={{ y: subtitleY }} className="font-space text-[11px] uppercase tracking-[0.35em] text-[#D7FF00] will-change-transform md:text-xs">
          {t.kicker}
        </motion.p>

        <motion.div style={{ y: layerY }} className="mt-3 leading-[0.8] will-change-transform">
          <h1 className="font-space text-[16vw] font-bold uppercase tracking-[-0.045em] text-[#E5E5E5]">{t.lineA}</h1>
          <h1 className="-mt-[0.12em] font-space text-[16vw] font-bold uppercase tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_#E5E5E5]">
            {t.lineB}
          </h1>
          <h1 className="-mt-[0.08em] font-space text-[15vw] font-bold uppercase tracking-[-0.055em] text-[#E5E5E5]">
            {t.lineC}
          </h1>
        </motion.div>

        <motion.div style={{ y: subtitleY }} className="mt-3 max-w-2xl will-change-transform">
          <p className="text-base text-[#E5E5E5]/78 md:text-lg">{t.subtitle}</p>
          <p className="mt-4 inline-flex items-center gap-2 font-space text-[11px] uppercase tracking-[0.22em] text-[#D7FF00]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#D7FF00]" />
            {t.micro}
          </p>
        </motion.div>

        <motion.div style={{ y: subtitleY }} className="mt-9 flex flex-col gap-3 sm:flex-row will-change-transform">
          <a
            href="#contacto"
            className="inline-flex h-14 items-center justify-center gap-2 border border-[#D7FF00] bg-[#D7FF00] px-8 font-space text-lg uppercase tracking-[0.12em] text-black transition-colors hover:bg-transparent hover:text-[#D7FF00]"
          >
            <Zap className="h-5 w-5" />
            {t.cta}
          </a>

          <a
            href="#servicios"
            className="inline-flex h-14 items-center justify-center gap-2 border border-[#3A3A3A] bg-black/40 px-8 font-space text-lg uppercase tracking-[0.12em] text-[#E5E5E5] transition-colors hover:border-[#E5E5E5]"
          >
            <Play className="h-5 w-5" />
            {t.secondary}
          </a>
        </motion.div>

        <motion.div style={{ y: statsY }} className="mt-12 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 will-change-transform">
          {[
            { label: 'Active Athletes', value: '2,500+' },
            { label: 'Biomech Pods', value: '12' },
            { label: 'Recovery Labs', value: '24/7' },
            { label: 'Session Precision', value: '99.2%' }
          ].map((stat) => (
            <div key={stat.label} className="border border-[#222222] bg-black/70 px-4 py-4">
              <p className="font-space text-3xl leading-none text-[#E5E5E5]">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#E5E5E5]/62">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div style={{ y: statsY }} className="mt-8 flex items-center gap-3 text-[#E5E5E5]/74 will-change-transform">
          <span className="inline-flex h-7 w-7 items-center justify-center border border-[#2A2A2A] bg-black/55">
            <ArrowUpRight className="h-4 w-4 text-[#D7FF00]" />
          </span>
          <span className="font-space text-xs uppercase tracking-[0.2em]">Natural scroll / no forced pinning</span>
        </motion.div>
      </div>
    </section>
  );
}
