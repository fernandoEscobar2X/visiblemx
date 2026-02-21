import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mockups = [
  {
    product: 'link',
    url: 'https://images.unsplash.com/photo-1656164630621-8974e3a7e85c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMHNjcmVlbiUyMHNvY2lhbCUyMG1lZGlhJTIwbGlua3MlMjBtb2NrdXB8ZW58MXx8fHwxNzcxMjA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aspectRatio: '3/4'
  },
  {
    product: 'page',
    url: 'https://images.unsplash.com/photo-1585893443385-e3e0d1bf0b78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNib29rJTIwbGFwdG9wJTIwbW9ja3VwJTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzEyMDQ1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aspectRatio: '16/10'
  },
  {
    product: 'menu',
    url: 'https://images.unsplash.com/photo-1618822579297-53087e4cd1de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGFkJTIwdGFibGV0JTIwcmVzdGF1cmFudCUyMG1lbnUlMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNzcxMjA0NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aspectRatio: '4/3'
  },
  {
    product: 'agenda',
    url: 'https://images.unsplash.com/photo-1632152943364-728220ee6b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwY2FsZW5kYXIlMjBib29raW5nJTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MTIwNDUyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    aspectRatio: '3/4'
  }
];

export function MinimalProducts() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // GSAP ScrollTrigger for cards
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const content = {
    es: {
      overtitle: "Soluciones",
      title: "4 Productos. Una Filosofía.",
      subtitle: "Cada solución es el resultado de años de experiencia construyendo productos digitales. Sin excesos, solo lo esencial.",
      launch: "Precio de Lanzamiento",
      regular: "Precio Regular",
      products: [
        {
          id: 'link',
          name: 'Visible Link',
          description: 'Tu tarjeta de presentación digital',
          price: '1,799',
          regularPrice: '2,699',
          features: [
            'Página con todos tus links',
            'Diseño con tu marca',
            'Botón de WhatsApp directo',
            'Se instala como app',
            '1 Acrílico con QR incluido',
            'Listo en 24-48 horas'
          ]
        },
        {
          id: 'page',
          name: 'Visible Page',
          description: 'Tu sitio web profesional',
          price: '2,699',
          regularPrice: '4,499',
          popular: true,
          features: [
            'Todo de Visible Link',
            'Hasta 10 fotos de tu trabajo',
            'Formulario de contacto',
            'Optimizada para Google',
            '2 Acrílicos o 50 tarjetas',
            'Lista en 3-5 días'
          ]
        },
        {
          id: 'menu',
          name: 'Visible Menú',
          description: 'Menú digital que genera antojo',
          price: '3,599',
          regularPrice: '6,299',
          features: [
            'Hasta 50 productos',
            'Hasta 20 fotos de platillos',
            'Funciona sin internet',
            'Link para reseñas Google',
            '5 Acrílicos de mesa',
            '1 Acrílico de mostrador'
          ]
        },
        {
          id: 'agenda',
          name: 'Visible Agenda',
          description: 'Sistema de citas automático',
          price: '4,499',
          regularPrice: '7,199',
          features: [
            'Sistema de agendamiento',
            'Galería de trabajos',
            'Presenta a tu equipo',
            'Testimonios de clientes',
            '1 Acrílico de mostrador',
            '50 Tarjetas con QR'
          ]
        }
      ]
    },
    en: {
      overtitle: "Solutions",
      title: "4 Products. One Philosophy.",
      subtitle: "Each solution is the result of years of experience building digital products. No excess, only the essential.",
      launch: "Launch Price",
      regular: "Regular Price",
      products: [
        {
          id: 'link',
          name: 'Visible Link',
          description: 'Your digital business card',
          price: '1,799',
          regularPrice: '2,699',
          features: [
            'Page with all your links',
            'Design with your brand',
            'Direct WhatsApp button',
            'Installs as an app',
            '1 Acrylic with QR included',
            'Ready in 24-48 hours'
          ]
        },
        {
          id: 'page',
          name: 'Visible Page',
          description: 'Your professional website',
          price: '2,699',
          regularPrice: '4,499',
          popular: true,
          features: [
            'Everything from Visible Link',
            'Up to 10 photos of your work',
            'Contact form',
            'Google optimized',
            '2 Acrylics or 50 cards',
            'Ready in 3-5 days'
          ]
        },
        {
          id: 'menu',
          name: 'Visible Menu',
          description: 'Digital menu that sells',
          price: '3,599',
          regularPrice: '6,299',
          features: [
            'Up to 50 products',
            'Up to 20 food photos',
            'Works without internet',
            'Google reviews link',
            '5 Table acrylics',
            '1 Counter acrylic'
          ]
        },
        {
          id: 'agenda',
          name: 'Visible Agenda',
          description: 'Automatic booking system',
          price: '4,499',
          regularPrice: '7,199',
          features: [
            'Booking system',
            'Work gallery',
            'Showcase your team',
            'Client testimonials',
            '1 Counter acrylic',
            '50 Cards with QR'
          ]
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section ref={sectionRef} id="productos" className="py-24 lg:py-40 bg-white relative overflow-hidden">
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
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
            <span className="text-sm font-bold text-slate-600 tracking-[0.25em] uppercase">
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
              className="text-xl lg:text-2xl text-slate-600 font-light leading-[1.6] lg:pt-8"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Bento Grid - Enhanced Modern Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {t.products.map((product, index) => {
            const mockup = mockups.find(m => m.product === product.id);

            return (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group"
              >
                {/* Card with glassmorphism on hover */}
                <div className="relative h-full bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/10">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                    {mockup && (
                      <ImageWithFallback
                        src={mockup.url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    
                    {/* Floating number badge */}
                    <div className="absolute top-6 right-6 w-16 h-16 bg-slate-900 text-white flex items-center justify-center text-2xl font-black rounded-[1rem] shadow-lg">
                      0{index + 1}
                    </div>

                    {/* Popular badge */}
                    {product.popular && (
                      <div className="absolute top-6 left-6 px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-[0.5rem]">
                        {language === 'es' ? 'Más Popular' : 'Most Popular'}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative p-8 lg:p-10 space-y-6">
                    {/* Name */}
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-lg text-slate-600 font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="py-4 border-y border-slate-200 space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                          ${product.price}
                        </span>
                        <span className="text-lg text-slate-600 font-semibold">
                          MXN
                        </span>
                      </div>
                      <div className="text-sm text-slate-400 font-light">
                        {t.regular}: <span className="line-through">${product.regularPrice} MXN</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-700"
                        >
                          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-base font-light">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-3 pt-4">
                      <Link
                        to={`/demo/${product.id}`}
                        className="group/btn inline-flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 text-white hover:bg-slate-800 transition-all font-semibold rounded-[1rem]"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>{language === 'es' ? 'Ver Demo' : 'View Demo'}</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      
                      <motion.a
                        href="#contacto"
                        whileHover={{ x: 5 }}
                        className="group/link inline-flex items-center gap-3 text-slate-900 text-base font-semibold px-6 py-2"
                      >
                        <span className="border-b border-slate-900">
                          {language === 'es' ? 'Iniciar Proyecto' : 'Start Project'}
                        </span>
                        <div className="w-6 h-px bg-slate-900 group-hover/link:w-10 transition-all" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
