import { useEffect, useRef, useState } from 'react';
import { BarChart3, Terminal, GitBranch, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function InteractiveDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const [terminalText, setTerminalText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [variantIndex, setVariantIndex] = useState(0);

  // Terminal typewriter effect
  useEffect(() => {
    const messages = [
      'Deploying optimized checkout...',
      'A/B test: Variant B +24% conversion',
      'Analytics tracking initialized',
      'Funnel optimization complete',
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex < messages[messageIndex].length) {
        setTerminalText(messages[messageIndex].substring(0, charIndex + 1));
        charIndex++;
      } else {
        setTimeout(() => {
          charIndex = 0;
          messageIndex = (messageIndex + 1) % messages.length;
          setTerminalText('');
        }, 2000);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Variant shuffler
  useEffect(() => {
    const interval = setInterval(() => {
      setVariantIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dashboard-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const variants = [
    { label: 'Variant A', metric: '+24%', color: '#00F0FF' },
    { label: 'Heatmap Active', metric: '1.2K clicks', color: '#F97316' },
    { label: 'Checkout Flow B', metric: '+18%', color: '#84CC16' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#000000] overflow-hidden"
    >
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00F0FF] rounded-full blur-[200px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[200px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F0FF]/10 backdrop-blur-2xl border border-[#00F0FF]/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-sm font-bold text-[#00F0FF] uppercase tracking-wider">
              Analytics Micro-UI
            </span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            No Vendemos Diseño.
            <br />
            <span className="bg-gradient-to-r from-[#00F0FF] to-cyan-500 bg-clip-text text-transparent">
              Vendemos Resultados.
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Dashboards funcionales que rastrean cada conversión en tiempo real
          </p>
        </div>

        {/* Interactive Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1: Variant Shuffler */}
          <div className="dashboard-card relative">
            <div className="relative bg-[#0A0A0B]/50 backdrop-blur-2xl border border-white/10 rounded-[1rem] p-8 hover:border-[#00F0FF]/50 transition-all overflow-hidden group">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Header */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#00F0FF]/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">A/B Intelligence</h3>
                  <p className="text-xs text-gray-500 font-mono">live_testing.sys</p>
                </div>
              </div>

              {/* Variant Cards Stack */}
              <div className="relative h-48 mb-4">
                {variants.map((variant, i) => (
                  <div
                    key={i}
                    className="absolute inset-x-0 transition-all duration-500"
                    style={{
                      transform: `translateY(${(i - variantIndex) * 60}px) scale(${
                        i === variantIndex ? 1 : 0.9
                      })`,
                      opacity: i === variantIndex ? 1 : 0.4,
                      zIndex: i === variantIndex ? 10 : 5 - Math.abs(i - variantIndex),
                    }}
                  >
                    <div
                      className="bg-gradient-to-br from-[#0A0A0B] to-gray-900/50 border rounded-xl p-4"
                      style={{ borderColor: `${variant.color}40` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">
                          {variant.label}
                        </span>
                        <span
                          className="text-2xl font-black"
                          style={{ color: variant.color }}
                        >
                          {variant.metric}
                        </span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: i === variantIndex ? '75%' : '0%',
                            backgroundColor: variant.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className="relative flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-400 font-mono">Testing Active</span>
              </div>
            </div>
          </div>

          {/* Card 2: Terminal Typewriter */}
          <div className="dashboard-card relative">
            <div className="relative bg-[#0A0A0B]/50 backdrop-blur-2xl border border-white/10 rounded-[1rem] p-8 hover:border-[#00F0FF]/50 transition-all overflow-hidden group">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Header */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Revenue Stream</h3>
                  <p className="text-xs text-gray-500 font-mono">analytics.log</p>
                </div>
              </div>

              {/* Terminal */}
              <div className="relative bg-black/50 border border-white/10 rounded-xl p-4 h-48 overflow-hidden">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                
                <div className="font-mono text-sm">
                  <span className="text-green-400">$</span>{' '}
                  <span className="text-gray-300">{terminalText}</span>
                  <span
                    className={`inline-block w-2 h-4 bg-[#00F0FF] ml-1 ${
                      cursorVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </div>

              {/* API Status */}
              <div className="relative mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono">API Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
                  <span className="text-[#00F0FF] font-bold">LIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mock Funnel Builder */}
          <div className="dashboard-card relative">
            <div className="relative bg-[#0A0A0B]/50 backdrop-blur-2xl border border-white/10 rounded-[1rem] p-8 hover:border-[#00F0FF]/50 transition-all overflow-hidden group">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Header */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Growth Regimen</h3>
                  <p className="text-xs text-gray-500 font-mono">funnel.builder</p>
                </div>
              </div>

              {/* Funnel SVG */}
              <div className="relative h-48 flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 150"
                  fill="none"
                >
                  {/* Nodes */}
                  <rect x="20" y="10" width="60" height="30" rx="8" fill="#00F0FF20" stroke="#00F0FF" strokeWidth="2" />
                  <text x="50" y="28" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">Landing</text>
                  
                  <rect x="20" y="60" width="60" height="30" rx="8" fill="#06B6D420" stroke="#06B6D4" strokeWidth="2" />
                  <text x="50" y="78" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">Email</text>
                  
                  <rect x="120" y="60" width="60" height="30" rx="8" fill="#A855F720" stroke="#A855F7" strokeWidth="2" />
                  <text x="150" y="78" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">Publish</text>
                  
                  {/* Connections */}
                  <line x1="50" y1="40" x2="50" y2="60" stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="80" y1="75" x2="120" y2="75" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 2" />
                  
                  {/* Animated cursor */}
                  <circle r="4" fill="#00F0FF" className="animate-pulse">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path="M 50 28 L 50 62 L 82 75 L 122 75"
                    />
                  </circle>
                </svg>
              </div>

              {/* Status */}
              <div className="relative flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-gray-400 font-mono">Auto-Building</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
