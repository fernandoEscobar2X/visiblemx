import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export function ImageReveal({ 
  src, 
  alt, 
  className = '',
  direction = 'right' 
}: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const clipPathVariants = {
    left: {
      initial: 'inset(0 100% 0 0)',
      animate: 'inset(0 0% 0 0)'
    },
    right: {
      initial: 'inset(0 0 0 100%)',
      animate: 'inset(0 0 0 0%)'
    },
    top: {
      initial: 'inset(100% 0 0 0)',
      animate: 'inset(0% 0 0 0)'
    },
    bottom: {
      initial: 'inset(0 0 100% 0)',
      animate: 'inset(0 0 0% 0)'
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ 
          clipPath: clipPathVariants[direction].initial,
          scale: 1.2
        }}
        animate={isInView ? { 
          clipPath: clipPathVariants[direction].animate,
          scale: 1
        } : {
          clipPath: clipPathVariants[direction].initial,
          scale: 1.2
        }}
        transition={{ 
          clipPath: { duration: 1, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
        }}
      />
      
      {/* Overlay shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ x: '-100%', opacity: 0 }}
        animate={isInView ? { x: '200%', opacity: 0.3 } : { x: '-100%', opacity: 0 }}
        transition={{ 
          duration: 1.5, 
          delay: 0.5,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}
