import { motion, type MotionValue, useTransform } from 'motion/react';
import type { ElementType } from 'react';

export type SystemModuleData = {
  id: string;
  title: string;
  data1: string;
  data2: string;
  icon: ElementType;
  x: number;
  y: number;
};

export function SystemModule({ module, progress }: { module: SystemModuleData; progress: MotionValue<number> }) {
  const { icon: Icon } = module;

  // The module starts invisible (opacity 0) and appears as progress nears 1.
  const opacity = useTransform(progress, [0, 0.7, 1], [0.1, 0.3, 1]);
  const yOffset = useTransform(progress, [0, 1], [10, 0]);

  return (
    <motion.div
      className="absolute flex w-48 flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-[4px_4px_0_rgba(0,0,0,0.3)] pointer-events-none"
      style={{
        left: `${module.x}%`,
        top: `${module.y}%`,
        transform: useTransform(yOffset, v => `translate3d(-50%, calc(-50% + ${v}px), 0) rotate(0deg)`),
        opacity
      }}
    >
      <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
        <Icon className="h-4 w-4 text-emerald-400" />
        <span className="text-sm font-bold text-white">{module.title}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-300">{module.data1}</span>
        <span className="text-xs font-medium text-slate-400">{module.data2}</span>
      </div>
    </motion.div>
  );
}
