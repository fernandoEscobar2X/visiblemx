import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─── */
const COLORS = {
  bg: "#06060a",
  surface: "rgba(255,255,255,0.04)",
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.1)",
  accent: "#6C5CE7",
  accentAlt: "#00D2FF",
  accentGlow: "rgba(108,92,231,0.4)",
  textPrimary: "#F0EFF4",
  textSecondary: "rgba(240,239,244,0.55)",
  textMuted: "rgba(240,239,244,0.35)",
  danger: "#FF6B6B",
  success: "#00E676",
};

/* ─── AURORA BACKGROUND ─── */
function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: COLORS.bg }} />
      {/* Slow-moving aurora orbs */}
      <div
        className="absolute rounded-full blur-[160px] opacity-20"
        style={{
          width: 800,
          height: 800,
          background: "radial-gradient(circle, #6C5CE7 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
          animation: "auroraFloat1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-[180px] opacity-15"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, #00D2FF 0%, transparent 70%)",
          bottom: "5%",
          left: "-5%",
          animation: "auroraFloat2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-[140px] opacity-10"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #A855F7 0%, transparent 70%)",
          top: "40%",
          left: "30%",
          animation: "auroraFloat3 22s ease-in-out infinite",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Noise grain */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }} />
    </div>
  );
}

