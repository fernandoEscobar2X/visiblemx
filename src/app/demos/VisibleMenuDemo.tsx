import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import {
  ChevronRight,
  Clock,
  Filter,
  Flame,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  TrendingUp,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { PanInfo } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular: boolean;
  trending: boolean;
  spicy: number;
  calories: number;
  prepTime: string;
}

interface CartEntry extends MenuItem {
  quantity: number;
}

interface FlyParticle {
  id: string;
  image: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const SHEET_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30, mass: 1 };

export function VisibleMenuDemo() {
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [dragLimit, setDragLimit] = useState(0);
  const [flying, setFlying] = useState<FlyParticle[]>([]);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  const sliderViewportRef = useRef<HTMLDivElement>(null);
  const cartFabRef = useRef<HTMLButtonElement>(null);

  const restaurant = {
    name: 'TACOS EL PRIMO',
    tagline: 'Autenticos tacos de calle desde 2010',
    description: 'Street-food lab en modo alto rendimiento. Fuego, plancha y recetas de frontera para provocar hambre instantanea.',
    phone: '+52 664 123 4567',
    whatsapp: '5216641234567',
    address: 'Av. Revolucion 1234, Centro, Tijuana',
    city: 'Tijuana, B.C.',
    hours: 'Lun - Dom 11:00 AM - 11:00 PM',
    rating: 4.8,
    reviews: 2847,
    delivery: '15-25 min',
    minOrder: 100,
    established: '2010'
  };

  const categories = [
    { id: 'Todo', label: 'Todo', count: 15 },
    { id: 'Tacos', label: 'Tacos', count: 6 },
    { id: 'Quesadillas', label: 'Quesadillas', count: 3 },
    { id: 'Especiales', label: 'Especiales', count: 3 },
    { id: 'Bebidas', label: 'Bebidas', count: 2 },
    { id: 'Postres', label: 'Postres', count: 1 }
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Taco al Pastor',
      description: 'Con pina, cilantro y cebolla en tortilla recien salida del comal',
      price: 35,
      category: 'Tacos',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: true,
      trending: true,
      spicy: 1,
      calories: 280,
      prepTime: '5 min'
    },
    {
      id: 2,
      name: 'Taco de Asada',
      description: 'Carne de res premium, guacamole y salsa tatemada',
      price: 35,
      category: 'Tacos',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: true,
      trending: false,
      spicy: 1,
      calories: 295,
      prepTime: '5 min'
    },
    {
      id: 3,
      name: 'Taco de Arrachera',
      description: 'Corte especial argentino, cebolla asada y chile toreado',
      price: 45,
      category: 'Tacos',
      image: 'https://images.unsplash.com/photo-1765087909734-a8a07a167fb3?w=800&q=80',
      popular: false,
      trending: true,
      spicy: 2,
      calories: 335,
      prepTime: '6 min'
    },
    {
      id: 4,
      name: 'Taco de Pollo',
      description: 'Pollo marinado en adobo citrico con salsa verde cremosa',
      price: 30,
      category: 'Tacos',
      image: 'https://images.unsplash.com/photo-1765087909734-a8a07a167fb3?w=800&q=80',
      popular: false,
      trending: false,
      spicy: 1,
      calories: 250,
      prepTime: '5 min'
    },
    {
      id: 5,
      name: 'Taco de Pescado',
      description: 'Empanizado estilo Baja con ensalada crujiente y aderezo chipotle',
      price: 40,
      category: 'Tacos',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: true,
      trending: true,
      spicy: 2,
      calories: 320,
      prepTime: '7 min'
    },
    {
      id: 6,
      name: 'Taco Vegetariano',
      description: 'Nopales, hongos asados y queso fundido',
      price: 30,
      category: 'Tacos',
      image: 'https://images.unsplash.com/photo-1765087909734-a8a07a167fb3?w=800&q=80',
      popular: false,
      trending: false,
      spicy: 0,
      calories: 220,
      prepTime: '5 min'
    },
    {
      id: 7,
      name: 'Quesadilla de Queso',
      description: 'Queso Oaxaca fundido en tortilla artesanal',
      price: 40,
      category: 'Quesadillas',
      image: 'https://images.unsplash.com/photo-1765087909734-a8a07a167fb3?w=800&q=80',
      popular: false,
      trending: false,
      spicy: 0,
      calories: 410,
      prepTime: '6 min'
    },
    {
      id: 8,
      name: 'Quesadilla con Carne',
      description: 'Elige pastor, asada o pollo. Extra queso y salsa ahumada',
      price: 55,
      category: 'Quesadillas',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: true,
      trending: false,
      spicy: 1,
      calories: 480,
      prepTime: '7 min'
    },
    {
      id: 9,
      name: 'Quesadilla de Champinones',
      description: 'Con epazote, queso y cebolla caramelizada',
      price: 50,
      category: 'Quesadillas',
      image: 'https://images.unsplash.com/photo-1765087909734-a8a07a167fb3?w=800&q=80',
      popular: false,
      trending: false,
      spicy: 0,
      calories: 430,
      prepTime: '6 min'
    },
    {
      id: 10,
      name: 'Vampiro de Asada',
      description: 'Tortilla dorada, costra de queso y carne asada crujiente',
      price: 45,
      category: 'Especiales',
      image: 'https://images.unsplash.com/photo-1765087909734-a8a07a167fb3?w=800&q=80',
      popular: true,
      trending: true,
      spicy: 2,
      calories: 390,
      prepTime: '8 min'
    },
    {
      id: 11,
      name: 'Gringa de Adobada',
      description: 'Harina, queso Oaxaca, adobada y salsa de la casa',
      price: 50,
      category: 'Especiales',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: true,
      trending: true,
      spicy: 2,
      calories: 430,
      prepTime: '8 min'
    },
    {
      id: 12,
      name: 'Torta de Asada',
      description: 'Pan telera, frijol, carne asada, aguacate y jalapeno',
      price: 85,
      category: 'Especiales',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: false,
      trending: false,
      spicy: 2,
      calories: 670,
      prepTime: '10 min'
    },
    {
      id: 13,
      name: 'Agua de Horchata',
      description: 'Hecha en casa, canela natural y hielo triturado',
      price: 25,
      category: 'Bebidas',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: true,
      trending: false,
      spicy: 0,
      calories: 150,
      prepTime: '1 min'
    },
    {
      id: 14,
      name: 'Agua de Jamaica',
      description: 'Refrescante y natural, sin azucar anadida',
      price: 25,
      category: 'Bebidas',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: false,
      trending: false,
      spicy: 0,
      calories: 90,
      prepTime: '1 min'
    },
    {
      id: 15,
      name: 'Churros con Lechera',
      description: 'Con canela, azucar y topping de lechera',
      price: 45,
      category: 'Postres',
      image: 'https://images.unsplash.com/photo-1629793982144-00548a0c75cc?w=800&q=80',
      popular: true,
      trending: false,
      spicy: 0,
      calories: 380,
      prepTime: '5 min'
    }
  ];

  useEffect(() => {
    const updateDragLimit = () => {
      const el = sliderViewportRef.current;
      if (!el) return;
      setDragLimit(Math.max(0, el.scrollWidth - el.clientWidth));
    };

    const updateMobileMode = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    updateDragLimit();
    updateMobileMode();

    window.addEventListener('resize', updateDragLimit);
    window.addEventListener('resize', updateMobileMode);

    return () => {
      window.removeEventListener('resize', updateDragLimit);
      window.removeEventListener('resize', updateMobileMode);
    };
  }, []);

  const filteredItems = useMemo(
    () =>
      menuItems.filter((item) => {
        const matchesCategory = selectedCategory === 'Todo' || item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [selectedCategory, searchTerm, menuItems]
  );

  useEffect(() => {
    if (!filteredItems.length) {
      setHoveredCard(null);
      return;
    }

    if (!hoveredCard || !filteredItems.some((item) => item.id === hoveredCard)) {
      setHoveredCard(filteredItems[0].id);
    }
  }, [filteredItems, hoveredCard]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const item = menuItems.find((menu) => menu.id === Number(id));
        if (!item) return null;
        return { ...item, quantity };
      })
      .filter((item): item is CartEntry => Boolean(item));
  }, [cart, menuItems]);

  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const cartCount = useMemo(() => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0), [cart]);

  const addToCart = (id: number) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  };

  const addToCartWithEffect = (item: MenuItem, event: ReactMouseEvent<HTMLButtonElement>) => {
    addToCart(item.id);

    const fab = cartFabRef.current;
    if (!fab) return;

    const fromRect = event.currentTarget.getBoundingClientRect();
    const toRect = fab.getBoundingClientRect();

    const particle: FlyParticle = {
      id: `${item.id}-${Date.now()}-${Math.random()}`,
      image: item.image,
      startX: fromRect.left + fromRect.width / 2 - 16,
      startY: fromRect.top + fromRect.height / 2 - 16,
      endX: toRect.left + toRect.width / 2 - 12,
      endY: toRect.top + toRect.height / 2 - 12
    };

    setFlying((prev) => [...prev, particle]);
    window.setTimeout(() => {
      setFlying((prev) => prev.filter((entry) => entry.id !== particle.id));
    }, 860);
  };

  const handleCheckout = () => {
    const orderText = cartItems.map((item) => `- ${item.quantity}x ${item.name} - $${item.price * item.quantity}`).join('\n');
    const message = `Hola! Quiero hacer un pedido:\n\n${orderText}\n\nTOTAL: $${cartTotal} MXN\nDireccion: ${restaurant.address}`;
    window.open(`https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const closeSheetOnDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 760) {
      setShowCart(false);
    }
  };

  const activeDesktopItem = filteredItems.find((item) => item.id === hoveredCard) ?? filteredItems[0] ?? null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-inter">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,88,12,0.24),transparent_35%)]" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <p className="font-space text-xs uppercase tracking-[0.38em] text-white/60">Editorial Spatial Menu</p>
          <h1 className="mt-4 font-space text-[14vw] uppercase leading-[0.82] tracking-[-0.055em] md:text-[8vw]">{restaurant.name}</h1>
          <p className="mt-3 max-w-3xl text-white/70">{restaurant.description}</p>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-y border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-5 md:px-10">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />
            <input
              type="text"
              placeholder="Busca tu antojo..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-12 w-full border border-white/15 bg-black/60 pl-12 pr-4 text-white placeholder:text-white/35 focus:border-[#EA580C] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-[#EA580C]" />
            <div ref={sliderViewportRef} className="flex-1 overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <motion.div
                drag="x"
                dragElastic={0.08}
                dragConstraints={{ left: -dragLimit, right: 0 }}
                className="flex w-max gap-3 cursor-grab active:cursor-grabbing pr-8"
              >
                {categories.map((category) => {
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`h-10 border px-4 text-xs uppercase tracking-[0.15em] transition-colors ${
                        isActive
                          ? 'border-[#EA580C] bg-[#EA580C] text-black'
                          : 'border-white/20 bg-black/40 text-white hover:border-[#EA580C] hover:text-[#EA580C]'
                      }`}
                    >
                      {category.label} <span className="opacity-65">({category.count})</span>
                    </button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-space text-xs uppercase tracking-[0.25em] text-white/55">Drop Selection</p>
            <h2 className="mt-2 font-space text-4xl uppercase tracking-[-0.03em] md:text-6xl">{selectedCategory === 'Todo' ? 'All Items' : selectedCategory}</h2>
          </div>
          <p className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/45 md:flex">
            <TrendingUp className="h-4 w-4 text-[#EA580C]" />
            {filteredItems.length} results
          </p>
        </div>

        {isMobile ? (
          <div className="border-y border-white/10">
            {filteredItems.map((item) => {
              const expanded = expandedItem === item.id;
              const inCart = Boolean(cart[item.id]);

              return (
                <motion.article key={item.id} layout className="border-b border-white/10 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setExpandedItem(expanded ? null : item.id)}
                    className="w-full px-0 py-5 text-left"
                  >
                    <div className="flex items-end justify-between gap-3">
                      <p className="font-space text-4xl uppercase leading-[0.86] tracking-[-0.035em]">{item.name}</p>
                      <p className="font-space text-3xl tracking-[-0.03em] text-[#EA580C]">${item.price}</p>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">{item.category} - {item.prepTime}</p>
                  </button>

                  <AnimatePresence>
                    {expanded ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden pb-5"
                      >
                        <div className="overflow-hidden border border-white/15">
                          <ImageWithFallback src={item.image} alt={item.name} className="h-56 w-full object-cover" />
                        </div>
                        <p className="mt-4 text-sm text-white/70">{item.description}</p>
                        <div className="mt-3 flex items-center gap-4 text-xs uppercase tracking-[0.15em] text-white/55">
                          <span>{item.calories} cal</span>
                          {item.spicy > 0 ? (
                            <span className="inline-flex items-center gap-1">
                              {Array.from({ length: item.spicy }).map((_, index) => (
                                <Flame key={`${item.id}-${index}`} className="h-3.5 w-3.5 fill-[#EA580C] text-[#EA580C]" />
                              ))}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-4">
                          {inCart ? (
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="flex h-11 w-11 items-center justify-center border border-white/20 bg-black/50"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <div className="flex-1 text-center font-space text-3xl">{cart[item.id]}</div>
                              <button
                                onClick={() => addToCart(item.id)}
                                className="flex h-11 w-11 items-center justify-center border border-[#EA580C] bg-[#EA580C] text-black"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={(event) => addToCartWithEffect(item, event)}
                              className="h-12 w-full border border-[#EA580C] bg-[#EA580C] font-space text-sm uppercase tracking-[0.18em] text-black"
                            >
                              Add to cart
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-[minmax(0,1fr)_420px] gap-10">
            <div className="border-y border-white/10">
              {filteredItems.map((item) => (
                <motion.article key={item.id} layout className="border-b border-white/10 last:border-b-0">
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onFocus={() => setHoveredCard(item.id)}
                    className="w-full py-5 text-left"
                  >
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="font-space text-[clamp(2.4rem,4.8vw,5.6rem)] uppercase leading-[0.84] tracking-[-0.045em]">
                          {item.name}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">{item.category} - {item.prepTime}</p>
                      </div>
                      <p className="font-space text-[clamp(2rem,3.8vw,4rem)] tracking-[-0.04em] text-[#EA580C]">${item.price}</p>
                    </div>
                  </button>

                  <div className="mb-5 flex items-center justify-between gap-4">
                    <p className="max-w-2xl text-sm text-white/62">{item.description}</p>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={(event) => addToCartWithEffect(item, event)}
                      className="h-11 min-w-[140px] border border-[#EA580C] bg-[#EA580C] px-5 font-space text-xs uppercase tracking-[0.16em] text-black"
                    >
                      Add
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="relative">
              <div className="sticky top-28 border border-white/15 bg-black/55 p-4 backdrop-blur-xl">
                <AnimatePresence mode="wait">
                  {activeDesktopItem ? (
                    <motion.div
                      key={activeDesktopItem.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.24 }}
                    >
                      <div className="overflow-hidden border border-white/15">
                        <ImageWithFallback src={activeDesktopItem.image} alt={activeDesktopItem.name} className="h-[430px] w-full object-cover" />
                      </div>
                      <p className="mt-4 font-space text-3xl uppercase tracking-[-0.03em]">{activeDesktopItem.name}</p>
                      <p className="mt-2 text-sm text-white/70">{activeDesktopItem.description}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#EA580C]">Live preview</p>
                    </motion.div>
                  ) : (
                    <div className="py-20 text-center text-white/50">
                      Sin resultados
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="border border-white/10 bg-black/30 py-24 text-center">
            <Search className="mx-auto mb-4 h-10 w-10 text-white/45" />
            <p className="font-space text-3xl uppercase">Sin resultados</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todo');
              }}
              className="mt-5 text-[#EA580C]"
            >
              Mostrar todo el menu
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {flying.map((particle) => (
          <motion.img
            key={particle.id}
            src={particle.image}
            alt="Flying cart item"
            initial={{ x: particle.startX, y: particle.startY, scale: 1, opacity: 1 }}
            animate={{
              x: particle.endX,
              y: [particle.startY, particle.startY - 110, particle.endY],
              scale: [1, 0.82, 0.45],
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed z-[80] h-8 w-8 rounded-full border border-white/20 object-cover shadow-lg"
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {cartCount > 0 ? (
          <motion.button
            ref={cartFabRef}
            initial={{ scale: 0.2, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.2, rotate: 20, opacity: 0 }}
            onClick={() => setShowCart(true)}
            className="fixed bottom-7 right-7 z-40 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black text-white shadow-[0_18px_35px_rgba(0,0,0,0.5)]"
          >
            <ShoppingCart className="h-8 w-8" />
            <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-[#EA580C] text-sm font-bold text-black">
              {cartCount}
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showCart ? (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 z-50 bg-black/55 backdrop-blur-2xl"
              aria-label="Cerrar carrito"
            />

            <motion.section
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={SHEET_SPRING}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={closeSheetOnDrag}
              className="fixed inset-x-0 bottom-0 z-[60] mx-auto w-full max-w-3xl rounded-t-[2rem] border border-white/15 bg-[#0A0A0A]/95 p-5 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}
            >
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/25" />

              <div className="mb-4 flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="font-space text-3xl uppercase leading-none">Tu pedido</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/55">
                    <Clock className="mr-1 inline h-4 w-4 text-[#EA580C]" />
                    {restaurant.delivery} - {cartCount} items
                  </p>
                </div>
                <button onClick={() => setShowCart(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-3 overflow-y-auto pr-1 ${isMobile ? 'max-h-[44vh]' : 'max-h-[52vh]'}`}>
                {cartItems.map((item) => (
                  <div key={item.id} className="border border-white/12 bg-black/45 p-3">
                    <div className="flex gap-3">
                      <div className="h-20 w-20 overflow-hidden border border-white/12">
                        <ImageWithFallback src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-space text-xl uppercase leading-tight">{item.name}</p>
                        <p className="text-sm text-white/60">${item.price} MXN</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button onClick={() => removeFromCart(item.id)} className="flex h-8 w-8 items-center justify-center border border-white/20 bg-black/55">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => addToCart(item.id)} className="flex h-8 w-8 items-center justify-center border border-[#EA580C] bg-[#EA580C] text-black">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <p className="font-space text-2xl">${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}

                {cartItems.length === 0 ? (
                  <div className="py-10 text-center text-white/55">
                    <ShoppingCart className="mx-auto mb-3 h-10 w-10" />
                    Tu carrito esta vacio
                  </div>
                ) : null}
              </div>

              <div className="mt-5 border border-white/15 bg-black/55 p-4">
                <div className="mb-4 space-y-1">
                  <div className="flex justify-between text-sm text-white/65">
                    <span>Subtotal</span>
                    <span>${cartTotal} MXN</span>
                  </div>
                  <div className="flex justify-between font-space text-3xl uppercase">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                </div>

                {cartTotal < restaurant.minOrder ? (
                  <p className="mb-3 text-sm text-[#EA580C]">Minimo para envio: ${restaurant.minOrder} MXN</p>
                ) : null}

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  disabled={cartTotal < restaurant.minOrder || cartItems.length === 0}
                  className="flex h-13 w-full items-center justify-center gap-2 border border-[#EA580C] bg-[#EA580C] px-4 font-space text-xs uppercase tracking-[0.16em] text-black disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar pedido
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
                <p className="mt-3 flex items-center gap-1 text-xs text-white/55">
                  <MapPin className="h-3 w-3 text-[#EA580C]" />
                  {restaurant.address}
                </p>
              </div>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
