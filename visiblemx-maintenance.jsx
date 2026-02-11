import { useState, useEffect } from "react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      background: "#08080A",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(96,165,250,0.15); color: #E2E8F0; }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(0.95); }
          66% { transform: translate(25px, -25px) scale(1.05); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        a:focus-visible { outline: 2px solid rgba(96,165,250,0.5); outline-offset: 4px; border-radius: 4px; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Orbs */}
      <div aria-hidden="true" style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
        top: "-15%", right: "-10%",
        animation: "orbFloat 25s ease-in-out infinite",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)",
        bottom: "-10%", left: "-8%",
        animation: "orbFloat2 30s ease-in-out infinite",
      }} />

      {/* Line */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 1, height: "100%",
        background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent 100%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        maxWidth: 520, textAlign: "center",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>

        {/* Logo mark */}
        <svg width={44} height={42} viewBox="0 0 52 48" fill="none" style={{ marginBottom: 48 }}>
          <path d="M6 6L26 40L40 12" stroke="url(#mg1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 14L44 4" stroke="url(#mg2)" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 4L46 11M44 4L37 5.5" stroke="url(#mg2)" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="mg1" x1="6" y1="6" x2="44" y2="40">
              <stop stopColor="#60A5FA" /><stop offset="1" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="mg2" x1="38" y1="14" x2="46" y2="4">
              <stop stopColor="#60A5FA" /><stop offset="1" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>

        {/* Status dot */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginBottom: 40, padding: "6px 16px",
          borderRadius: 99,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#FBBF24",
            animation: "breathe 3s ease-in-out infinite",
          }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "#94A3B8", letterSpacing: "0.06em" }}>
            En mantenimiento
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "#F1F5F9",
          marginBottom: 20,
          letterSpacing: "-0.02em",
        }}>
          Estamos preparando<br />
          <span style={{
            fontStyle: "italic",
            background: "linear-gradient(135deg, #60A5FA, #34D399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>algo mejor</span>
        </h1>

        <p style={{
          fontSize: 16, lineHeight: 1.7, color: "#64748B",
          maxWidth: 400, marginBottom: 48,
        }}>
          Nuestro sitio regresa pronto con una experiencia renovada para tu negocio.
        </p>

        {/* CTA */}
        <a
          href="https://wa.me/5216633634237?text=Hola!%20Vi%20que%20están%20en%20mantenimiento.%20Me%20interesa%20saber%20más."
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 32px", borderRadius: 12,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#E2E8F0",
            fontSize: 14, fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(96,165,250,0.2)";
            e.currentTarget.style.background = "rgba(96,165,250,0.06)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
          </svg>
          Escríbenos por WhatsApp
        </a>

        {/* Date */}
        <p style={{
          marginTop: 64, fontSize: 11, color: "#334155",
          letterSpacing: "0.08em", textTransform: "capitalize",
        }}>
          {time}
        </p>
      </div>

      {/* Bottom signature */}
      <div style={{
        position: "absolute", bottom: 24,
        display: "flex", alignItems: "center", gap: 6,
        opacity: loaded ? 1 : 0,
        transition: "opacity 1.5s ease 0.6s",
      }}>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#1E293B", textTransform: "uppercase" }}>
          VisibleMX
        </span>
      </div>
    </div>
  );
}
