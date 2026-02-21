import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DemoShowcase() {
  const { language } = useLanguage();

  const demos = [
    {
      id: 'link',
      route: '/demo/link',
      client: 'YUKI SUSHI',
      type: language === 'es' ? 'Bio-Link Premium' : 'Premium Bio-Link',
      preview: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?w=800&q=80',
      hoverText: language === 'es' ? '\"雪寿司 • Omakase Experience\"' : '\"雪寿司 • Omakase Experience\"',
      product: 'Visible Link',
      price: '$1,799',
      bgColor: 'bg-[#0A0A0A]',
      textColor: 'text-white'
    },
    {
      id: 'menu',
      route: '/demo/menu',
      client: 'TACOS EL PRIMO',
      type: language === 'es' ? 'Menú Digital con Carrito' : 'Digital Menu with Cart',
      preview: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      hoverText: language === 'es' ? '\"Pedidos en línea sin comisiones\"' : '\"Online orders without commissions\"',
      product: 'Visible Menú',
      price: '$3,599',
      bgColor: 'bg-[#EA580C]',
      textColor: 'text-white'
    },
    {
      id: 'page',
      route: '/demo/page',
      client: 'IRON PERFORMANCE',
      type: language === 'es' ? 'Landing Page Completa' : 'Full Landing Page',
      preview: 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?w=800&q=80',
      hoverText: language === 'es' ? '\"Transform Your Body, Transform Your Life\"' : '\"Transform Your Body, Transform Your Life\"',
      product: 'Visible Page',
      price: '$2,699',
      bgColor: 'bg-[#3B82F6]',
      textColor: 'text-white'
    },
    {
      id: 'agenda',
      route: '/demo/agenda',
      client: 'STUDIO VOGUE',
      type: language === 'es' ? 'Sistema de Reservas' : 'Booking System',
      preview: 'https://images.unsplash.com/photo-1759134155377-4207d89b39ec?w=800&q=80',
      hoverText: language === 'es' ? '\"Where Beauty Meets Art\"' : '\"Where Beauty Meets Art\"',
      product: 'Visible Agenda',
      price: '$4,499',
      bgColor: 'bg-[#EC4899]',
      textColor: 'text-white'
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="demos">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02),transparent_50%)]" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {language === 'es' ? 'Demos Interactivas' : 'Interactive Demos'}
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-[0.9]">
            {language === 'es' ? 'Ve el resultado' : 'See the result'}
            <br />
            <span className="text-slate-400">
              {language === 'es' ? 'antes de empezar' : 'before you start'}
            </span>
          </h2>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Explora casos reales. Interactúa. Decide.'
              : 'Explore real cases. Interact. Decide.'}
          </p>
        </motion.div>

        {/* Demo Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={demo.route}
                className="group block relative aspect-[4/5] bg-slate-900 overflow-hidden"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={demo.preview}
                    alt={demo.client}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 ${demo.bgColor} opacity-0 group-hover:opacity-35 transition-opacity duration-500`} />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/70 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
                    >
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {demo.product}
                      </span>
                    </motion.div>
                    <div className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full">
                      <span className="text-sm font-black text-slate-900">
                        {demo.price} MXN
                      </span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div>
                    {/* Default State */}
                    <div className="transform transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0">
                      <h3 className="text-4xl lg:text-5xl font-black text-white mb-2 leading-none">
                        {demo.client}
                      </h3>
                      <p className="text-lg text-white/70 font-light">
                        {demo.type}
                      </p>
                    </div>

                    {/* Hover State */}
                    <div className="absolute bottom-8 lg:bottom-12 left-8 lg:left-12 right-8 lg:right-12 transform transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-2xl lg:text-3xl font-light text-white mb-6 italic">
                        {demo.hoverText}
                      </p>
                      <div className="inline-flex items-center gap-3 text-white">
                        <span className="text-lg font-bold">
                          {language === 'es' ? 'Ver Demo' : 'View Demo'}
                        </span>
                        <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
                          <ArrowUpRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <p className="text-slate-500 font-light">
            {language === 'es' 
              ? 'Cada demo es 100% funcional. Haz clic para explorar.'
              : 'Each demo is 100% functional. Click to explore.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
