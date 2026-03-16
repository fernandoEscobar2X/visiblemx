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
    product: 'tap',
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

type Product = {
  id: string;
  name: string;
  description: string;
  paymentType: 'one-time' | 'live';
  price?: string;
  regularPrice?: string;
  setupPrice?: string;
  regularSetupPrice?: string;
  monthlyPrice?: string;
  regularMonthlyPrice?: string;
  popular?: boolean;
  liveService?: boolean;
  features: string[];
};

export function MinimalProducts() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
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
              once: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const content = {
    es: {
      overtitle: 'Soluciones',
      title: '4 Productos. Una Filosofia.',
      subtitle:
        'Cada solucion es el resultado de anos de experiencia construyendo productos digitales. Sin excesos, solo lo esencial.',
      regular: 'Precio Regular',
      payment: {
        oneTime: 'Pago unico',
        launchTag: 'Oferta actual',
        setupFrom: 'Setup desde',
        setupRegular: 'Setup regular',
        monthlyFrom: 'Mensualidad desde',
        monthlyRegular: 'Mensualidad regular',
        perMonth: '/mes',
        liveService: 'Servicio vivo',
        infraNote: 'Menu y Agenda incluyen plan mensual por infraestructura, soporte y actualizaciones.'
      },
      products: [
        {
          id: 'tap',
          name: 'Visible Tap',
          description: 'Tu contacto inteligente para NFC, QR o link',
          paymentType: 'one-time',
          price: '450',
          regularPrice: '650',
          features: [
            'Pagina ligera para abrir, guardar y compartir contacto',
            'Funciona con NFC, QR o link',
            '4 estilos base para vender rapido',
            'Diseno mobile-first y CTA directos',
            'Entrega agil para nuevos clientes',
            'Llavero NFC desde $70 por pieza'
          ]
        },
        {
          id: 'page',
          name: 'Visible Page',
          description: 'Tu sitio web profesional',
          paymentType: 'one-time',
          price: '2,699',
          regularPrice: '3,999',
          popular: true,
          features: [
            'Sitio con estructura mas completa',
            'Hasta 10 fotos de tu trabajo',
            'Formulario de contacto',
            'Optimizada para Google',
            '2 Acrilicos o 50 tarjetas',
            'Lista en 3-5 dias'
          ]
        },
        {
          id: 'menu',
          name: 'Visible Menu',
          description: 'Menu digital que genera antojo',
          paymentType: 'live',
          liveService: true,
          setupPrice: '3,599',
          regularSetupPrice: '5,299',
          monthlyPrice: '590',
          regularMonthlyPrice: '990',
          features: [
            'Hasta 50 productos',
            'Hasta 20 fotos de platillos',
            'Funciona sin internet',
            'Link para resenas Google',
            '5 Acrilicos de mesa',
            '1 Acrilico de mostrador'
          ]
        },
        {
          id: 'agenda',
          name: 'Visible Agenda',
          description: 'Sistema de citas automatico',
          paymentType: 'live',
          liveService: true,
          setupPrice: '4,499',
          regularSetupPrice: '6,499',
          monthlyPrice: '790',
          regularMonthlyPrice: '1,290',
          features: [
            'Sistema de agendamiento',
            'Galeria de trabajos',
            'Presenta a tu equipo',
            'Testimonios de clientes',
            '1 Acrilico de mostrador',
            '50 Tarjetas con QR'
          ]
        }
      ] as Product[],
      linkContext: {
        eyebrow: 'Siguiente nivel',
        title: 'Visible Link sigue vivo como upsell',
        description:
          'Visible Tap queda como el producto principal de entrada y Visible Link como la opcion que lo complementa. Tap resuelve el contacto rapido; Link entra cuando el cliente necesita mas contexto, galeria y una presencia de marca mas completa.',
        cta: 'Ver ejemplo de Visible Link'
      }
    },
    en: {
      overtitle: 'Solutions',
      title: '4 Products. One Philosophy.',
      subtitle: 'Each solution is the result of years of experience building digital products. No excess, only the essential.',
      regular: 'Regular Price',
      payment: {
        oneTime: 'One-time payment',
        launchTag: 'Current offer',
        setupFrom: 'Setup from',
        setupRegular: 'Regular setup',
        monthlyFrom: 'Monthly from',
        monthlyRegular: 'Regular monthly',
        perMonth: '/month',
        liveService: 'Live service',
        infraNote: 'Menu and Agenda include a monthly plan for infrastructure, support, and updates.'
      },
      products: [
        {
          id: 'tap',
          name: 'Visible Tap',
          description: 'Your smart contact page for NFC, QR, or link',
          paymentType: 'one-time',
          price: '450',
          regularPrice: '650',
          features: [
            'Light page to open, save, and share contact details',
            'Works with NFC, QR, or link',
            '4 base styles ready to sell quickly',
            'Mobile-first design and direct CTAs',
            'Fast delivery for new clients',
            'NFC keychain from $70 per piece'
          ]
        },
        {
          id: 'page',
          name: 'Visible Page',
          description: 'Your professional website',
          paymentType: 'one-time',
          price: '2,699',
          regularPrice: '3,999',
          popular: true,
          features: [
            'Website with a more complete structure',
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
          paymentType: 'live',
          liveService: true,
          setupPrice: '3,599',
          regularSetupPrice: '5,299',
          monthlyPrice: '590',
          regularMonthlyPrice: '990',
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
          paymentType: 'live',
          liveService: true,
          setupPrice: '4,499',
          regularSetupPrice: '6,499',
          monthlyPrice: '790',
          regularMonthlyPrice: '1,290',
          features: [
            'Booking system',
            'Work gallery',
            'Showcase your team',
            'Client testimonials',
            '1 Counter acrylic',
            '50 Cards with QR'
          ]
        }
      ] as Product[],
      linkContext: {
        eyebrow: 'Next level',
        title: 'Visible Link stays alive as the upsell',
        description:
          'Visible Tap becomes the main entry product and Visible Link becomes the offer that complements it. Tap handles fast contact sharing; Link comes in when a client needs more context, gallery, and stronger brand presence.',
        cta: 'View Visible Link example'
      }
    }
  };

  const t = content[language];

  return (
    <section ref={sectionRef} id="productos" className="relative overflow-hidden bg-white py-24 lg:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px w-12 bg-slate-900" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-slate-600">{t.overtitle}</span>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl font-black leading-none tracking-tight text-slate-900 lg:text-7xl"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-light leading-[1.6] text-slate-600 lg:pt-8 lg:text-2xl"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {t.products.map((product, index) => {
            const mockup = mockups.find((m) => m.product === product.id);
            const demoHref = product.id === 'tap' ? '/tap' : `/demo/${product.id}`;
            const demoLabel =
              product.id === 'tap'
                ? language === 'es'
                  ? 'Ver estilos'
                  : 'View styles'
                : language === 'es'
                  ? 'Ver Demo'
                  : 'View Demo';

            return (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group"
              >
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition-all duration-500 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/10">
                  <div className="pointer-events-none absolute inset-0 bg-slate-900/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                    {mockup && (
                      <ImageWithFallback
                        src={mockup.url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}

                    <div className="absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-[1rem] bg-slate-900 text-2xl font-black text-white shadow-lg">
                      0{index + 1}
                    </div>

                    {product.popular && (
                      <div className="absolute left-6 top-6 rounded-[0.5rem] bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                        {language === 'es' ? 'Mas Popular' : 'Most Popular'}
                      </div>
                    )}

                    {product.liveService && (
                      <div
                        className={`absolute left-6 rounded-[0.5rem] bg-emerald-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white ${
                          product.popular ? 'top-[4.75rem]' : 'top-6'
                        }`}
                      >
                        {t.payment.liveService}
                      </div>
                    )}
                  </div>

                  <div className="relative space-y-6 p-8 lg:p-10">
                    <div>
                      <h3 className="mb-2 text-3xl font-black tracking-tight text-slate-900 lg:text-4xl">{product.name}</h3>
                      <p className="text-lg font-light text-slate-600">{product.description}</p>
                    </div>

                    <div className="space-y-2 border-y border-slate-200 py-4">
                      {product.paymentType === 'live' ? (
                        <>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.payment.setupFrom}</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">{t.payment.launchTag}</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">${product.setupPrice}</span>
                            <span className="text-lg font-semibold text-slate-600">MXN</span>
                          </div>
                          <div className="text-sm font-light text-slate-400">
                            {t.payment.setupRegular}: <span className="line-through">${product.regularSetupPrice} MXN</span>
                          </div>
                          <div className="text-base font-medium text-slate-600">
                            {t.payment.monthlyFrom} <span className="font-black text-slate-900">${product.monthlyPrice}</span> MXN {t.payment.perMonth}
                          </div>
                          <div className="text-sm font-light text-slate-400">
                            {t.payment.monthlyRegular}: <span className="line-through">${product.regularMonthlyPrice} MXN {t.payment.perMonth}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.payment.oneTime}</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">{t.payment.launchTag}</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">${product.price}</span>
                            <span className="text-lg font-semibold text-slate-600">MXN</span>
                          </div>
                          <div className="text-sm font-light text-slate-400">
                            {t.regular}: <span className="line-through">${product.regularPrice} MXN</span>
                          </div>
                          {product.id === 'tap' && (
                            <div className="rounded-[1rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium leading-6 text-emerald-900">
                              {language === 'es'
                                ? 'Desarrollo de pagina: $450 MXN. Llavero NFC: +$70 por pieza. Juntos forman la experiencia completa.'
                                : 'Page development: $450 MXN. NFC keychain: +$70 per piece. Together they create the full experience.'}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700">
                          <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                          <span className="text-base font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-3 pt-4">
                      <Link
                        to={demoHref}
                        className="group/btn inline-flex items-center justify-center gap-3 rounded-[1rem] bg-slate-900 px-6 py-4 font-semibold text-white transition-all hover:bg-slate-800"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span>{demoLabel}</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>

                      <motion.a
                        href="#contacto"
                        whileHover={{ x: 5 }}
                        className="group/link inline-flex items-center gap-3 px-6 py-2 text-base font-semibold text-slate-900"
                      >
                        <span className="border-b border-slate-900">{language === 'es' ? 'Iniciar Proyecto' : 'Start Project'}</span>
                        <div className="h-px w-6 bg-slate-900 transition-all group-hover/link:w-10" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 lg:p-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{t.linkContext.eyebrow}</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900">{t.linkContext.title}</h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{t.linkContext.description}</p>
            </div>

            <Link
              to="/demo/link"
              className="inline-flex items-center justify-center gap-3 rounded-[1rem] border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition-all hover:border-slate-900"
            >
              <ExternalLink className="h-5 w-5" />
              <span>{t.linkContext.cta}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-slate-500">{t.payment.infraNote}</p>
        </div>
      </div>
    </section>
  );
}

