import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, MouseEvent } from 'react';

interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function LiquidButton({ 
  children, 
  className = '', 
  href,
  onClick
}: LiquidButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Liquid effect layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-0"
        style={{
          x: springX,
          y: springY,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        style={{
          x: useTransform(springX, (latest) => latest * 0.5),
          y: useTransform(springY, (latest) => latest * 0.5),
        }}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </Component>
  );
}
