import { motion, type MotionValue, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function DemoCTA({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.9, 1], [0, 1]);
  const y = useTransform(progress, [0.9, 1], [20, 0]);
  const pointerEvents = useTransform(progress, (v) => (v >= 0.95 ? 'auto' : 'none'));

  return (
    <motion.div
      className="absolute bottom-28 w-full flex justify-center z-20"
      style={{ opacity, y, pointerEvents }}
    >
      <a
        href="/#contacto"
        className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-slate-900 transition-all hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
      >
        <span className="relative z-10">Quiero ordenar mi operación</span>
        <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}
