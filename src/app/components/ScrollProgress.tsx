import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Linear progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-900 origin-left z-[100] shadow-sm"
        style={{ scaleX }}
      />
      
      {/* Circular progress indicator */}
      <div className="fixed bottom-8 right-8 z-[100] hidden lg:block">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(15, 23, 42, 0.1)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgb(15, 23, 42)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress,
              strokeDasharray: '0 1',
            }}
            initial={{ pathLength: 0 }}
          />
        </svg>
        
        {/* Percentage text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useSpring(scrollYProgress, {
              stiffness: 100,
              damping: 30,
            }),
          }}
        >
          <motion.span className="text-xs font-black text-slate-900 tracking-tight">
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div>
      </div>
    </>
  );
}