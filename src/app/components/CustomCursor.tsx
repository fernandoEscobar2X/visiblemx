import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        body * { cursor: none !important; }
      `}</style>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference bg-white rounded-full"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 8),
          y: mousePosition.y - (isHovering ? 24 : 8),
          width: isHovering ? 48 : 16,
          height: isHovering ? 48 : 16,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
          mass: 0.1
        }}
      />
    </>
  );
}
