import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export function AwwwardsHero() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const shouldSkipEntrance = window.matchMedia('(max-width: 1024px), (prefers-reduced-motion: reduce)').matches;
    if (shouldSkipEntrance) {
      gsap.set([title1Ref.current, title2Ref.current, subtitleRef.current, ctaRef.current], {
        clearProps: 'all',
        opacity: 1,
        y: 0
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title1Ref.current,
        { y: 36, opacity: 0.4 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          delay: 0
        }
      );

      if (title2Ref.current) {
        gsap.fromTo(
          title2Ref.current,
          { y: 36, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            delay: 0.06
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { y: 16, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
          delay: 0.14
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 14, opacity: 0.7 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  const content = {
    es: {
      overtitle: 'Agencia Digital',
      title1: 'Software que',
      title2: 'Impulsa Negocios',
      subtitle: 'Transformamos tu presencia digital con soluciones web que generan resultados medibles. Sin distracciones. Solo impacto.',
      cta: 'Ver Nuestro Proceso'
    },
    en: {
      overtitle: 'Digital Agency',
      title1: 'Software that',
      title2: 'Drives Business',
      subtitle: 'We transform your digital presence with web solutions that generate measurable results. No distractions. Just impact.',
      cta: 'See Our Process'
    }
  };

  const t = content[language];

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[800px] flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-slate-100/40 to-transparent rounded-full blur-[100px] animate-float" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-gradient-to-r from-emerald-50/30 to-transparent rounded-full blur-[80px] animate-pulse-slower" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div style={{ y, opacity }} className="w-full">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-widest">{t.overtitle}</span>
            </div>
          </div>

          <div className="relative mb-8 lg:mb-12 leading-none">
            <h1 ref={title1Ref} className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[9rem] font-black text-slate-900 tracking-tighter mb-2 lg:mb-4">
              {t.title1}
            </h1>

            <h1
              ref={title2Ref}
              className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[9rem] font-black tracking-tighter"
              style={{
                WebkitTextStroke: '1.5px #0A1128',
                color: 'transparent',
                backgroundImage: 'linear-gradient(90deg, transparent 50%, #0A1128 50%)',
                backgroundSize: '200% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text'
              }}
            >
              {t.title2}
            </h1>
          </div>

          <p ref={subtitleRef} className="text-xl lg:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 font-light tracking-tight leading-relaxed">
            {t.subtitle}
          </p>

          <div ref={ctaRef} className="flex justify-center">
            <a
              href="#proceso"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/20"
            >
              <span className="relative z-10 text-sm font-bold uppercase tracking-widest">{t.cta}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 0.8, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-slate-900 to-transparent" />
      </motion.div>
    </section>
  );
}
