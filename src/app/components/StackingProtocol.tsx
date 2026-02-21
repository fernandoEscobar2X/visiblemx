import { useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Server, BarChart2, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StackingProtocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current;
    
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            filter: 'blur(20px)',
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top center',
              end: 'top 20%',
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      title: 'Infrastructure',
      subtitle: 'Hosting de Alta Performance',
      description: 'Servidores optimizados con CDN global, uptime 99.9% garantizado y escalado automático bajo demanda.',
      icon: Server,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      color: '#00F0FF',
    },
    {
      title: 'Analytics',
      subtitle: 'Data-Driven Intelligence',
      description: 'Tracking avanzado de cada interacción, heatmaps en tiempo real y reportes automáticos de conversión.',
      icon: BarChart2,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      color: '#06B6D4',
    },
    {
      title: 'Optimization',
      subtitle: 'Continuous Deployment',
      description: 'Pipeline de CI/CD automatizado, A/B testing continuo y optimización algorítmica de rendimiento.',
      icon: Code2,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      color: '#A855F7',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0A0A0B] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20 sticky top-32 z-10">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            El <span className="bg-gradient-to-r from-[#00F0FF] to-cyan-500 bg-clip-text text-transparent">Protocolo</span>
          </h2>
          <p className="text-xl text-gray-400">
            Tres pilares que sostienen cada proyecto
          </p>
        </div>

        {/* Stacking Cards */}
        <div className="space-y-8">
          {protocols.map((protocol, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="sticky top-40"
              style={{ zIndex: 10 - i }}
            >
              <div className="relative bg-[#000000] border border-white/10 rounded-[1rem] overflow-hidden group hover:border-[#00F0FF]/50 transition-all">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20">
                  <ImageWithFallback
                    src={protocol.image}
                    alt={protocol.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/90 to-[#000000]/70" />
                </div>

                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"
                  style={{ backgroundColor: `${protocol.color}10` }}
                />

                {/* Content */}
                <div className="relative p-12 min-h-[400px] flex flex-col justify-between">
                  <div>
                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 backdrop-blur-2xl"
                      style={{
                        backgroundColor: `${protocol.color}20`,
                        border: `1px solid ${protocol.color}40`,
                      }}
                    >
                      <protocol.icon
                        className="w-8 h-8"
                        style={{ color: protocol.color }}
                      />
                    </div>

                    {/* Text */}
                    <p
                      className="text-sm font-bold uppercase tracking-wider mb-2"
                      style={{ color: protocol.color }}
                    >
                      {protocol.subtitle}
                    </p>
                    <h3 className="text-5xl font-black text-white mb-4">
                      {protocol.title}
                    </h3>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                      {protocol.description}
                    </p>
                  </div>

                  {/* Animated Artifact */}
                  <div className="mt-8">
                    {i === 0 && (
                      // 3D Server Rack Animation
                      <div className="relative w-full h-24 flex items-center justify-center gap-4">
                        {[...Array(5)].map((_, j) => (
                          <div
                            key={j}
                            className="w-16 h-20 bg-gradient-to-b from-[#00F0FF]/20 to-cyan-500/20 border border-[#00F0FF]/40 rounded-lg animate-pulse"
                            style={{
                              animationDelay: `${j * 0.2}s`,
                              transform: `perspective(500px) rotateY(${j * 5 - 10}deg)`,
                            }}
                          >
                            <div className="w-full h-2 bg-[#00F0FF] rounded-t-lg" />
                            <div className="p-2 space-y-1">
                              {[...Array(4)].map((_, k) => (
                                <div
                                  key={k}
                                  className="w-full h-1 bg-[#00F0FF]/30 rounded"
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {i === 1 && (
                      // Scanning Analytics Chart
                      <div className="relative w-full h-24">
                        <svg className="w-full h-full" viewBox="0 0 400 100">
                          {/* Chart bars */}
                          {[20, 40, 60, 50, 80, 90, 70, 85].map((height, j) => (
                            <rect
                              key={j}
                              x={j * 50 + 10}
                              y={100 - height}
                              width="30"
                              height={height}
                              fill="url(#barGradient)"
                              opacity="0.8"
                            >
                              <animate
                                attributeName="height"
                                values={`${height};${height + 10};${height}`}
                                dur="2s"
                                repeatCount="indefinite"
                                begin={`${j * 0.2}s`}
                              />
                              <animate
                                attributeName="y"
                                values={`${100 - height};${100 - height - 10};${100 - height}`}
                                dur="2s"
                                repeatCount="indefinite"
                                begin={`${j * 0.2}s`}
                              />
                            </rect>
                          ))}
                          
                          {/* Scanning laser */}
                          <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="100"
                            stroke="#06B6D4"
                            strokeWidth="2"
                            opacity="0.8"
                          >
                            <animate
                              attributeName="x1"
                              values="0;400;0"
                              dur="3s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="x2"
                              values="0;400;0"
                              dur="3s"
                              repeatCount="indefinite"
                            />
                          </line>
                          
                          <defs>
                            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#06B6D4" />
                              <stop offset="100%" stopColor="#0891B2" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    )}

                    {i === 2 && (
                      // Compile Loading Bar
                      <div className="relative w-full h-24 flex items-center">
                        <div className="w-full space-y-3">
                          <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                            <span>Compiling...</span>
                            <span>98%</span>
                          </div>
                          <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#A855F7] to-purple-600 rounded-full"
                              style={{
                                width: '98%',
                                animation: 'loadingPulse 2s ease-in-out infinite',
                              }}
                            />
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              style={{
                                animation: 'shimmer 1.5s ease-in-out infinite',
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                            <span className="text-gray-400 font-mono">
                              optimization.complete()
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes loadingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
