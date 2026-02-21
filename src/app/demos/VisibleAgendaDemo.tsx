import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  MapPin,
  MessageCircle,
  Scissors,
  Sparkles,
  Star,
  X
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface Service {
  id: number;
  name: string;
  duration: string;
  price: number;
  description: string;
  icon: typeof Scissors;
  image: string;
  badge?: 'popular' | 'premium';
}

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function VisibleAgendaDemo() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);

  const salon = {
    name: 'STUDIO VOGUE',
    tagline: 'Where Beauty Meets Art',
    description:
      'Editorial beauty lab con estilistas senior, rituales premium y una experiencia boutique de inicio a cierre.',
    phone: '+52 664 789 0123',
    whatsapp: '5216647890123',
    address: 'Plaza Rio, Tijuana',
    rating: '4.9',
    reviews: '856',
    hero: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1400&q=80',
    heroSecondary: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80'
  };

  const services: Service[] = [
    {
      id: 1,
      name: 'Corte Premium',
      duration: '45 min',
      price: 450,
      description: 'Corte personalizado con analisis facial y styling final.',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1519415943484-cfbec6d2f8c9?w=900&q=80',
      badge: 'popular'
    },
    {
      id: 2,
      name: 'Coloracion Completa',
      duration: '2 hrs',
      price: 1400,
      description: 'Color de autor con productos Schwarzkopf y protocolo de sellado.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80',
      badge: 'popular'
    },
    {
      id: 3,
      name: 'Balayage Signature',
      duration: '2.5 hrs',
      price: 1800,
      description: 'Iluminacion francesa para contraste suave y acabado natural.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=80',
      badge: 'popular'
    },
    {
      id: 4,
      name: 'Keratina Silk',
      duration: '3 hrs',
      price: 2200,
      description: 'Alisado premium con efecto anti-frizz de larga duracion.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&q=80'
    },
    {
      id: 5,
      name: 'Peinado Evento',
      duration: '1 hr',
      price: 750,
      description: 'Diseno para boda, gala o evento social con fijacion profesional.',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&q=80',
      badge: 'popular'
    },
    {
      id: 6,
      name: 'Tratamiento Capilar',
      duration: '1 hr',
      price: 550,
      description: 'Hidratacion profunda y reconstruccion con Olaplex.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=900&q=80'
    },
    {
      id: 7,
      name: 'Makeup Editorial',
      duration: '1.5 hrs',
      price: 900,
      description: 'Acabado editorial con productos MAC y Urban Decay.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
      badge: 'popular'
    },
    {
      id: 8,
      name: 'Bridal Couture',
      duration: '4 hrs',
      price: 3500,
      description: 'Peinado, maquillaje, prueba previa y coordinacion de look.',
      icon: Crown,
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&q=80',
      badge: 'premium'
    }
  ];

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM'
  ];

  const serviceEntries = services.map((service, index) => ({ service, index }));
  const selectedServiceData = selectedService !== null ? services[selectedService] : null;

  const visibleServices =
    selectedService === null
      ? serviceEntries
      : serviceEntries.filter((entry) => entry.index === selectedService);

  const dateOptions = useMemo(() => {
    const start = new Date(currentMonth);
    start.setHours(0, 0, 0, 0);

    return Array.from({ length: 18 }, (_, index) => {
      const nextDate = new Date(start);
      nextDate.setDate(start.getDate() + index);
      return nextDate;
    });
  }, [currentMonth]);

  const moveDateWindow = (direction: number) => {
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + direction * 7);
      return next;
    });
  };

  const handleBooking = () => {
    if (!selectedServiceData || !selectedTime) {
      return;
    }

    const dateStr = selectedDate.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const message = `Hola, quiero agendar una cita:\n\nServicio: ${selectedServiceData.name}\nPrecio: $${selectedServiceData.price} MXN\nDuracion: ${selectedServiceData.duration}\nFecha: ${dateStr}\nHora: ${selectedTime}\n\nEsta disponible?`;

    window.open(`https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setShowConfirmation(true);
  };

  const badgeStyles: Record<NonNullable<Service['badge']>, string> = {
    popular: 'bg-[#A87A65]/15 text-[#A87A65] border-[#A87A65]/45',
    premium: 'bg-[#3A4234]/15 text-[#3A4234] border-[#3A4234]/40'
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] text-[#1A1A1A]">
      <section className="relative overflow-hidden border-b border-[#E6E2D9]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={salon.hero}
            alt={salon.name}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="h-full w-full object-cover [filter:brightness(82%)_contrast(104%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F9F6]/90 via-[#F9F9F6]/70 to-[#F9F9F6]/35" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <p className="font-cormorant text-3xl italic text-[#A87A65]">Quiet Luxury Booking</p>
            <h1 className="mt-4 font-cormorant text-6xl leading-[0.92] text-[#1A1A1A] md:text-8xl">{salon.name}</h1>
            <p className="mt-4 font-cormorant text-3xl italic text-[#3A4234]">{salon.tagline}</p>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#1A1A1A]/75 md:text-lg">{salon.description}</p>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[#E6E2D9] bg-[#F3F0EA] p-4">
                <p className="font-jakarta text-3xl font-semibold">{salon.rating}</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#1A1A1A]/55">Rating</p>
              </div>
              <div className="rounded-2xl border border-[#E6E2D9] bg-[#F3F0EA] p-4">
                <p className="font-jakarta text-3xl font-semibold">{salon.reviews}</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#1A1A1A]/55">Resenas</p>
              </div>
              <div className="rounded-2xl border border-[#E6E2D9] bg-[#F3F0EA] p-4">
                <p className="font-jakarta text-3xl font-semibold">8</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#1A1A1A]/55">Servicios</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="rounded-[2rem] border border-[#E6E2D9] bg-[#F3F0EA]/90 p-5 shadow-[0_20px_45px_rgba(26,26,26,0.06)]"
          >
            <div className="overflow-hidden rounded-2xl">
              <ImageWithFallback src={salon.heroSecondary} alt="Studio interior" className="h-56 w-full object-cover" />
            </div>
            <div className="mt-5 space-y-3 text-sm text-[#1A1A1A]/72">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#A87A65]" />{salon.address}</p>
              <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#A87A65]" />Lun - Sab | 9:00 AM - 8:00 PM</p>
              <p className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#A87A65]" />{salon.phone}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-jakarta text-xs uppercase tracking-[0.2em] text-[#A87A65]">Step 1</p>
            <h2 className="mt-2 font-cormorant text-5xl italic text-[#1A1A1A] md:text-6xl">The Lookbook</h2>
            <p className="mt-3 text-sm text-[#1A1A1A]/65 md:text-base">Selecciona tu servicio y la interfaz se adapta para un flujo limpio.</p>
          </div>

          {selectedService !== null ? (
            <button
              type="button"
              onClick={() => {
                setSelectedService(null);
                setSelectedTime(null);
              }}
              className="rounded-full border border-[#D7CFC2] bg-[#F3F0EA] px-5 py-2 text-xs uppercase tracking-[0.16em] text-[#1A1A1A]/70"
            >
              Cambiar servicio
            </button>
          ) : null}
        </div>

        <LayoutGroup>
          <motion.div layout className={`mt-10 grid gap-6 ${selectedService === null ? 'md:grid-cols-2 xl:grid-cols-4' : 'max-w-3xl grid-cols-1'}`}>
            <AnimatePresence mode="popLayout">
              {visibleServices.map(({ service, index }) => {
                const active = selectedService === index;

                return (
                  <motion.button
                    key={service.id}
                    layout
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    onClick={() => {
                      setSelectedService(index);
                      setSelectedTime(null);
                    }}
                    className="group relative overflow-hidden rounded-[2rem] border border-[#E6E2D9] bg-[#F3F0EA] text-left"
                  >
                    <div className="relative h-[410px] overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/72 via-[#1A1A1A]/20 to-transparent" />
                    </div>

                    <motion.div layoutId={`service-${service.id}`} className="absolute inset-x-0 bottom-0 p-6">
                      {service.badge ? (
                        <span className={`mb-3 inline-flex border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${badgeStyles[service.badge]}`}>
                          {service.badge}
                        </span>
                      ) : null}

                      <h3 className="font-cormorant text-3xl italic text-white">{service.name}</h3>
                      <p className="mt-2 text-sm text-white/80">{service.description}</p>

                      <div className="mt-4 flex items-center justify-between text-white">
                        <span className="font-jakarta text-2xl font-semibold">${service.price}</span>
                        <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.14em] ${active ? 'border-white/45 bg-white/12' : 'border-white/25 bg-black/20'}`}>
                          {service.duration}
                        </span>
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </section>

      <AnimatePresence>
        {selectedServiceData ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="border-y border-[#E6E2D9] bg-[#F3F0EA]/65 py-16"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-jakarta text-xs uppercase tracking-[0.2em] text-[#A87A65]">Step 2</p>
                  <h3 className="mt-2 font-cormorant text-4xl italic text-[#1A1A1A] md:text-5xl">Calendar Wheel</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveDateWindow(-1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D7CFC2] bg-[#F9F9F6] text-[#1A1A1A]/75"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDateWindow(1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D7CFC2] bg-[#F9F9F6] text-[#1A1A1A]/75"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max gap-3 pr-6">
                  {dateOptions.map((date) => {
                    const selected = isSameDay(date, selectedDate);
                    const weekday = date.toLocaleDateString('es-MX', { weekday: 'short' }).replace('.', '');

                    return (
                      <motion.button
                        key={date.toISOString()}
                        layout
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        className="relative h-14 min-w-[108px] overflow-hidden rounded-full border border-[#D7CFC2] px-4"
                      >
                        {selected ? (
                          <motion.span layoutId="date-pill" className="absolute inset-0 rounded-full bg-[#1A1A1A]" />
                        ) : null}

                        <span className={`relative z-10 flex items-center justify-between gap-2 text-xs uppercase tracking-[0.12em] ${selected ? 'text-[#F9F9F6]' : 'text-[#1A1A1A]/70'}`}>
                          <span>{weekday}</span>
                          <span className="font-jakarta text-sm font-semibold">{date.getDate()}</span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {timeSlots.map((slot, index) => {
                  const active = selectedTime === slot;

                  return (
                    <motion.button
                      key={`${selectedDate.toDateString()}-${slot}`}
                      type="button"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.32 }}
                      onClick={() => setSelectedTime(slot)}
                      className="relative overflow-hidden rounded-xl border border-[#D7CFC2] bg-[#F9F9F6] px-4 py-4 text-sm"
                    >
                      {active ? <motion.span layoutId="time-pill" className="absolute inset-0 rounded-xl bg-[#1A1A1A]" /> : null}
                      <span className={`relative z-10 font-jakarta ${active ? 'text-[#F9F9F6]' : 'text-[#1A1A1A]/72'}`}>{slot}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <h3 className="font-cormorant text-4xl italic text-[#1A1A1A] md:text-5xl">Lo que dicen nuestras clientas</h3>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { name: 'Ana Garcia', quote: 'Atencion impecable y resultado editorial en cada cita.' },
            { name: 'Sofia Martinez', quote: 'El salon mas consistente de Tijuana. Todo se siente premium.' },
            { name: 'Laura Ramirez', quote: 'Agenda rapida, experiencia fluida y un resultado espectacular.' }
          ].map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-[#E6E2D9] bg-[#F3F0EA] p-6"
            >
              <div className="mb-4 flex gap-1 text-[#A87A65]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-cormorant text-2xl italic leading-relaxed text-[#1A1A1A]/86">"{item.quote}"</p>
              <p className="mt-5 text-sm uppercase tracking-[0.16em] text-[#1A1A1A]/55">{item.name}</p>
            </motion.article>
          ))}
        </div>
      </section>
      <footer className="border-t border-[#E6E2D9] bg-[#F3F0EA] py-10 text-center">
        <p className="font-cormorant text-3xl italic text-[#1A1A1A]">{salon.name}</p>
        <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[#A87A65]">{salon.tagline}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#1A1A1A]/45">Powered by Visible Agenda</p>
      </footer>

      <AnimatePresence>
        {selectedServiceData && selectedTime ? (
          <motion.section
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="fixed inset-x-0 bottom-0 z-40 mx-auto w-[min(980px,calc(100%-1rem))] rounded-t-[1.8rem] border border-[#D7CFC2] bg-[#F9F9F6]/90 p-4 shadow-[0_-18px_45px_rgba(26,26,26,0.12)] backdrop-blur-xl"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.85rem)' }}
          >
            <div className="grid gap-4 md:grid-cols-[1.1fr_1fr_auto] md:items-center">
              <div>
                <p className="font-jakarta text-xs uppercase tracking-[0.2em] text-[#A87A65]">Step 3 - Checkout</p>
                <p className="mt-1 font-cormorant text-2xl italic text-[#1A1A1A]">{selectedServiceData.name}</p>
                <p className="mt-1 text-sm text-[#1A1A1A]/68">
                  {selectedDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })} - {selectedTime}
                </p>
              </div>

              <div className="grid gap-1 text-sm text-[#1A1A1A]/70">
                <p className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[#A87A65]" /> {selectedServiceData.duration}</p>
                <p className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-[#A87A65]" /> Agenda inmediata por WhatsApp</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleBooking}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-6 py-4 font-jakarta text-sm font-semibold uppercase tracking-[0.16em] text-[#F9F9F6]"
              >
                <MessageCircle className="h-4 w-4" />
                Confirmar ${selectedServiceData.price}
              </motion.button>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmation ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 px-5 pb-4 backdrop-blur-sm md:items-center"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md rounded-[2rem] border border-[#E6E2D9] bg-[#F9F9F6] p-8 text-center shadow-[0_20px_45px_rgba(26,26,26,0.16)]"
            >
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D7CFC2] text-[#1A1A1A]/70"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#A87A65]/15 text-[#A87A65]">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h4 className="font-cormorant text-4xl italic text-[#1A1A1A]">Redirigiendo a WhatsApp</h4>
              <p className="mt-3 text-sm text-[#1A1A1A]/65">Tu solicitud ya esta lista para confirmacion directa con Studio Vogue.</p>
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="mt-6 w-full rounded-2xl border border-[#D7CFC2] bg-[#F3F0EA] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#1A1A1A]/75"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
