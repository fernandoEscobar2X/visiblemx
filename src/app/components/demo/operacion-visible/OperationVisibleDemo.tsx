import { useEffect, useState, useRef } from 'react';
import { animate, useMotionValue, useSpring, useTransform, motion } from 'motion/react';
import { useLanguage } from '../../../context/LanguageContext';
import { Users, CalendarCheck, PackageSearch, Boxes, LineChart } from 'lucide-react';
import { ChaosItem, type ChaosItemData } from './ChaosItem';
import { SystemModule, type SystemModuleData } from './SystemModule';
import { DemoSlider } from './DemoSlider';
import { ConnectionLines } from './ConnectionLines';
import { DemoCTA } from './DemoCTA';

export function OperationVisibleDemo({ variant = 'standalone' }: { variant?: 'standalone' | 'hero' }) {
  const { language } = useLanguage();
  const progress = useMotionValue(0);
  const [sliderValue, setSliderValue] = useState(0);
  const hasInteracted = useRef(false);

  // Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-1, 1], [48, 52]); // Base 50deg
  const rotateZ = useTransform(smoothMouseX, [-1, 1], [-13, -17]); // Base -15deg

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize coordinates between -1 and 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Sync slider to motion value manually when user interacts
  const handleSliderChange = (val: number) => {
    setSliderValue(val);
    progress.set(val / 100);
  };

  const handleInteractionStart = () => {
    hasInteracted.current = true;
  };

  useEffect(() => {
    if (hasInteracted.current) return;
    
    // Autoplay after 4 seconds
    const timeout = setTimeout(() => {
      if (hasInteracted.current) return;
      
      const controls = animate(progress, 1, {
        duration: 8,
        ease: 'easeInOut',
        onUpdate: (v) => setSliderValue(v * 100)
      });
      return controls.stop;
    }, 4000);
    
    return () => clearTimeout(timeout);
  }, []);

  // In hero variant, we start autoplay slightly earlier (1.5s instead of 4s)
  useEffect(() => {
    if (variant !== 'hero') return;
    if (hasInteracted.current) return;
    
    const timeout = setTimeout(() => {
      if (hasInteracted.current) return;
      const controls = animate(progress, 1, {
        duration: 5,
        ease: 'easeInOut',
        onUpdate: (v) => setSliderValue(v * 100)
      });
      return controls.stop;
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [variant]);

  const CHAOS_ITEMS: ChaosItemData[] = [
    { id: '1', type: 'whatsapp', text: '"Oye, ¿tienen disponible..."', targetText: 'Lead #47 — Capturado', x: 20, y: 30, z: 20, rotate: -8, targetX: 20, targetY: 25 },
    { id: '2', type: 'excel', text: 'inventario_final_v3_REAL.xlsx', targetText: '142 productos — Sincronizado', x: 75, y: 25, z: 15, rotate: 5, targetX: 35, targetY: 75 },
    { id: '3', type: 'postit', text: '"Llamar a cliente del martes"', targetText: 'Tarea asignada — María', x: 35, y: 65, z: 30, rotate: -12, targetX: 20, targetY: 25 },
    { id: '4', type: 'order', text: 'Pedido #0047 — Estado: ???', targetText: 'Pedido #0047 — En proceso', x: 65, y: 70, z: 10, rotate: 8, targetX: 80, targetY: 25 },
    { id: '5', type: 'appointment', text: '"No se presentó"', targetText: 'Cita confirmada — 10:30am', x: 80, y: 50, z: 25, rotate: -5, targetX: 50, targetY: 25 },
    { id: '6', type: 'invoice', text: 'PENDIENTE — 45 días', targetText: 'Cobrada — $12,400', x: 25, y: 50, z: 5, rotate: 15, targetX: 65, targetY: 75 },
    { id: '7', type: 'quote', text: '"Te la mando mañana"', targetText: 'Cotización #089 — Enviada', x: 50, y: 20, z: 40, rotate: -3, targetX: 80, targetY: 25 },
    { id: '8', type: 'report', text: '"¿Cuánto vendimos?"', targetText: 'Ventas mensuales: +18%', x: 45, y: 85, z: 15, rotate: 6, targetX: 65, targetY: 75 },
  ];

  const SYSTEM_MODULES: SystemModuleData[] = [
    { id: 'm1', title: 'Clientes', data1: '12 activos', data2: '3 nuevos hoy', icon: Users, x: 20, y: 25 },
    { id: 'm2', title: 'Citas', data1: '8 programadas', data2: '2 confirmadas', icon: CalendarCheck, x: 50, y: 25 },
    { id: 'm3', title: 'Pedidos', data1: '23 en proceso', data2: '4 enviados', icon: PackageSearch, x: 80, y: 25 },
    { id: 'm4', title: 'Inventario', data1: '142 items', data2: '4 bajo mínimo', icon: Boxes, x: 35, y: 75 },
    { id: 'm5', title: 'Reportes', data1: 'Vista mensual', data2: 'Ventas: +18%', icon: LineChart, x: 65, y: 75 },
  ];

  return (
    <div 
      className={`relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center ${variant === 'standalone' ? 'min-h-[700px] p-6' : 'h-full'}`}
      onMouseMove={handleMouseMove}
    >
      
      {/* Header (Only standalone) */}
      {variant === 'standalone' && (
        <motion.div 
          className="absolute top-10 inset-x-0 text-center z-10"
          style={{
            opacity: useTransform(progress, [0.8, 1], [1, 0])
          }}
        >
          <h2 className="text-3xl font-black text-white tracking-tight">
            <motion.span style={{ opacity: useTransform(progress, [0, 0.5], [1, 0]), position: 'absolute', width: '100%', left: 0 }}>
              {language === 'es' ? 'Así opera tu negocio hoy.' : 'This is how your business operates today.'}
            </motion.span>
            <motion.span style={{ opacity: useTransform(progress, [0.5, 1], [0, 1]) }}>
              {language === 'es' ? 'Así opera con un sistema.' : 'This is how it operates with a system.'}
            </motion.span>
          </h2>
        </motion.div>
      )}

      {/* Isometric Container */}
      <div 
        className="relative w-full aspect-square max-w-[800px] sm:aspect-video"
        style={{ 
          perspective: '1200px',
          scale: variant === 'hero' ? 0.9 : 1 // Scale down slightly in hero to fit nicely
        }}
      >
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            rotateX,
            rotateZ
          }}
        >
          {/* Base Grid / Table surface */}
          <div className="absolute inset-0 border border-slate-700/50 bg-slate-900/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden" />
          
          <ConnectionLines progress={progress} />
          
          {/* Static Wireframe: showing Chaos elements floating */}
          {CHAOS_ITEMS.map(item => (
             <ChaosItem key={item.id} item={item} progress={progress} />
          ))}

          {/* Static Wireframe: showing Modules faintly to indicate where they will go */}
          {SYSTEM_MODULES.map(module => (
             <SystemModule key={module.id} module={module} progress={progress} />
          ))}

        </motion.div>
      </div>

      {variant === 'standalone' && <DemoCTA progress={progress} />}

      <DemoSlider 
        value={sliderValue} 
        onChange={handleSliderChange} 
        onInteractionStart={handleInteractionStart} 
      />

    </div>
  );
}
