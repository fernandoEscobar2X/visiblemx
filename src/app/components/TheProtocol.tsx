import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';

interface ProcessCard {
  id: string;
  title: string;
  description: string;
  icon: typeof Sparkles;
}

export function TheProtocol() {
  const { language } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const x = useMotionValue(0);
  const activeIndexRef = useRef(0);
  const lastSampleRef = useRef(0);
  const segmentWidthRef = useRef(0);
  const speedRef = useRef(62);
  const pausedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canHoverPause, setCanHoverPause] = useState(false);

  const content = {
    es: {
      tag: 'Proceso',
      title: 'Arquitectura de Valor',
      processing: 'PROCESSING',
      cards: [
        {
          id: '01',
          title: 'Diseño Premium',
          description:
            'Estetica suiza con ejecucion quirurgica. Cada bloque de interfaz esta pensado para elevar autoridad y conversion.',
          icon: Sparkles
        },
        {
          id: '02',
          title: 'Velocidad Extrema',
          description:
            'Carga instantanea y experiencia fluida en desktop y mobile. Performance tangible desde el primer segundo.',
          icon: Zap
        },
        {
          id: '03',
          title: 'ROI Medible',
          description:
            'Metricas de negocio accionables, dashboards claros y decisiones guiadas por data real.',
          icon: TrendingUp
        }
      ] as ProcessCard[]
    },
    en: {
      tag: 'Process',
      title: 'Value Architecture',
      processing: 'PROCESSING',
      cards: [
        {
          id: '01',
          title: 'Premium Design',
          description:
            'Swiss aesthetics with precise execution. Every interface block is designed to elevate authority and conversion.',
          icon: Sparkles
        },
        {
          id: '02',
          title: 'Extreme Speed',
          description:
            'Instant loading and fluid experience across desktop and mobile. Tangible performance from second one.',
          icon: Zap
        },
        {
          id: '03',
          title: 'Measurable ROI',
          description:
            'Actionable business metrics, clear dashboards and decision-making powered by real data.',
          icon: TrendingUp
        }
      ] as ProcessCard[]
    }
  };

  const t = content[language];

  const cards = useMemo(
    () =>
      [...t.cards, ...t.cards, ...t.cards].map((card, index) => ({
        ...card,
        instanceKey: `${card.id}-${index}`
      })),
    [t.cards]
  );

  useEffect(() => {
    const updateMediaProfile = () => {
      const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      setCanHoverPause(hoverCapable);
      speedRef.current = isMobile ? 84 : 62;
    };

    updateMediaProfile();
    window.addEventListener('resize', updateMediaProfile);

    return () => window.removeEventListener('resize', updateMediaProfile);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;

    if (!track || !viewport) {
      return;
    }

    const measure = () => {
      const fullWidth = track.scrollWidth;
      const segmentWidth = fullWidth / 3;

      if (!Number.isFinite(segmentWidth) || segmentWidth <= 0) {
        return;
      }

      segmentWidthRef.current = segmentWidth;

      const current = x.get();
      const normalized = ((current % segmentWidth) + segmentWidth) % segmentWidth;
      x.set(-normalized);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    resizeObserver.observe(viewport);
    window.addEventListener('orientationchange', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('orientationchange', measure);
    };
  }, [cards, x]);

  useAnimationFrame((time, delta) => {
    const segmentWidth = segmentWidthRef.current;
    if (!segmentWidth) {
      return;
    }

    if (!pausedRef.current) {
      const deltaMs = Math.min(delta, 34);
      let next = x.get() - (speedRef.current * deltaMs) / 1000;
      while (next <= -segmentWidth) {
        next += segmentWidth;
      }
      x.set(next);
    }

    if (time - lastSampleRef.current < 120) {
      return;
    }

    lastSampleRef.current = time;

    const viewport = viewportRef.current;
    if (!viewport || cardRefs.current.length === 0) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;

    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(center - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    if (nearest !== activeIndexRef.current) {
      activeIndexRef.current = nearest;
      setActiveIndex(nearest);
    }
  });

  const handlePause = () => {
    if (canHoverPause) {
      pausedRef.current = true;
    }
  };

  const handleResume = () => {
    pausedRef.current = false;
  };

  cardRefs.current = [];

  return (
    <section id="proceso" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A1128]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.tag}</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-[#0A1128] md:text-5xl lg:text-7xl">{t.title}</h2>
        </div>

        <div
          ref={viewportRef}
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handleResume}
          className="relative overflow-hidden py-3"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <motion.div
            ref={trackRef}
            className="flex gap-6 will-change-transform [transform:translateZ(0)]"
            style={{ x, transform: 'translateZ(0)' }}
          >
            {cards.map((card, index) => {
              const Icon = card.icon;
              const isActive = index === activeIndex;

              return (
                <article
                  key={card.instanceKey}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className={`relative h-[520px] w-[86vw] max-w-[520px] flex-shrink-0 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-[#0A1128] transition-all duration-300 md:w-[520px] md:p-10 ${
                    isActive
                      ? 'scale-[1.05] shadow-[0_26px_64px_rgba(15,23,42,0.18)]'
                      : 'scale-100 shadow-[0_12px_30px_rgba(15,23,42,0.1)]'
                  }`}
                >
                  <div className="pointer-events-none absolute -right-10 top-3 text-[10rem] font-black leading-none text-slate-100 md:text-[11rem]">
                    {card.id}
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A1128] text-white shadow-lg">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="text-3xl font-black tracking-tight md:text-4xl">{card.title}</h3>
                    <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">{card.description}</p>

                    <div className="mt-auto pt-8">
                      <div className="h-px w-full bg-black" />
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">{t.processing}</span>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.99 }}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.12)]"
                          aria-label={card.title}
                        >
                          <ArrowRight className="h-4 w-4 text-[#0A1128]" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
