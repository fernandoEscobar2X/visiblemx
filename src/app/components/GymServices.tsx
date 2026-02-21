import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Dumbbell, Flame, ShieldCheck, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServiceCard {
  id: string;
  name: string;
  description: string;
  icon: typeof Dumbbell;
  image: string;
  metric: string;
}

const content = {
  es: {
    overtitle: 'Protocolos de rendimiento',
    title: 'Performance Shuffler',
    subtitle:
      'Tres nodos en rotacion continua. Cada bloque representa una unidad tactica de entrenamiento de alto rendimiento.',
    cta: 'Explorar programa',
    cards: [
      {
        id: 'combat-strength',
        name: 'Fuerza estructural',
        description: 'Bloques de fuerza con periodizacion progresiva y control biomecanico de ejecucion.',
        icon: Dumbbell,
        image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=1200&q=80',
        metric: 'Power +28%'
      },
      {
        id: 'engine-hiit',
        name: 'Motor HIIT',
        description: 'Intervalos de alta intensidad para elevar VO2 max, resistencia lactica y recuperacion.',
        icon: Flame,
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
        metric: 'VO2 +19%'
      },
      {
        id: 'squad-classes',
        name: 'Squad classes',
        description: 'Sesiones grupales con ritmo competitivo y coaching en tiempo real.',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80',
        metric: 'Retention 92%'
      },
      {
        id: 'recovery-lab',
        name: 'Recovery lab',
        description: 'Recuperacion activa, movilidad y trabajo de tejido para sostener cargas altas.',
        icon: ShieldCheck,
        image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&q=80',
        metric: 'Injury -37%'
      }
    ] as ServiceCard[]
  },
  en: {
    overtitle: 'Performance protocols',
    title: 'Performance Shuffler',
    subtitle:
      'Three continuous rotating nodes. Every block represents a tactical high-performance training unit.',
    cta: 'Explore program',
    cards: [
      {
        id: 'combat-strength',
        name: 'Structural strength',
        description: 'Progressive periodized strength blocks with strict biomechanical execution control.',
        icon: Dumbbell,
        image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=1200&q=80',
        metric: 'Power +28%'
      },
      {
        id: 'engine-hiit',
        name: 'Engine HIIT',
        description: 'High-intensity intervals to improve VO2 max, lactic resistance and recovery speed.',
        icon: Flame,
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
        metric: 'VO2 +19%'
      },
      {
        id: 'squad-classes',
        name: 'Squad classes',
        description: 'Group sessions with competitive pace and real-time coaching supervision.',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80',
        metric: 'Retention 92%'
      },
      {
        id: 'recovery-lab',
        name: 'Recovery lab',
        description: 'Active recovery, mobility and tissue work to sustain high-load training cycles.',
        icon: ShieldCheck,
        image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&q=80',
        metric: 'Injury -37%'
      }
    ] as ServiceCard[]
  }
};

export function GymServices() {
  const { language } = useLanguage();
  const t = content[language];
  const baseCards = useMemo(() => t.cards, [t.cards]);
  const [stack, setStack] = useState<ServiceCard[]>(baseCards);

  useEffect(() => {
    setStack(baseCards);
  }, [baseCards]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStack((current) => {
        if (current.length < 2) {
          return current;
        }
        const next = [...current];
        const last = next.pop();
        if (last) {
          next.unshift(last);
        }
        return next;
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const visibleCards = stack.slice(0, 3);

  return (
    <section id="servicios" className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="font-teko text-sm uppercase tracking-[0.35em] text-blue-400">{t.overtitle}</p>
          <h2 className="mt-4 font-teko text-6xl uppercase leading-[0.85] tracking-tight text-[#F1F5F9] md:text-8xl">{t.title}</h2>
          <p className="mt-6 text-base text-white/65 md:text-lg">{t.subtitle}</p>
        </div>

        <div className="relative mx-auto h-[560px] max-w-5xl">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((card, index) => {
              const depth = index;
              const yOffset = depth * 56;
              const scale = 1 - depth * 0.06;
              const opacity = 1 - depth * 0.22;

              return (
                <motion.article
                  key={card.id}
                  layout
                  initial={{ opacity: 0, y: 90, scale: 0.86 }}
                  animate={{ opacity, y: yOffset, scale }}
                  exit={{ opacity: 0, y: -90, scale: 0.82 }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  className="absolute inset-x-0 mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#101010]"
                  style={{ zIndex: 30 - depth }}
                >
                  <div className="grid min-h-[360px] md:grid-cols-[1.15fr_0.85fr]">
                    <div className="relative h-full min-h-[220px] overflow-hidden">
                      <ImageWithFallback
                        src={card.image}
                        alt={card.name}
                        className="h-full w-full object-cover [filter:grayscale(30%)_contrast(120%)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
                    </div>

                    <div className="relative flex flex-col justify-between gap-8 p-8 md:p-10">
                      <div>
                        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center border border-blue-500/50 bg-blue-500/15 text-blue-300">
                          <card.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-teko text-4xl uppercase leading-none tracking-tight text-white md:text-5xl">{card.name}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">{card.description}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/15 pt-5">
                        <p className="font-teko text-2xl uppercase tracking-[0.12em] text-blue-300">{card.metric}</p>
                        <button className="group inline-flex items-center gap-2 border border-blue-500/60 px-4 py-2 font-teko text-lg uppercase tracking-[0.12em] text-[#F1F5F9] transition-colors hover:bg-blue-500 hover:text-black">
                          {t.cta}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
