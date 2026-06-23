import { motion, type Variants } from 'motion/react';
import { ArrowLeft, ArrowRight, Smartphone, Waves } from 'lucide-react';
import { Link } from 'react-router';

const demos = [
  {
    name: 'Classic iPhone',
    slug: 'classic-iphone',
    tag: 'Minimal / Direct',
    summary: 'Minimalista, limpio y muy fácil de entender. Hecho para cerrar contacto rápido sin fricción visual.',
    audience: 'Ideal para Junior consultants, doctors, advisors',
    glow: 'from-slate-400/20'
  },
  {
    name: 'Executive Pro',
    slug: 'executive-pro',
    tag: 'Corporate / Authority',
    summary: 'Corporativo, sobrio y con autoridad. Transmite confianza inmediata y se siente premium desde el primer vistazo.',
    audience: 'Ideal para Law firms, premium real estate, consulting',
    glow: 'from-amber-300/20'
  },
  {
    name: 'Luxury Profile',
    slug: 'luxury-profile',
    tag: 'Warm / Aspirational',
    summary: 'Aspiracional, cálido y visualmente deseable. Diseñado para negocios donde la imagen acelera la venta.',
    audience: 'Ideal para Beauty, wellness, personal brands',
    glow: 'from-rose-300/20'
  },
  {
    name: 'Modern Business',
    slug: 'modern-business',
    tag: 'Sales / Bento',
    summary: 'Más directo a conversión. Acciones visibles, bento rhythm y claridad inmediata para networking y ventas.',
    audience: 'Ideal para Sales reps, networking, local business',
    glow: 'from-blue-400/20'
  }
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function VisibleTapPage() {
  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <div className="flex w-full max-w-6xl items-center justify-between rounded-full border border-slate-200 bg-white/90 px-5 py-3 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Visible MX
          </Link>
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A0F1C] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
          >
            <Smartphone className="h-4 w-4" />
            Cotizar Visible Tap
          </a>
        </div>
      </div>

      <main className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <section className="relative mx-auto max-w-6xl">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_16%,rgba(16,185,129,0.08),transparent_22%),radial-gradient(circle_at_90%_18%,rgba(59,130,246,0.10),transparent_24%),radial-gradient(circle_at_74%_60%,rgba(99,102,241,0.08),transparent_26%)]" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold tracking-widest uppercase mb-6"
          >
            Visible Tap
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.04 }}
            className="text-[3rem] sm:text-[3.6rem] lg:text-[4rem] leading-[1.1] font-extrabold tracking-tight text-slate-900 max-w-4xl"
          >
            Demos reales. Ventas seguras.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="text-lg text-slate-500 max-w-2xl mt-6"
          >
            Cada demo está diseñada psicológicamente para un perfil de cliente distinto. Toca, comparte y cierra el trato en segundos.
          </motion.p>
        </section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-[1400px] mx-auto px-4"
        >
          {demos.map((demo, index) => (
            <motion.article
              key={demo.slug}
              variants={cardVariants}
              className={`bg-[#0A0F1C] rounded-[2.5rem] p-8 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden group min-h-[360px] flex flex-col justify-between ${
                index % 3 === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_38%,transparent_62%,rgba(255,255,255,0.03))] opacity-80" />

              <div className="relative z-10">
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2">{demo.tag}</p>
                <h2 className="text-2xl font-bold text-white mb-3">{demo.name}</h2>
                <p className="text-sm text-white/60 mb-6 max-w-[80%]">{demo.summary}</p>
                <div className="inline-flex px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 mb-8">
                  {demo.audience}
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to={`/tap/demos/${demo.slug}`}
                  className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Waves className="h-4 w-4" />
                  Ver Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/#contacto"
                  className="bg-transparent text-white border border-white/20 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/5 transition-colors inline-flex items-center justify-center"
                >
                  Solicitar estilo
                </a>
              </div>
            </motion.article>
          ))}
        </motion.section>
      </main>
    </div>
  );
}
