import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function EliteProcess() {
  const { language } = useLanguage();

  const content = {
    es: {
      overtitle: "Metodología",
      title: "Un Proceso Probado",
      subtitle: "Años de experiencia condensados en un método eficiente que garantiza resultados. Transparente, directo, profesional.",
      steps: [
        {
          number: "01",
          title: "Descubrimiento",
          description: "Entendemos tu negocio, tu audiencia y tus objetivos. Una conversación sin compromiso para definir el alcance exacto del proyecto.",
          duration: "1-2 días"
        },
        {
          number: "02",
          title: "Diseño",
          description: "Creamos la estructura y el diseño visual. Revisiones ilimitadas hasta lograr la visión perfecta para tu marca.",
          duration: "3-5 días"
        },
        {
          number: "03",
          title: "Desarrollo",
          description: "Código limpio, optimizado y escalable. Construimos tu producto con las mejores prácticas de la industria.",
          duration: "5-10 días"
        },
        {
          number: "04",
          title: "Lanzamiento",
          description: "Deployment, pruebas finales y entrega completa. Incluye capacitación y documentación para que tengas control total.",
          duration: "1-2 días"
        }
      ],
      image: 'https://images.unsplash.com/photo-1759884247387-a5d791ffb2bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNzcxMjA0NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    en: {
      overtitle: "Methodology",
      title: "A Proven Process",
      subtitle: "Years of experience condensed into an efficient method that guarantees results. Transparent, direct, professional.",
      steps: [
        {
          number: "01",
          title: "Discovery",
          description: "We understand your business, your audience and your goals. A no-obligation conversation to define the exact scope of the project.",
          duration: "1-2 days"
        },
        {
          number: "02",
          title: "Design",
          description: "We create the structure and visual design. Unlimited revisions until we achieve the perfect vision for your brand.",
          duration: "3-5 days"
        },
        {
          number: "03",
          title: "Development",
          description: "Clean, optimized and scalable code. We build your product with industry best practices.",
          duration: "5-10 days"
        },
        {
          number: "04",
          title: "Launch",
          description: "Deployment, final testing and complete delivery. Includes training and documentation so you have full control.",
          duration: "1-2 days"
        }
      ],
      image: 'https://images.unsplash.com/photo-1759884247387-a5d791ffb2bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNzcxMjA0NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  };

  const t = content[language];

  return (
    <section id="proceso" className="py-24 lg:py-40 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-px bg-slate-900" />
            <span className="text-sm font-medium text-slate-600 tracking-[0.2em] uppercase">
              {t.overtitle}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl lg:text-2xl text-slate-600 font-light leading-relaxed lg:pt-8"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Steps */}
          <div className="space-y-16 lg:space-y-20">
            {t.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative pb-12 lg:pb-16 border-b border-slate-200 last:border-0"
              >
                {/* Step number with parallax */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.15 + 0.2,
                  }}
                  className="text-8xl lg:text-9xl font-black text-slate-900/5 absolute -top-4 left-0 select-none"
                  style={{ lineHeight: 1 }}
                >
                  {step.number}
                </motion.div>

                {/* Content */}
                <div className="relative pt-8">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900">
                      {step.title}
                    </h3>
                    <span className="text-sm text-slate-400 font-medium whitespace-nowrap ml-4">
                      {step.duration}
                    </span>
                  </div>
                  
                  <p className="text-base lg:text-lg text-slate-600 font-light leading-relaxed">
                    {step.description}
                  </p>

                  {/* Underline that grows on hover */}
                  <div className="h-px bg-slate-200 mt-8 overflow-hidden">
                    <motion.div
                      className="h-full bg-slate-900"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:sticky lg:top-32 h-fit"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 border border-slate-200">
              <ImageWithFallback
                src={t.image}
                alt="Process"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-white border border-slate-200 p-8 shadow-xl"
            >
              <div className="text-4xl font-black text-slate-900 mb-2">
                10-20
              </div>
              <div className="text-sm text-slate-600 font-medium uppercase tracking-wider">
                {language === 'es' ? 'Días en total' : 'Days total'}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}