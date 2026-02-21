import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pointerRef = useRef(false);
  const hiddenRef = useRef(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;

      if (pointerRef.current !== isClickable) {
        pointerRef.current = isClickable;
        setIsPointer(isClickable);
      }
    };

    const handleMouseEnter = () => {
      if (hiddenRef.current) {
        hiddenRef.current = false;
        setIsHidden(false);
      }
    };
    const handleMouseLeave = () => {
      if (!hiddenRef.current) {
        hiddenRef.current = true;
        setIsHidden(true);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-slate-900 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{
          scale: { duration: 0.2 }
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-slate-900 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 0.5,
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          scale: { duration: 0.3, ease: 'easeOut' },
          x: { type: 'spring', stiffness: 200, damping: 20 },
          y: { type: 'spring', stiffness: 200, damping: 20 }
        }}
      />
    </>
  );
}
