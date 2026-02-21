import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

interface TextScrambleProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  scrambleSpeed?: number;
}

export function TextScramble({ 
  children, 
  className = '', 
  duration = 1000,
  delay = 0,
  scrambleSpeed = 50 
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);
  const hasScrambled = useRef(false);

  useEffect(() => {
    if (hasScrambled.current) return;

    const timer = setTimeout(() => {
      hasScrambled.current = true;
      setIsScrambling(true);
      let frame = 0;
      const totalFrames = duration / scrambleSpeed;

      const interval = setInterval(() => {
        const progress = frame / totalFrames;
        
        const newText = children
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            
            const charProgress = (index / children.length);
            
            if (progress > charProgress) {
              return children[index];
            }
            
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');

        setDisplayText(newText);
        frame++;

        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplayText(children);
          setIsScrambling(false);
        }
      }, scrambleSpeed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [children, duration, delay, scrambleSpeed]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
}

interface TextScrambleOnHoverProps {
  children: string;
  className?: string;
}

export function TextScrambleOnHover({ children, className = '' }: TextScrambleOnHoverProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovering, setIsHovering] = useState(false);

  const scramble = () => {
    let frame = 0;
    const totalFrames = 20;

    const interval = setInterval(() => {
      if (!isHovering) {
        clearInterval(interval);
        setDisplayText(children);
        return;
      }

      const progress = frame / totalFrames;
      
      const newText = children
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          
          const charProgress = (index / children.length);
          
          if (progress > charProgress) {
            return children[index];
          }
          
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      setDisplayText(newText);
      frame++;

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(children);
      }
    }, 30);
  };

  return (
    <span
      className={className}
      onMouseEnter={() => {
        setIsHovering(true);
        scramble();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setDisplayText(children);
      }}
    >
      {displayText}
    </span>
  );
}
