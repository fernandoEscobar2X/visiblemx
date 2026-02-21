import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Bell, BarChart3, Factory, Building2 } from 'lucide-react';

export function AddonsSection() {
  const { language } = useLanguage();

  const content = {
    es: {
      overtitle: "Servicios Extra",
      title: "Potencia Tu Solución",
      subtitle: "Servicios adicionales diseñados para maximizar resultados y automatizar tu negocio.",
      addons: [
        {
          icon: Star,
          name: "Review Booster",
          tagline: "Las buenas van a Google, las malas a ti",
          setup: "2,699",
          monthly: "539",
          description: "Sistema inteligente que filtra reseñas. Las positivas van a Google, las negativas las recibes en privado para mejorar.",
          features: [
            "Filtro automático de reseñas",
            "50 tarjetas 'Evalúanos'",
            "Panel de gestión",
            "Estadísticas de satisfacción"
          ]
        },
        {
          icon: Bell,
          name: "Notificaciones",
          tagline: "Llega directo al celular",
          setup: "1,799",
          monthly: "449",
          description: "Envía promociones y avisos directo al dispositivo de tus clientes. Sin que te bloqueen, sin spam.",
          features: [
            "Push notifications",
            "Envíos ilimitados",
            "Programación de mensajes",
            "Segmentación de audiencia"
          ]
        },
        {
          icon: BarChart3,
          name: "Estadísticas",
          tagline: "Conoce a tus clientes",
          setup: "899",
          monthly: "359",
          description: "Analytics detallado. Cuántos te buscan, qué ven, cuándo visitan. Reportes semanales a tu WhatsApp.",
          features: [
            "Dashboard en tiempo real",
            "Reportes automáticos",
            "Análisis de comportamiento",
            "Identificación de horarios pico"
          ]
        }
      ],
      enterprise: {
        overtitle: "Soluciones Enterprise",
        title: "Para Operaciones Grandes",
        description: "Si tienes maquiladora, residencial o necesitas algo más complejo, creamos soluciones a tu medida.",
        solutions: [
          {
            icon: Factory,
            name: "Visible Industrial",
            description: "Digitaliza bitácoras de mantenimiento, checklists y reportes de auditoría.",
            price: "44,999"
          },
          {
            icon: Building2,
            name: "Visible Residencial",
            description: "Portal para residentes. Reportes de fallas, reserva de amenidades y avisos organizados.",
            price: "53,999"
          }
        ]
      }
    },
    en: {
      overtitle: "Extra Services",
      title: "Power Up Your Solution",
      subtitle: "Additional services designed to maximize results and automate your business.",
      addons: [
        {
          icon: Star,
          name: "Review Booster",
          tagline: "Good ones go to Google, bad ones to you",
          setup: "2,699",
          monthly: "539",
          description: "Smart system that filters reviews. Positive ones go to Google, negative ones you receive privately to improve.",
          features: [
            "Automatic review filtering",
            "50 'Rate Us' cards",
            "Management panel",
            "Satisfaction statistics"
          ]
        },
        {
          icon: Bell,
          name: "Notifications",
          tagline: "Reach directly to their phone",
          setup: "1,799",
          monthly: "449",
          description: "Send promotions and announcements directly to your customers' devices. Without being blocked, without spam.",
          features: [
            "Push notifications",
            "Unlimited sends",
            "Message scheduling",
            "Audience segmentation"
          ]
        },
        {
          icon: BarChart3,
          name: "Statistics",
          tagline: "Know your customers",
          setup: "899",
          monthly: "359",
          description: "Detailed analytics. How many search for you, what they see, when they visit. Weekly reports to your WhatsApp.",
          features: [
            "Real-time dashboard",
            "Automatic reports",
            "Behavior analysis",
            "Peak hours identification"
          ]
        }
      ],
      enterprise: {
        overtitle: "Enterprise Solutions",
        title: "For Large Operations",
        description: "If you have manufacturing, residential or need something more complex, we create custom solutions.",
        solutions: [
          {
            icon: Factory,
            name: "Visible Industrial",
            description: "Digitize maintenance logs, checklists and audit reports.",
            price: "44,999"
          },
          {
            icon: Building2,
            name: "Visible Residential",
            description: "Portal for residents. Failure reports, amenity reservations and organized announcements.",
            price: "53,999"
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <>
      {/* Addons Section */}
      <section className="py-24 lg:py-40 bg-slate-50">
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

          {/* Addons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.addons.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-slate-200 p-8 hover:border-slate-300 transition-colors group"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">
                    {addon.name}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium mb-6">
                    {addon.tagline}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-black text-slate-900">
                        ${addon.setup}
                      </span>
                      <span className="text-sm text-slate-600">MXN</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-slate-600">
                        ${addon.monthly}
                      </span>
                      <span className="text-sm text-slate-500">
                        MXN/{language === 'es' ? 'mes' : 'month'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 font-light mb-6 leading-relaxed">
                    {addon.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {addon.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <div className="w-1 h-1 bg-slate-900 mt-2 flex-shrink-0" />
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-px bg-slate-900" />
            <span className="text-sm font-medium text-slate-600 tracking-[0.2em] uppercase">
              {t.enterprise.overtitle}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none"
            >
              {t.enterprise.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl lg:text-2xl text-slate-600 font-light leading-relaxed"
            >
              {t.enterprise.description}
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {t.enterprise.solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-900 text-white p-12 group hover:bg-slate-800 transition-colors"
                >
                  <Icon className="w-16 h-16 mb-8 text-white group-hover:scale-105 transition-transform" />
                  
                  <h3 className="text-3xl lg:text-4xl font-black mb-4">
                    {solution.name}
                  </h3>
                  
                  <p className="text-lg text-slate-300 font-light mb-8 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="flex items-baseline gap-2 pt-8 border-t border-white/10">
                    <span className="text-sm text-slate-400">
                      {language === 'es' ? 'Desde' : 'From'}
                    </span>
                    <span className="text-4xl font-black">
                      ${solution.price}
                    </span>
                    <span className="text-lg text-slate-400">MXN</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
