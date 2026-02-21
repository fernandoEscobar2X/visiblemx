import { useEffect, useMemo, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  ExternalLink,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  X
} from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import type { PanInfo } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface LinkNode {
  icon: LucideIcon;
  label: string;
  subtitle: string;
  url: string;
  primary: boolean;
  badge: string | null;
}

const PRESS_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30, mass: 1.1 };

export function VisibleLinkDemo() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<1 | -1>(1);
  const [galleryDragLimit, setGalleryDragLimit] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryViewportRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const heroShade = useTransform(scrollYProgress, [0, 0.3], [1, 0.68]);

  const business = useMemo(
    () => ({
      name: 'YUKI SUSHI',
      nameJP: 'YUKI SUSHI',
      tagline: 'Omakase Experience',
      chef: 'Chef Takeshi Yamamoto',
      bio: 'A precision-driven omakase studio inspired by Tokyo counter culture. Every course is timed, plated, and served as a private ritual.',
      phone: '+52 664 890 7654',
      whatsapp: '5216648907654',
      email: 'reservas@yukisushi.mx',
      instagram: '@yukisushitj',
      website: 'yukisushi.mx',
      address: 'Av. Sanchez Taboada 10611, Zona Rio',
      city: 'Tijuana, Baja California',
      hours: 'Mar - Dom 13:00 - 23:00',
      closedDay: 'Lunes cerrado',
      rating: 4.9,
      reviews: 347,
      established: '2009',
      hero: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?w=1400&q=80',
      profile: 'https://images.unsplash.com/photo-1730324772289-b00b3cfbd374?w=600&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1696091811927-6b9552931f70?w=900&q=80', title: 'Nigiri Selection' },
        { url: 'https://images.unsplash.com/photo-1759200093008-63fc06f85c85?w=900&q=80', title: 'Private Dining' },
        { url: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?w=900&q=80', title: 'Sushi Bar' },
        { url: 'https://images.unsplash.com/photo-1730324772289-b00b3cfbd374?w=900&q=80', title: 'Chef at Work' },
        { url: 'https://images.unsplash.com/photo-1567745218428-d61373b15620?w=900&q=80', title: 'Premium Platter' },
        { url: 'https://images.unsplash.com/photo-1742968922797-f2fb3dd285e9?w=900&q=80', title: 'Seasonal Special' }
      ],
      awards: [
        { title: 'Michelin Guide', subtitle: 'Recommended 2024', icon: Award },
        { title: 'Best Sushi', subtitle: 'Tijuana Food Awards', icon: Sparkles },
        { title: '15 Anos', subtitle: 'Culinary Excellence', icon: Star }
      ],
      menu: {
        omakase: { name: 'Experiencia Omakase', price: '1,200 MXN', desc: '12 piezas seleccionadas por el chef' },
        premium: { name: 'Premium Selection', price: '850 MXN', desc: '8 piezas nigiri + rollo especial' },
        classic: { name: 'Classic Set', price: '550 MXN', desc: '6 piezas nigiri tradicionales' }
      }
    }),
    []
  );

  const socialLinks: LinkNode[] = useMemo(
    () => [
      {
        icon: MessageCircle,
        label: 'Reservar Mesa',
        subtitle: 'WhatsApp directo',
        url: `https://wa.me/${business.whatsapp}?text=Hola, quiero reservar mesa`,
        primary: true,
        badge: 'Respuesta inmediata'
      },
      {
        icon: Calendar,
        label: 'Menu Omakase',
        subtitle: 'Experiencia completa 1,200',
        url: '#menu-destacado',
        primary: false,
        badge: 'Reserva requerida'
      },
      {
        icon: Instagram,
        label: 'Instagram',
        subtitle: '@yukisushitj - Fotos diarias',
        url: 'https://instagram.com/yukisushitj',
        primary: false,
        badge: null
      },
      {
        icon: Globe,
        label: 'Sitio Web',
        subtitle: business.website,
        url: `https://${business.website}`,
        primary: false,
        badge: null
      },
      {
        icon: MapPin,
        label: 'Ubicacion',
        subtitle: 'Zona Rio - Estacionamiento incluido',
        url: 'https://maps.google.com/?q=Zona+Rio,+Tijuana',
        primary: false,
        badge: '15 min centro'
      },
      {
        icon: Phone,
        label: 'Llamar',
        subtitle: business.phone,
        url: `tel:${business.phone}`,
        primary: false,
        badge: '13:00 - 23:00'
      }
    ],
    [business.phone, business.website, business.whatsapp]
  );

  useEffect(() => {
    const updateDragLimit = () => {
      const viewport = galleryViewportRef.current;
      const track = galleryTrackRef.current;
      if (!viewport || !track) return;
      setGalleryDragLimit(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    updateDragLimit();
    window.addEventListener('resize', updateDragLimit);
    return () => window.removeEventListener('resize', updateDragLimit);
  }, []);

  const isExternalLink = (url: string) => url.startsWith('http');

  const switchImage = (direction: 1 | -1) => {
    if (selectedImage === null) return;
    const next = (selectedImage + direction + business.gallery.length) % business.gallery.length;
    setSwipeDirection(direction);
    setSelectedImage(next);
  };

  const handleGallerySwipe = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -90 || velocity < -650) {
      switchImage(1);
      return;
    }

    if (offset > 90 || velocity > 650) {
      switchImage(-1);
    }
  };

  const closeSheetOnDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 820) {
      setSelectedImage(null);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white font-inter">
      <section className="relative min-h-[72vh] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src={business.hero}
            alt="Yuki Sushi header"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="h-full w-full object-cover grayscale saturate-0 contrast-[1.24]"
          />
        </motion.div>

        <motion.div style={{ opacity: heroShade }} className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-[#0A0A0A]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_36%,rgba(185,28,28,0.34),transparent_58%)]" />
          <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-6 pb-12 pt-28 md:px-10">
          <p className="font-cinzel text-[11px] uppercase tracking-[0.45em] text-white/72">Stealth Omakase</p>
          <h1 className="mt-3 font-cinzel text-5xl leading-none tracking-tight md:text-7xl">{business.name}</h1>
          <p className="mt-3 max-w-xl font-playfair text-xl italic text-white/84 md:text-2xl">
            {business.tagline} desde {business.established}
          </p>

          <div className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-xl">
            <Star className="h-4 w-4 text-[#F59E0B]" />
            <span className="text-sm text-white/88">{business.rating} · {business.reviews} reseñas</span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <section className="-mt-20 relative z-20 grid gap-8 lg:grid-cols-[350px_1fr]">
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/55 p-6 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_14%,rgba(245,158,11,0.16),transparent_48%)]" />
            <div className="relative">
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-white/10">
                <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(185,28,28,0.24),transparent_60%)]" />
                <ImageWithFallback src={business.profile} alt={business.chef} className="relative h-full w-full object-cover" />
              </div>

              <p className="font-cinzel text-2xl tracking-wide">{business.chef}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/74">{business.bio}</p>

              <div className="mt-6 space-y-2 text-sm text-white/82">
                <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#F59E0B]" />{business.hours}</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#F59E0B]" />{business.address}</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#F59E0B]" />{business.phone}</p>
              </div>
            </div>
          </motion.aside>

          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              {business.awards.map((award, index) => (
                <motion.article
                  key={award.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-xl"
                >
                  <award.icon className="mb-3 h-5 w-5 text-[#F59E0B]" />
                  <p className="font-cinzel text-lg">{award.title}</p>
                  <p className="mt-1 text-xs text-white/68">{award.subtitle}</p>
                </motion.article>
              ))}
            </div>

            <section className="overflow-hidden border-y border-white/10">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target={isExternalLink(link.url) ? '_blank' : undefined}
                  rel={isExternalLink(link.url) ? 'noopener noreferrer' : undefined}
                  initial="rest"
                  animate="rest"
                  whileTap="tap"
                  transition={PRESS_SPRING}
                  className="group relative block border-b border-white/10 last:border-b-0"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-active:opacity-45"
                    style={{
                      backgroundImage: `linear-gradient(92deg,rgba(10,10,10,0.95),rgba(10,10,10,0.7)),url(${business.gallery[index % business.gallery.length].url})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  />

                  <motion.div variants={{ rest: { scale: 1 }, tap: { scale: 0.96 } }} className="relative flex items-center gap-5 px-1 py-1">
                    <div className="flex w-full items-center gap-4 px-5 py-5">
                      <motion.div
                        variants={{ rest: { x: -22, opacity: 0.1 }, tap: { x: 0, opacity: 1 } }}
                        className="text-[#B91C1C]"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <link.icon className="h-5 w-5 text-white/84" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-cinzel text-xl tracking-wide">{link.label}</p>
                          {link.badge ? (
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${
                                link.primary ? 'bg-[#B91C1C] text-white' : 'bg-white/10 text-white/78'
                              }`}
                            >
                              {link.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-white/70">{link.subtitle}</p>
                      </div>

                      <ExternalLink className="h-4 w-4 text-white/45" />
                    </div>
                  </motion.div>
                </motion.a>
              ))}
            </section>

            <section id="menu-destacado" className="rounded-3xl border border-[#B91C1C]/40 bg-[#130A0A] p-6 md:p-8">
              <p className="mb-3 font-cinzel text-xs uppercase tracking-[0.35em] text-[#F59E0B]">Menu Destacado</p>
              <div className="space-y-4">
                {Object.values(business.menu).map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <div>
                      <p className="font-cinzel text-xl">{item.name}</p>
                      <p className="text-sm text-white/70">{item.desc}</p>
                    </div>
                    <p className="font-cinzel text-xl text-[#F59E0B]">{item.price}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-cinzel text-4xl tracking-tight md:text-5xl">Bento Gallery</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-white/58">Mobile drag instrument</p>
          </div>

          <div ref={galleryViewportRef} className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <motion.div
              ref={galleryTrackRef}
              drag="x"
              dragElastic={0.08}
              dragConstraints={{ left: -galleryDragLimit, right: 0 }}
              className="flex w-max gap-4 snap-x snap-mandatory pr-8 cursor-grab active:cursor-grabbing will-change-transform"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {business.gallery.map((image, index) => (
                <button
                  key={image.title}
                  onClick={() => {
                    setSwipeDirection(1);
                    setSelectedImage(index);
                  }}
                  className="group relative w-[82vw] max-w-[430px] shrink-0 snap-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-black"
                >
                  <div className="aspect-[4/5]">
                    <ImageWithFallback src={image.url} alt={image.title} className="h-full w-full object-cover transition-transform duration-500 group-active:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="font-cinzel text-xl">{image.title}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        <footer className="mt-14 border-t border-white/10 pt-8">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-5">
            <a href={`mailto:${business.email}`} aria-label="Enviar correo a Yuki Sushi" className="text-white/70 transition-colors hover:text-[#B91C1C]">
              <Mail className="h-5 w-5" />
            </a>
            <a href={`https://${business.website}`} aria-label="Abrir sitio web de Yuki Sushi" className="text-white/70 transition-colors hover:text-[#B91C1C]">
              <Globe className="h-5 w-5" />
            </a>
            <a href={`tel:${business.phone}`} aria-label="Llamar a Yuki Sushi" className="text-white/70 transition-colors hover:text-[#B91C1C]">
              <Phone className="h-5 w-5" />
            </a>
          </div>
          <p className="text-center text-sm text-white/75">{business.city}</p>
          <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-white/55">
            Powered by <span className="font-semibold text-[#F59E0B]">Visible Link</span>
          </p>
        </footer>
      </main>

      <AnimatePresence>
        {selectedImage !== null ? (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md"
              aria-label="Cerrar visor de galeria"
            />

            <motion.section
              initial={{ y: '100%', opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0.8 }}
              transition={PRESS_SPRING}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.22}
              onDragEnd={closeSheetOnDrag}
              className="fixed inset-x-0 bottom-0 z-[100] rounded-t-[2rem] border border-white/15 bg-[#0B0B0B]/95 p-5 pb-6 shadow-[0_-30px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.2rem)' }}
            >
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/25" />

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">Gallery mode</p>
                  <p className="font-cinzel text-2xl">{business.gallery[selectedImage].title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/78"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative h-[56vh] overflow-hidden rounded-[1.6rem] border border-white/10 bg-black">
                <AnimatePresence initial={false} mode="wait" custom={swipeDirection}>
                  <motion.div
                    key={selectedImage}
                    custom={swipeDirection}
                    variants={{
                      enter: (direction: 1 | -1) => ({ x: direction > 0 ? 90 : -90, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: (direction: 1 | -1) => ({ x: direction > 0 ? -90 : 90, opacity: 0 })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={handleGallerySwipe}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      src={business.gallery[selectedImage].url}
                      alt={business.gallery[selectedImage].title}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => switchImage(-1)}
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => switchImage(1)}
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-white/65">
                <span>{selectedImage + 1}/{business.gallery.length}</span>
                <span className="inline-flex items-center gap-1"><ChevronUp className="h-3.5 w-3.5" />Swipe down para cerrar</span>
              </div>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