/* ─── GLASSMORPHISM CARD ─── */
function GlassCard({ children, className = "", highlighted = false, style = {} }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: highlighted ? "rgba(108,92,231,0.08)" : COLORS.glass,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${highlighted ? "rgba(108,92,231,0.3)" : COLORS.glassBorder}`,
        ...style,
      }}
    >
      {highlighted && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
          background: "linear-gradient(135deg, rgba(108,92,231,0.1) 0%, transparent 50%, rgba(0,210,255,0.05) 100%)"
        }} />
      )}
      {children}
    </div>
  );
}

/* ─── GLOW BUTTON ─── */
function GlowButton({ children, variant = "primary", href = "#", onClick, className = "" }) {
  const isPrimary = variant === "primary";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer select-none ${className}`}
      style={{
        background: isPrimary
          ? "linear-gradient(135deg, #6C5CE7 0%, #A855F7 100%)"
          : "rgba(255,255,255,0.06)",
        color: isPrimary ? "#fff" : COLORS.textPrimary,
        border: isPrimary ? "none" : `1px solid ${COLORS.glassBorder}`,
        boxShadow: isPrimary ? "0 0 30px rgba(108,92,231,0.3)" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isPrimary
          ? "0 0 50px rgba(108,92,231,0.5), 0 0 100px rgba(108,92,231,0.2)"
          : "0 0 30px rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isPrimary
          ? "0 0 30px rgba(108,92,231,0.3)"
          : "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const animate = () => {
            start += step;
            if (start >= target) {
              setCount(target);
            } else {
              setCount(Math.floor(start));
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ─── SCROLL-REVEAL WRAPPER ─── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── SVG ICONS ─── */
const Icons = {
  link: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="4" y="8" width="28" height="36" rx="4" stroke="url(#ic1)" strokeWidth="2" />
      <circle cx="18" cy="20" r="5" stroke="url(#ic1)" strokeWidth="2" />
      <line x1="10" y1="30" x2="26" y2="30" stroke="url(#ic1)" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="35" x2="22" y2="35" stroke="url(#ic1)" strokeWidth="2" strokeLinecap="round" />
      <rect x="30" y="4" width="14" height="14" rx="3" stroke="rgba(0,210,255,0.6)" strokeWidth="2" strokeDasharray="3 2" />
      <defs><linearGradient id="ic1" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#6C5CE7" /><stop offset="1" stopColor="#00D2FF" /></linearGradient></defs>
    </svg>
  ),
  page: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="6" y="4" width="36" height="40" rx="4" stroke="url(#ic2)" strokeWidth="2" />
      <rect x="12" y="10" width="24" height="12" rx="2" stroke="url(#ic2)" strokeWidth="2" />
      <line x1="12" y1="28" x2="36" y2="28" stroke="url(#ic2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="33" x2="28" y2="33" stroke="url(#ic2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="38" x2="32" y2="38" stroke="url(#ic2)" strokeWidth="2" strokeLinecap="round" />
      <defs><linearGradient id="ic2" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#6C5CE7" /><stop offset="1" stopColor="#A855F7" /></linearGradient></defs>
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="4" y="6" width="40" height="36" rx="4" stroke="url(#ic3)" strokeWidth="2" />
      <line x1="4" y1="16" x2="44" y2="16" stroke="url(#ic3)" strokeWidth="2" />
      <circle cx="12" cy="25" r="3" stroke="url(#ic3)" strokeWidth="1.5" />
      <line x1="18" y1="24" x2="38" y2="24" stroke="url(#ic3)" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="28" x2="30" y2="28" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="36" r="3" stroke="url(#ic3)" strokeWidth="1.5" />
      <line x1="18" y1="35" x2="38" y2="35" stroke="url(#ic3)" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="39" x2="30" y2="39" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <defs><linearGradient id="ic3" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#00D2FF" /><stop offset="1" stopColor="#6C5CE7" /></linearGradient></defs>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="6" y="8" width="36" height="34" rx="4" stroke="url(#ic4)" strokeWidth="2" />
      <line x1="6" y1="18" x2="42" y2="18" stroke="url(#ic4)" strokeWidth="2" />
      <line x1="16" y1="4" x2="16" y2="12" stroke="url(#ic4)" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="4" x2="32" y2="12" stroke="url(#ic4)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="27" r="3" fill="rgba(108,92,231,0.4)" stroke="url(#ic4)" strokeWidth="1.5" />
      <circle cx="24" cy="27" r="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <circle cx="32" cy="27" r="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <circle cx="16" cy="36" r="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <circle cx="24" cy="36" r="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <defs><linearGradient id="ic4" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#A855F7" /><stop offset="1" stopColor="#00D2FF" /></linearGradient></defs>
    </svg>
  ),
  qr: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 inline-block mr-1.5 -mt-0.5">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="21" y1="14" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="21" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="9" stroke="rgba(108,92,231,0.5)" strokeWidth="1.5" />
      <path d="M6 10l3 3 5-5" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ─── PRICING DATA ─── */
const packages = [
  {
    id: "link",
    name: "VISIBLE LINK",
    icon: Icons.link,
    tag: "Esencial",
    target: "Freelancers, Food Trucks",
    priceLaunch: 1799,
    priceNormal: 2699,
    features: [
      "Página de links personalizada",
      "1 Acrílico QR de mostrador",
      "Diseño a tu imagen",
      "Optimizada para móvil",
      "Entrega en 48h",
    ],
    keyFeature: null,
    highlighted: false,
  },
  {
    id: "page",
    name: "VISIBLE PAGE",
    icon: Icons.page,
    tag: "Popular",
    target: "Plomeros, Clínicas, Servicios",
    priceLaunch: 2699,
    priceNormal: 4499,
    features: [
      "Web completa multi-sección",
      "Galería de trabajos/servicios",
      "2 Acrílicos QR profesionales",
      "Formulario de contacto + WhatsApp",
      "Google Maps integrado",
    ],
    keyFeature: null,
    highlighted: false,
  },
  {
    id: "menu",
    name: "VISIBLE MENÚ",
    icon: Icons.menu,
    tag: "Best Seller",
    target: "Restaurantes, Cafés",
    priceLaunch: 3599,
    priceNormal: 6299,
    features: [
      "Menú interactivo sin internet",
      "5 Acrílicos de mesa + 1 Mostrador",
      "Fotos profesionales de platillos",
      "Categorías y filtros inteligentes",
      "Se instala como App en el celular",
    ],
    keyFeature: "Actualiza precios en 5 min sin reimprimir",
    highlighted: true,
  },
  {
    id: "agenda",
    name: "VISIBLE AGENDA",
    icon: Icons.calendar,
    tag: "Premium",
    target: "Barberías, Spas, Salones",
    priceLaunch: 4499,
    priceNormal: 7199,
    features: [
      "Sistema de citas inteligente",
      "50 Tarjetas QR personalizadas",
      "1 Acrílico de mostrador",
      "Calendario auto-gestionable",
      "Recordatorios automáticos",
    ],
    keyFeature: "Tus clientes agendan solos, cero llamadas perdidas",
    highlighted: false,
  },
];

/* ─── PRICING CARD ─── */
function PricingCard({ pkg, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <GlassCard highlighted={pkg.highlighted} className="h-full flex flex-col p-6 lg:p-7">
        {/* Badge */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
            style={{
              background: pkg.highlighted ? "rgba(108,92,231,0.25)" : "rgba(255,255,255,0.06)",
              color: pkg.highlighted ? "#A78BFA" : COLORS.textSecondary,
              border: `1px solid ${pkg.highlighted ? "rgba(108,92,231,0.4)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            {pkg.tag}
          </span>
          {pkg.highlighted && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400">
              {Icons.star} Más vendido
            </span>
          )}
        </div>

        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-4">
          {pkg.icon}
          <div>
            <h3 className="text-lg font-bold tracking-tight" style={{ color: COLORS.textPrimary, fontFamily: "'Syne', sans-serif" }}>
              {pkg.name}
            </h3>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>{pkg.target}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold" style={{
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #fff 30%, #6C5CE7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              ${pkg.priceLaunch.toLocaleString()}
            </span>
            <span className="text-xs" style={{ color: COLORS.textMuted }}>MXN</span>
          </div>
          <span className="text-xs line-through" style={{ color: COLORS.textMuted }}>
            ${pkg.priceNormal.toLocaleString()} MXN
          </span>
          <span className="ml-2 text-xs font-semibold" style={{ color: "#00E676" }}>
            Ahorras ${(pkg.priceNormal - pkg.priceLaunch).toLocaleString()}
          </span>
        </div>

        {/* Key Feature */}
        {pkg.keyFeature && (
          <div className="mb-5 px-3 py-2.5 rounded-lg text-xs font-medium" style={{
            background: "rgba(0,210,255,0.08)",
            border: "1px solid rgba(0,210,255,0.2)",
            color: "#7DD3FC",
          }}>
            ⚡ {pkg.keyFeature}
          </div>
        )}

        {/* Features */}
        <ul className="flex-1 space-y-2.5 mb-6">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: COLORS.textSecondary }}>
              {Icons.check}
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <GlowButton
          variant={pkg.highlighted ? "primary" : "secondary"}
          href={`https://wa.me/5216633634237?text=Hola!%20Me%20interesa%20el%20paquete%20${pkg.name}`}
          className="w-full justify-center text-center"
        >
          {Icons.whatsapp}
          <span>Lo quiero</span>
        </GlowButton>
      </GlassCard>
    </Reveal>
  );
}

/* ─── PROGRESS BAR ─── */
function SlotsProgress() {
  const filled = 3;
  const total = 5;
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex justify-between text-xs mb-2" style={{ color: COLORS.textSecondary }}>
        <span>{filled}/{total} lugares tomados</span>
        <span className="font-semibold" style={{ color: "#FF6B6B" }}>{total - filled} restantes</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${(filled / total) * 100}%`,
            background: "linear-gradient(90deg, #6C5CE7, #A855F7, #FF6B6B)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(6,6,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        <a href="#" className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif", color: COLORS.textPrimary }}>
          Visible<span style={{ color: COLORS.accent }}>MX</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Paquetes", "Empresas", "Proceso"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: COLORS.textSecondary }}
            >
              {l}
            </a>
          ))}
          <GlowButton href="https://wa.me/5216633634237?text=Hola!%20Quiero%20info" className="!py-2.5 !px-5 !text-xs">
            {Icons.whatsapp} Cotizar
          </GlowButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-6 h-0.5 rounded-full transition-all duration-300" style={{
            background: COLORS.textPrimary,
            transform: menuOpen ? "rotate(45deg) translate(2px, 4px)" : "none",
          }} />
          <span className="block w-6 h-0.5 rounded-full transition-all duration-300" style={{
            background: COLORS.textPrimary,
            opacity: menuOpen ? 0 : 1,
          }} />
          <span className="block w-6 h-0.5 rounded-full transition-all duration-300" style={{
            background: COLORS.textPrimary,
            transform: menuOpen ? "rotate(-45deg) translate(2px, -4px)" : "none",
          }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-5 pb-6 flex flex-col gap-4" style={{
          background: "rgba(6,6,10,0.95)",
          backdropFilter: "blur(20px)",
        }}>
          {["Paquetes", "Empresas", "Proceso"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm py-2"
              style={{ color: COLORS.textSecondary }}
            >
              {l}
            </a>
          ))}
          <GlowButton href="https://wa.me/5216633634237?text=Hola!%20Quiero%20info" className="justify-center">
            {Icons.whatsapp} Cotizar ahora
          </GlowButton>
        </div>
      )}
    </nav>
  );
}

/* ─── MAIN APP ─── */
export default function VisibleMXLanding() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', 'Satoshi', sans-serif", color: COLORS.textPrimary, background: COLORS.bg }}>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        @keyframes auroraFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.1); }
          66% { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes auroraFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -40px) scale(1.05); }
          66% { transform: translate(-30px, 50px) scale(0.9); }
        }
        @keyframes auroraFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, -30px) scale(1.15); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        html { scroll-behavior: smooth; }
        body { margin: 0; -webkit-font-smoothing: antialiased; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #06060a; }
        ::-webkit-scrollbar-thumb { background: rgba(108,92,231,0.3); border-radius: 3px; }
      `}</style>

      <AuroraBackground />
      <Navbar />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-5">
        <div className="max-w-4xl mx-auto text-center pt-24 pb-16">
          {/* Top pill */}
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
              style={{
                background: "rgba(108,92,231,0.12)",
                border: "1px solid rgba(108,92,231,0.25)",
                color: "#A78BFA",
              }}
            >
              {Icons.qr}
              Digital + Físico para negocios en Tijuana
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Haz que te{" "}
              <span style={{
                background: "linear-gradient(135deg, #6C5CE7 0%, #00D2FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>encuentren.</span>
              <br />
              Haz que te{" "}
              <span style={{
                background: "linear-gradient(135deg, #A855F7 0%, #6C5CE7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>recuerden.</span>
              <br />
              Haz que{" "}
              <span style={{
                background: "linear-gradient(135deg, #00D2FF 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>regresen.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: COLORS.textSecondary }}>
              Presencia <strong style={{ color: COLORS.textPrimary }}>Digital</strong> + Material{" "}
              <strong style={{ color: COLORS.textPrimary }}>Físico</strong> para tu negocio en Tijuana.
              <br className="hidden sm:block" />
              <span className="text-sm" style={{ color: COLORS.textMuted }}>
                Sitios web que se instalan como App + Acrílicos QR que pones en tu mostrador.
              </span>
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href="#paquetes">
                Ver Paquetes de Lanzamiento
                {Icons.arrow}
              </GlowButton>
              <GlowButton variant="secondary" href="https://wa.me/5216633634237?text=Hola!%20Quiero%20info">
                {Icons.whatsapp} Hablar con nosotros
              </GlowButton>
            </div>
          </Reveal>

          {/* Social proof */}
          <Reveal delay={400}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {[
                { val: "<1s", label: "Carga ultra-rápida" },
                { val: "QR", label: "Acrílicos incluidos" },
                { val: "PWA", label: "Se instala como App" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl sm:text-2xl font-bold" style={{
                    fontFamily: "'Syne', sans-serif",
                    background: "linear-gradient(135deg, #6C5CE7, #00D2FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{s.val}</div>
                  <div className="text-[11px] mt-1" style={{ color: COLORS.textMuted }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ PROBLEMA / SOLUCIÓN — BENTO GRID ════════════════════ */}
      <section className="relative z-10 py-20 sm:py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-center mb-3" style={{ color: COLORS.accent }}>
              El problema real
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Tu competencia ya tiene presencia digital.{" "}
              <span style={{ color: COLORS.textMuted }}>¿Y tú?</span>
            </h2>
            <p className="text-center text-sm max-w-lg mx-auto mb-14" style={{ color: COLORS.textSecondary }}>
              Cada día pierdes clientes que te buscan en Google, ven un PDF borroso como menú, o no pueden agendar.
            </p>
          </Reveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Problem cards */}
            {[
              { emoji: "🔍", title: "Clientes te buscan y no apareces", desc: "Si no estás en Google con una web profesional, no existes para el 70% de tus posibles clientes." },
              { emoji: "📄", title: "Tu menú es un PDF ilegible", desc: "Zoom in, zoom out, se tarda en cargar… tus clientes se desesperan y piden 'lo de siempre'." },
              { emoji: "📞", title: "Pierdes citas por llamadas", desc: "El 60% de las llamadas de clientes nuevos no se contestan. Cada una es dinero perdido." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <GlassCard className="p-6 h-full">
                  <div className="text-3xl mb-3">{p.emoji}</div>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>{p.desc}</p>
                </GlassCard>
              </Reveal>
            ))}

            {/* Solution - large card spanning 2 cols on desktop */}
            <Reveal delay={300} className="sm:col-span-2">
              <GlassCard highlighted className="p-7 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(108,92,231,0.2)" }}>
                    <span className="text-lg">✦</span>
                  </div>
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#A78BFA" }}>
                    Nuestra solución
                  </p>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Digital + Físico en un solo paquete
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: "⚡", text: "Página carga en menos de 1 segundo" },
                    { icon: "📱", text: "Se instala como App (PWA)" },
                    { icon: "🎯", text: "Incluye Acrílicos QR físicos" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <span className="text-xl shrink-0">{s.icon}</span>
                      <span className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>

            {/* Extra stat card */}
            <Reveal delay={400}>
              <GlassCard className="p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-extrabold mb-2" style={{
                  fontFamily: "'Syne', sans-serif",
                  background: "linear-gradient(135deg, #00D2FF, #6C5CE7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  <AnimatedCounter target={85} />%
                </div>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  de clientes buscan negocios locales en su celular antes de visitarlos
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════ PAQUETES ════════════════════ */}
      <section id="paquetes" className="relative z-10 py-20 sm:py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-center mb-3" style={{ color: COLORS.accent }}>
              Precios de lanzamiento
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Elige tu paquete.{" "}
              <span style={{
                background: "linear-gradient(135deg, #6C5CE7, #00D2FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Lanza tu negocio.</span>
            </h2>
            <p className="text-center text-sm max-w-lg mx-auto mb-6" style={{ color: COLORS.textSecondary }}>
              Cada paquete incluye tu presencia digital + materiales físicos. Sin mensualidades. Pago único.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex justify-center mb-12">
              <SlotsProgress />
            </div>
          </Reveal>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg, i) => (
              <PricingCard key={pkg.id} pkg={pkg} delay={i * 80} />
            ))}
          </div>

          <Reveal delay={400}>
            <p className="text-center text-xs mt-8" style={{ color: COLORS.textMuted }}>
              * Todos los paquetes incluyen hosting por 1 año y dominio propio. Sin cargos recurrentes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ EMPRESAS & ADD-ONS ════════════════════ */}
      <section id="empresas" className="relative z-10 py-20 sm:py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-center mb-3" style={{ color: COLORS.accentAlt }}>
              Soluciones avanzadas
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Para empresas que necesitan más
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {[
              {
                name: "Visible Industrial",
                desc: "Sitio corporativo con catálogo de productos, ficha técnica descargable, y sistema de cotización.",
                price: "Desde $8,999 MXN",
                target: "Fábricas, Distribuidores, Talleres",
              },
              {
                name: "Visible Residencial",
                desc: "Landing page inmobiliaria con galería, ubicación interactiva y formulario de contacto inteligente.",
                price: "Desde $6,499 MXN",
                target: "Desarrollos, Inmobiliarias, Bienes Raíces",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <GlassCard className="p-7 h-full">
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{item.name}</h3>
                  <p className="text-xs mb-3" style={{ color: COLORS.textMuted }}>{item.target}</p>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: COLORS.textSecondary }}>{item.desc}</p>
                  <p className="text-sm font-bold" style={{ color: COLORS.accent }}>{item.price}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* Add-ons */}
          <Reveal>
            <h3 className="text-xl font-bold text-center mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
              Add-ons disponibles
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "⭐", name: "Review Booster", desc: "QR que lleva directo a tu perfil de Google Reviews para conseguir más reseñas.", price: "+$499" },
              { icon: "🔔", name: "Notificaciones Push", desc: "Envía ofertas y avisos directamente al celular de tus clientes.", price: "+$799" },
              { icon: "📊", name: "Estadísticas Pro", desc: "Dashboard con visitas, clics, y comportamiento de tus clientes.", price: "+$599" },
            ].map((a, i) => (
              <Reveal key={i} delay={i * 80}>
                <GlassCard className="p-5 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{a.icon}</span>
                    <h4 className="text-sm font-bold">{a.name}</h4>
                    <span className="ml-auto text-xs font-semibold" style={{ color: COLORS.accent }}>{a.price}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: COLORS.textSecondary }}>{a.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PROCESO ════════════════════ */}
      <section id="proceso" className="relative z-10 py-20 sm:py-28 px-5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-center mb-3" style={{ color: COLORS.accent }}>
              Así funciona
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              De cero a visible en 3 pasos
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Nos escribes", desc: "Cuéntanos sobre tu negocio por WhatsApp. Elegimos tu paquete ideal juntos." },
              { step: "02", title: "Diseñamos todo", desc: "En 3-5 días hábiles tienes tu sitio listo + tus acrílicos QR en producción." },
              { step: "03", title: "Lanzamos", desc: "Publicamos tu web, te entregamos los acrílicos y te enseñamos a usarlo todo." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <GlassCard className="p-6 text-center h-full">
                  <div className="text-4xl font-extrabold mb-3" style={{
                    fontFamily: "'Syne', sans-serif",
                    background: "linear-gradient(135deg, #6C5CE7, #00D2FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: 0.3,
                  }}>{s.step}</div>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: COLORS.textSecondary }}>{s.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ GARANTÍA & CIERRE ════════════════════ */}
      <section className="relative z-10 py-20 sm:py-28 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{
              background: "rgba(255,107,107,0.1)",
              border: "1px solid rgba(255,107,107,0.25)",
              color: "#FF6B6B",
            }}>
              ⏳ Oferta limitada
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
              Solo{" "}
              <span style={{
                background: "linear-gradient(135deg, #FF6B6B, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>5 lugares</span>{" "}
              a precio de lanzamiento
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-sm sm:text-base mb-8 leading-relaxed" style={{ color: COLORS.textSecondary }}>
              Estos precios son exclusivos para nuestros primeros clientes que quieran construir
              su presencia digital + física desde cero. Cuando se acaben, regresan a precio normal.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mb-10">
              <SlotsProgress />
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href="https://wa.me/5216633634237?text=Hola!%20Quiero%20apartar%20mi%20lugar%20a%20precio%20de%20lanzamiento" className="text-base !px-10 !py-4">
                {Icons.whatsapp} Apartar mi lugar
              </GlowButton>
            </div>
          </Reveal>

          {/* Trust signals */}
          <Reveal delay={350}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12" style={{ color: COLORS.textMuted }}>
              {["Pago único", "Hosting 1 año incluido", "Sin contratos", "Entrega en 5 días"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs">
                  <span style={{ color: "#00E676" }}>✓</span> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="relative z-10 py-12 px-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
              Visible<span style={{ color: COLORS.accent }}>MX</span>
            </span>
            <span className="text-xs" style={{ color: COLORS.textMuted }}>
              Presencia digital + física para Tijuana
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://wa.me/5216633634237" className="text-sm transition-colors hover:text-white" style={{ color: COLORS.textSecondary }}>
              WhatsApp
            </a>
            <a href="https://instagram.com/visiblemx_" className="text-sm transition-colors hover:text-white" style={{ color: COLORS.textSecondary }}>
              Instagram
            </a>
            <a href="mailto:hola@visiblemx.com" className="text-sm transition-colors hover:text-white" style={{ color: COLORS.textSecondary }}>
              Email
            </a>
          </div>

          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            © 2026 VisibleMX. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
