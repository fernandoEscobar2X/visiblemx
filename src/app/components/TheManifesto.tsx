import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function TheManifesto() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const content = {
    es: {
      line1: "Otros hacen páginas web.",
      line2: "Nosotros construimos instrumentos de conversión.",
      label: "FILOSOFÍA"
    },
    en: {
      line1: "Others make websites.",
      line2: "We build conversion instruments.",
      label: "PHILOSOPHY"
    }
  };

  const t = content[language];

  useEffect(() => {
    if (!sectionRef.current || !textContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(".bg-pattern", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Split Text Animation
      const lines = textContainerRef.current?.querySelectorAll(".split-line");
      
      if (lines) {
        gsap.fromTo(lines, 
          { y: 100, opacity: 0, rotateX: -20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: "top 75%",
            }
          }
        );
      }
      
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section 
      id="filosofia"
      ref={sectionRef} 
      className="relative min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden py-24"
    >
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-pattern w-full h-[120%] -top-[10%]">
        <svg width="100%" height="100%">
          <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 w-full">
        <div className="mb-12">
            <span className="inline-block px-3 py-1 border border-slate-700 rounded-full text-[10px] font-bold text-slate-400 tracking-[0.2em]">
                {t.label}
            </span>
        </div>

        <div ref={textContainerRef} className="space-y-4 lg:space-y-8 perspective-1000">
          {/* First Line - Dimmed */}
          <div className="overflow-hidden">
            <h2 className="split-line text-4xl sm:text-6xl lg:text-8xl font-black text-slate-600 tracking-tighter leading-[0.9]">
              {t.line1}
            </h2>
          </div>

          {/* Second Line - Bright/White */}
          <div className="overflow-hidden">
            <h2 className="split-line text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
              {t.line2}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}