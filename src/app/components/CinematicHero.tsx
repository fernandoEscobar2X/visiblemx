import { useEffect, useRef } from 'react';
import { Zap, ArrowRight, TrendingUp, Code2, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CinematicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with stagger
      const titleWords = titleRef.current?.querySelectorAll('.word');
      if (titleWords) {
        gsap.fromTo(
          titleWords,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.8
          }
        );
      }

      // Subtitle fade up
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 1.5
        }
      );

      // Stats counter animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 2
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: TrendingUp, value: '2,500+', label: 'Conversiones Diarias', color: '#00F0FF' },
    { icon: Code2, value: '4', label: 'Productos Premium', color: '#06B6D4' },
    { icon: Rocket, value: '90 días', label: 'ROI Promedio', color: '#00F0FF' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#000000]"
    >
      {/* Abstract 3D Grid Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-30"
        />
        
        {/* Deep vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-[#000000]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F0FF]/30 rounded-full blur-[150px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[150px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-3 mb-12 px-6 py-3 bg-[#00F0FF]/10 backdrop-blur-2xl border border-[#00F0FF]/20 rounded-full">
          <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
          <span className="text-sm font-black text-[#00F0FF] uppercase tracking-wider">
            Agencia Digital Premium • Est. 2024
          </span>
        </div>

        {/* Main Headline */}
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-black mb-8 leading-[0.9] overflow-hidden"
        >
          <span className="word inline-block text-white">
            Traffic
          </span>{' '}
          <span className="word inline-block text-white">
            is the
          </span>{' '}
          <span className="word inline-block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Fuel.
          </span>
          <br />
          <span className="word inline-block bg-gradient-to-r from-[#00F0FF] via-cyan-400 to-[#00F0FF] bg-clip-text text-transparent">
            Conversion
          </span>{' '}
          <span className="word inline-block bg-gradient-to-r from-[#00F0FF] via-cyan-400 to-[#00F0FF] bg-clip-text text-transparent">
            is the
          </span>{' '}
          <span className="word inline-block bg-gradient-to-r from-[#00F0FF] via-cyan-400 to-[#00F0FF] bg-clip-text text-transparent">
            Engine.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl font-bold text-gray-400 mb-16 max-w-4xl mx-auto leading-tight"
        >
          No construimos sitios web. Diseñamos{' '}
          <span className="text-[#00F0FF]">máquinas de conversión</span> que
          transforman visitas en revenue.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-24">
          {/* Primary CTA */}
          <a
            href="#demos"
            className="group relative px-10 py-6 bg-gradient-to-r from-[#00F0FF] via-cyan-500 to-blue-600 rounded-[1rem] font-black text-xl text-[#000000] overflow-hidden shadow-2xl shadow-[#00F0FF]/50 hover:shadow-[#00F0FF]/80 transition-all hover:scale-105"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            <span className="relative flex items-center gap-3">
              <Zap className="w-6 h-6 animate-pulse" />
              VER DEMOS EN VIVO
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#contacto"
            className="group px-10 py-6 bg-white/5 backdrop-blur-2xl border-2 border-white/20 rounded-[1rem] font-bold text-xl text-white hover:bg-white/10 hover:border-[#00F0FF] transition-all"
          >
            <span className="flex items-center gap-3">
              Iniciar Proyecto
            </span>
          </a>
        </div>

        {/* Animated Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative group"
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-[1rem] blur-xl opacity-50 group-hover:opacity-100 transition-all"
                style={{ backgroundColor: `${stat.color}20` }}
              />
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[1rem] p-8 hover:border-[#00F0FF]/50 transition-all">
                <stat.icon
                  className="w-10 h-10 mb-4 mx-auto"
                  style={{ color: stat.color }}
                />
                
                <div className="text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-8 h-14 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-4 bg-gradient-to-b from-[#00F0FF] to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
