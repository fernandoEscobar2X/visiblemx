import { motion, type MotionValue, useTransform } from 'motion/react';

export function ConnectionLines({ progress }: { progress: MotionValue<number> }) {
  // Lines animate in only at the very end of the progress (0.8 -> 1)
  const pathLength = useTransform(progress, [0.8, 1], [0, 1]);
  const opacity = useTransform(progress, [0.8, 1], [0, 0.4]);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 0.4 },
  };

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      <svg className="w-full h-full" overflow="visible">
        <motion.g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-400"
          style={{ opacity }}
        >
          {/* Clientes (20,25) to Reportes (65,75) */}
          <motion.path 
            d="M 20% 25% L 20% 50% L 65% 50% L 65% 75%" 
            fill="none" 
            style={{ pathLength }}
          />
          {/* Citas (50,25) to Reportes (65,75) */}
          <motion.path 
            d="M 50% 25% L 50% 50% L 65% 50% L 65% 75%" 
            fill="none" 
            style={{ pathLength }}
          />
          {/* Pedidos (80,25) to Reportes (65,75) */}
          <motion.path 
            d="M 80% 25% L 80% 50% L 65% 50% L 65% 75%" 
            fill="none" 
            style={{ pathLength }}
          />
          {/* Inventario (35,75) to Reportes (65,75) */}
          <motion.path 
            d="M 35% 75% L 65% 75%" 
            fill="none" 
            style={{ pathLength }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
