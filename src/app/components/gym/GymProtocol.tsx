import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { Activity, ArrowRight, Flame, Target } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ProtocolCard {
  id: string;
  title: string;
  description: string;
  badge: string;
  metric: string;
  icon: typeof Activity;
}

export function GymProtocol() {
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
      tag: 'Stacking protocol',
      title: 'Ruta de transformacion',
      processing: 'PROCESSING',
      cards: [
        {
          id: '01',
          title: 'Diagnostico tactico',
          description:
            'Evaluacion InBody, movilidad, fuerza base y estres metabolico para construir un mapa real de rendimiento.',
          badge: 'Estrategia',
          metric: 'Data confidence 99%',
          icon: Activity
        },
        {
          id: '02',
          title: 'Ingenieria de carga',
          description:
            'Ciclos de fuerza, hipertrofia y acondicionamiento con periodizacion semanal y supervision biomecanica.',
          badge: 'Desarrollo',
          metric: 'Progress velocity +42%',
          icon: Target
        },
        {
          id: '03',
          title: 'Ejecucion dominante',
          description:
            'Fase de precision total: intensidad alta, control tecnico y ajustes de recuperacion en tiempo real.',
          badge: 'Lanzamiento',
          metric: 'Performance unlock',
          icon: Flame
        }
      ] as ProtocolCard[]
    },
    en: {
      tag: 'Stacking protocol',
      title: 'Transformation route',
      processing: 'PROCESSING',
      cards: [
        {
          id: '01',
          title: 'Tactical diagnostics',
          description:
            'InBody evaluation, mobility, base strength and metabolic stress to build a real performance map.',
          badge: 'Strategy',
          metric: 'Data confidence 99%',
          icon: Activity
        },
        {
          id: '02',
          title: 'Load engineering',
          description:
            'Strength, hypertrophy and conditioning cycles with weekly periodization and biomechanical supervision.',
          badge: 'Development',
          metric: 'Progress velocity +42%',
          icon: Target
        },
        {
          id: '03',
          title: 'Dominant execution',
          description:
            'Total precision phase: high intensity, technical control and recovery adjustments in real time.',
          badge: 'Launch',
          metric: 'Performance unlock',
          icon: Flame
        }
      ] as ProtocolCard[]
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
    <section id="metodo" className="relative overflow-hidden bg-[#050505] py-24 text-[#F1F5F9] lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.24),transparent_46%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.18),transparent_48%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <p className="font-teko text-sm uppercase tracking-[0.35em] text-blue-400">{t.tag}</p>
          <h2 className="mt-3 font-teko text-5xl uppercase leading-[0.86] tracking-tight text-white md:text-7xl">{t.title}</h2>
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
                  className={`relative h-[520px] w-[86vw] max-w-[560px] flex-shrink-0 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-[#0A1128] transition-all duration-300 md:w-[560px] md:p-10 ${
                    isActive
                      ? 'scale-[1.05] shadow-[0_28px_70px_rgba(2,132,199,0.25)]'
                      : 'scale-100 shadow-[0_12px_30px_rgba(15,23,42,0.12)]'
                  }`}
                >
                  <div className="pointer-events-none absolute -right-10 top-3 font-teko text-[9.5rem] leading-none text-slate-100 md:text-[11rem]">
                    {card.id}
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A1128] text-white shadow-lg">
                      <Icon className="h-7 w-7" />
                    </div>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{card.badge}</p>
                    <h3 className="mt-4 font-teko text-5xl uppercase leading-[0.88] tracking-tight md:text-6xl">{card.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{card.description}</p>

                    <div className="mt-auto pt-8">
                      <div className="h-px w-full bg-black" />
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">{t.processing}</span>
                          <p className="mt-2 font-teko text-2xl uppercase tracking-[0.12em] text-slate-800">{card.metric}</p>
                        </div>
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
