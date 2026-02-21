import { motion } from 'motion/react';
import { Check, Crown, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  subtitle: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

const content = {
  es: {
    tag: 'Pricing matrix',
    title: 'Membresias de alto impacto',
    subtitle: 'Tres niveles. Una sola mision: rendimiento sostenido.',
    cta: 'Comenzar ahora',
    plans: [
      {
        id: 'basic',
        name: 'IRON CORE',
        price: '599',
        period: 'MXN/mes',
        subtitle: 'Acceso esencial para construir base atletica.',
        features: ['Pesas y cardio ilimitado', 'Vestidores premium', 'App de seguimiento', 'Asesoria inicial']
      },
      {
        id: 'pro',
        name: 'IRON PROTOCOL',
        price: '899',
        period: 'MXN/mes',
        subtitle: 'El nivel mas elegido para progresar rapido.',
        features: [
          'Todo lo de Iron Core',
          'Clases grupales ilimitadas',
          'Zona funcional y cross training',
          'Evaluacion mensual',
          'Invitado gratis 2 veces por mes'
        ],
        featured: true,
        badge: 'Mas popular'
      },
      {
        id: 'elite',
        name: 'IRON ASCENT',
        price: '1299',
        period: 'MXN/mes',
        subtitle: 'Experiencia total para objetivos de elite.',
        features: [
          'Todo lo de Iron Protocol',
          '4 sesiones PT al mes',
          'Nutricion personalizada',
          'Acceso 24/7',
          'Locker VIP y estacionamiento'
        ]
      }
    ] as Plan[]
  },
  en: {
    tag: 'Pricing matrix',
    title: 'High-impact memberships',
    subtitle: 'Three tiers. One mission: sustained performance.',
    cta: 'Start now',
    plans: [
      {
        id: 'basic',
        name: 'IRON CORE',
        price: '599',
        period: 'MXN/mo',
        subtitle: 'Essential access to build your athletic base.',
        features: ['Unlimited weights and cardio', 'Premium locker rooms', 'Tracking app', 'Initial assessment']
      },
      {
        id: 'pro',
        name: 'IRON PROTOCOL',
        price: '899',
        period: 'MXN/mo',
        subtitle: 'Most selected tier for accelerated progress.',
        features: [
          'Everything in Iron Core',
          'Unlimited group classes',
          'Functional and cross training zone',
          'Monthly evaluation',
          'Free guest twice per month'
        ],
        featured: true,
        badge: 'Most popular'
      },
      {
        id: 'elite',
        name: 'IRON ASCENT',
        price: '1299',
        period: 'MXN/mo',
        subtitle: 'Full-stack experience for elite targets.',
        features: [
          'Everything in Iron Protocol',
          '4 PT sessions per month',
          'Personalized nutrition',
          '24/7 access',
          'VIP locker and parking'
        ]
      }
    ] as Plan[]
  }
};

export function GymMemberships() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="membresias" className="relative overflow-hidden border-t border-white/10 bg-[#000000] py-28 text-[#F1F5F9]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="font-teko text-sm uppercase tracking-[0.34em] text-blue-400">{t.tag}</p>
          <h2 className="mt-4 font-teko text-6xl uppercase leading-[0.85] tracking-tight text-white md:text-8xl">{t.title}</h2>
          <p className="mt-5 text-base text-white/70 md:text-lg">{t.subtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {t.plans.map((plan, index) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={`relative overflow-hidden rounded-[2rem] border ${
                plan.featured
                  ? 'border-blue-400/70 bg-[linear-gradient(180deg,rgba(59,130,246,0.2),rgba(10,10,10,0.96))] md:scale-[1.05]'
                  : 'border-white/15 bg-[#111111]'
              } p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)]`}
            >
              {plan.featured ? (
                <>
                  <div className="pointer-events-none absolute inset-0">
                    <motion.div
                      aria-hidden
                      className="absolute left-[-60%] top-0 h-full w-[55%] bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.85),transparent)] blur-xl"
                      animate={{ x: ['0%', '310%'] }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: 'linear' }}
                    />
                  </div>
                  <div className="relative z-10 mb-5 inline-flex items-center gap-2 border border-blue-300/50 bg-blue-500/20 px-3 py-1 font-teko text-sm uppercase tracking-[0.2em] text-blue-100">
                    <Crown className="h-4 w-4" />
                    {plan.badge}
                  </div>
                </>
              ) : null}

              <div className="relative z-10">
                <h3 className="font-teko text-4xl uppercase tracking-[0.06em] text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-white/65">{plan.subtitle}</p>

                <div className="mt-8 border-y border-white/15 py-6">
                  <p className="font-teko text-7xl leading-none text-white">${plan.price}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-blue-200/90">{plan.period}</p>
                </div>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/85">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center border border-blue-400/50 bg-blue-500/10 text-blue-300">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`mt-8 inline-flex w-full items-center justify-center border px-5 py-3 font-teko text-xl uppercase tracking-[0.14em] transition-colors ${
                    plan.featured
                      ? 'border-blue-400 bg-blue-500 text-black hover:bg-transparent hover:text-white'
                      : 'border-white/35 text-white hover:border-blue-400 hover:text-blue-300'
                  }`}
                >
                  {t.cta}
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-blue-200">
            <Shield className="h-4 w-4" />
            Garantia de resultados en 90 dias
          </div>
        </div>
      </div>
    </section>
  );
}
