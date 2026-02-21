import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MouseGlowProps {
  color?: string;
  size?: number;
  blur?: number;
}

export function MouseGlow({ 
  color = 'rgba(0, 0, 0, 0.03)', 
  size = 400,
  blur = 100 
}: MouseGlowProps) {
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);
  const targetX = useMotionValue(-size / 2);
  const targetY = useMotionValue(-size / 2);
  const x = useSpring(targetX, { stiffness: 200, damping: 30, mass: 0.5 });
  const y = useSpring(targetY, { stiffness: 200, damping: 30, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      targetX.set(e.clientX - size / 2);
      targetY.set(e.clientY - size / 2);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [size, targetX, targetY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          x,
          y,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
        }}
      />
    </motion.div>
  );
}
