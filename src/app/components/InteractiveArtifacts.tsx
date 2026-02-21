import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Shield, Smartphone, Globe, Layers, Eye, Cpu, Gauge, Lock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Artifact 1: The Shuffler (Estándares de Calidad)
// Recuperando la animación de tarjetas intercambiables que gustó
function ShufflerArtifact() {
  const [cards, setCards] = useState([
    { id: 1, label: "PERFORMANCE", value: "99/100", sub: "Google PageSpeed", color: "bg-[#0B1221]", highlight: "text-emerald-400", dot: "bg-emerald-500" },
    { id: 2, label: "SEO SCORE", value: "100%", sub: "Technical Audit", color: "bg-[#0f172a]", highlight: "text-blue-400", dot: "bg-blue-500" },
    { id: 3, label: "ACCESIBILIDAD", value: "AA+", sub: "WCAG 2.1 Standard", color: "bg-[#1e293b]", highlight: "text-white", dot: "bg-white" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        if (last) newCards.unshift(last);
        return newCards;
      });
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <div className="relative w-full h-full perspective-1000">
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            // Solo renderizamos las primeras 2 para el efecto de pila, ocultamos la 3ra detrás
            if (index > 1) return null;
            
            return (
              <motion.div
                key={card.id}
                layoutId={`card-${card.id}`}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{
                  y: index * 10, 
                  scale: 1 - index * 0.05,
                  opacity: 1 - index * 0.2, 
                  zIndex: 30 - index * 10,
                }}
                exit={{ scale: 1.1, opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`absolute inset-0 rounded-[2rem] shadow-2xl border border-white/5 ${card.color} p-8 flex flex-col justify-between backdrop-blur-md overflow-hidden`}
              >
                {/* Background Glow */}
                <div className={`absolute top-[-50%] right-[-50%] w-[100%] h-[100%] ${card.dot.replace('bg-', 'bg-')}/20 rounded-full blur-[80px] pointer-events-none`} />

                <div className="flex justify-between items-start relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{card.label}</span>
                  <div className={`w-2 h-2 rounded-full ${card.dot} shadow-[0_0_10px_currentColor] animate-pulse`} />
                </div>
                
                <div className="relative z-10">
                  <div className="text-6xl lg:text-7xl font-black text-white tracking-tighter mb-2">{card.value}</div>
                  <div className="text-sm text-slate-400 font-medium flex items-center gap-2">
                    {card.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Artifact 2: The Tech Stream (Infraestructura Viva)
// Recuperando el scroll infinito suave
function TelemetryArtifact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const logs = useMemo(() => [
    { id: 1, type: "SPEED", msg: "LCP optimizado: 0.8s", time: "00:01", icon: Zap, color: "text-amber-400" },
    { id: 2, type: "SEO", msg: "Sitemap indexado en Google", time: "00:02", icon: Globe, color: "text-blue-400" },
    { id: 3, type: "SECURE", msg: "Escaneo de amenazas: 0 detectadas", time: "00:05", icon: Shield, color: "text-emerald-400" },
    { id: 4, type: "MOBILE", msg: "Viewport ajustado: iPhone 14", time: "00:08", icon: Smartphone, color: "text-purple-400" },
    { id: 5, type: "CACHE", msg: "Assets comprimidos (WebP)", time: "00:12", icon: Layers, color: "text-pink-400" },
    { id: 6, type: "UPTIME", msg: "Server health check: 100%", time: "00:15", icon: Gauge, color: "text-cyan-400" },
  ], []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const totalHeight = el.scrollHeight / 2;
    
    gsap.to(el, {
      y: -totalHeight,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize(y => parseFloat(y) % totalHeight)
      }
    });
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] p-4">
        <div className="relative w-full h-full bg-[#0B1221] border border-white/5 rounded-[2rem] overflow-hidden group shadow-2xl flex flex-col">
            
            {/* Header */}
            <div className="h-14 bg-[#080c16] flex items-center justify-between px-6 border-b border-white/5 shrink-0 relative z-20">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider">STATUS MONITOR</span>
                <div className="bg-[#1e293b]/50 px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/5 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] font-bold text-white tracking-wider">SYSTEM OK</span>
                </div>
            </div>

            {/* Logs Window */}
            <div className="relative flex-1 bg-[#0B1221] overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#0B1221] to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0B1221] to-transparent z-10 pointer-events-none" />

                <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-[240px] overflow-hidden relative">
                        <div ref={containerRef} className="px-6 w-full">
                            {[...logs, ...logs].map((log, i) => (
                                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 w-full group/item hover:bg-white/[0.02] transition-colors rounded-lg px-2">
                                    <div className={`
                                        w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-900/50 border border-white/5
                                        ${log.color}
                                    `}>
                                        <log.icon className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{log.type}</span>
                                            <span className="text-[10px] text-slate-600 font-mono">{log.time}</span>
                                        </div>
                                        <p className="text-xs font-medium text-slate-300 truncate font-mono opacity-80 group-hover/item:opacity-100 transition-opacity">{log.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

// Artifact 3: The Engagement Scanner (Impacto de Marca)
// Recuperando el gráfico animado y escaneo
function GrowthArtifact() {
  return (
    <div className="relative w-full aspect-[4/3] p-4">
        <div className="relative w-full h-full bg-[#0B1221] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl group">
            
            <div className="flex justify-between items-start z-10 relative">
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">ENGAGEMENT</h4>
                    <div className="text-5xl font-black text-white tracking-tighter flex flex-col gap-1 leading-none">
                        +200%
                        <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-sm font-bold text-emerald-400 mt-1 bg-emerald-500/10 px-2 py-1 rounded self-start"
                        >
                            Visitas Orgánicas
                        </motion.span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white shadow-lg">
                    <Eye className="w-5 h-5" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[60%] w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150" preserveAspectRatio="none">
                    {/* Background Grid Lines */}
                    <line x1="0" y1="150" x2="300" y2="150" stroke="#1e293b" strokeWidth="1" />
                    <line x1="0" y1="100" x2="300" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="150" y1="0" x2="150" y2="150" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                    
                    {/* Area Gradient */}
                    <motion.path 
                        d="M 0 150 C 60 140, 100 120, 160 80 C 220 40, 260 20, 300 10 V 150 H 0 Z" 
                        fill="url(#growthGradient)" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 1.5 }}
                    />
                    
                    {/* Line Path with Draw Animation */}
                    <motion.path
                        d="M 0 150 C 60 140, 100 120, 160 80 C 220 40, 260 20, 300 10"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                    
                    <defs>
                        <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
                
                {/* Animated Vertical Scan Line */}
                <motion.div 
                    className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-emerald-400 to-transparent z-20"
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                />
            </div>
            
            {/* Background Glow */}
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
        </div>
    </div>
  );
}

export function InteractiveArtifacts() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const content = {
    es: {
      tag: "ESPECIFICACIONES",
      title: "Ingeniería Premium",
      subtitle: "Más allá de la estética. Cada desarrollo incluye una arquitectura técnica robusta diseñada para posicionar, retener y convertir.",
      artifacts: [
        { 
            title: "Obsesión por el Rendimiento", 
            desc: "Optimizamos cada línea de código. Entregamos sitios con puntuaciones perfectas en Google PageSpeed para garantizar la mejor visibilidad orgánica." 
        },
        { 
            title: "Infraestructura Viva", 
            desc: "Tu sitio no es estático. Implementamos seguridad avanzada, compresión de assets en tiempo real y compatibilidad total con todos los dispositivos modernos." 
        },
        { 
            title: "Diseño para Retención", 
            desc: "Creamos experiencias inmersivas que atrapan. Aumentamos el tiempo de permanencia de tus usuarios mediante micro-interacciones y narrativa visual fluida." 
        }
      ]
    },
    en: {
      tag: "SPECS",
      title: "Premium Engineering",
      subtitle: "Beyond aesthetics. Every deployment includes robust technical architecture designed to rank, retain, and convert.",
      artifacts: [
        { 
            title: "Performance Obsessed", 
            desc: "We optimize every line of code. We deliver sites with perfect Google PageSpeed scores to guarantee the best organic visibility." 
        },
        { 
            title: "Living Infrastructure", 
            desc: "Your site is not static. We implement advanced security, real-time asset compression, and full compatibility across all modern devices." 
        },
        { 
            title: "Retention by Design", 
            desc: "We create immersive experiences that captivate. We increase your user's dwell time through micro-interactions and fluid visual storytelling." 
        }
      ]
    }
  };

  const t = content[language];

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(".artifact-wrapper", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section id="sistemas" ref={sectionRef} className="py-24 lg:py-40 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">{t.tag}</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8">
            {t.title}
          </h2>
          <p className="text-lg lg:text-xl text-slate-500 font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Artifacts Grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          
          {/* Artifact 1: Performance */}
          <div className="artifact-wrapper flex flex-col gap-6 group">
             <div className="w-full flex justify-center hover:scale-[1.02] transition-transform duration-500">
                <ShufflerArtifact />
             </div>
             <div className="px-4 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.artifacts[0].title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{t.artifacts[0].desc}</p>
             </div>
          </div>

          {/* Artifact 2: Infraestructura */}
          <div className="artifact-wrapper flex flex-col gap-6 group">
             <div className="w-full flex justify-center hover:scale-[1.02] transition-transform duration-500">
                <TelemetryArtifact />
             </div>
             <div className="px-4 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.artifacts[1].title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{t.artifacts[1].desc}</p>
             </div>
          </div>

          {/* Artifact 3: Engagement */}
          <div className="artifact-wrapper flex flex-col gap-6 group">
             <div className="w-full flex justify-center hover:scale-[1.02] transition-transform duration-500">
                <GrowthArtifact />
             </div>
             <div className="px-4 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.artifacts[2].title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{t.artifacts[2].desc}</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}