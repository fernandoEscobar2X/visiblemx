import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('visiblemx-loader-seen') !== 'true';
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('visiblemx-loader-seen', 'true');
            setIsLoading(false);
          }, 180);
          return 100;
        }

        return Math.min(prev + 25 + Math.random() * 35, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-white pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-12 relative z-10"
      >
        <motion.h1
          className="text-7xl lg:text-8xl font-black text-slate-900 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          VISIBLE MX
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-600 text-sm font-bold uppercase tracking-widest mt-2"
        >
          Digital Agency
        </motion.p>
      </motion.div>

      <div className="w-64 lg:w-96 h-1 bg-slate-200 relative overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-slate-900 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.16 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-8 text-sm font-black text-slate-900 tracking-tight"
      >
        {Math.round(Math.min(progress, 100))}%
      </motion.div>

      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-slate-200/50 rounded-[2rem]"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-slate-200/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}
