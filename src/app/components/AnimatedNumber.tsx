import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedNumber({ value, suffix = '', duration = 2 }: AnimatedNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const spring = useSpring(0, { 
    stiffness: 100, 
    damping: 30,
    duration: duration * 1000
  });

  const display = useTransform(spring, (latest) => {
    return Math.floor(latest) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.div ref={ref}>
      <motion.span>{display}</motion.span>
    </motion.div>
  );
}
