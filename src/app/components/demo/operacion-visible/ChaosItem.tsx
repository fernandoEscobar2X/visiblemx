import { motion, type MotionValue, useTransform } from 'motion/react';
import { MessageCircle, FileSpreadsheet, StickyNote, Receipt, CalendarX, FileText, BarChart, PhoneOff, CheckCircle2 } from 'lucide-react';
import type { ElementType } from 'react';

export type ChaosItemData = {
  id: string;
  type: 'whatsapp' | 'excel' | 'postit' | 'order' | 'appointment' | 'invoice' | 'quote' | 'report';
  text: string;
  targetText: string;
  x: number;
  y: number;
  z: number;
  rotate: number;
  targetX: number;
  targetY: number;
};

const ICONS: Record<ChaosItemData['type'], ElementType> = {
  whatsapp: MessageCircle,
  excel: FileSpreadsheet,
  postit: StickyNote,
  order: Receipt,
  appointment: CalendarX,
  invoice: FileText,
  quote: FileText,
  report: BarChart,
};

const STYLES: Record<ChaosItemData['type'], string> = {
  whatsapp: 'bg-green-50 border-green-200 text-green-800',
  excel: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  postit: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  order: 'bg-slate-50 border-slate-200 text-slate-800',
  appointment: 'bg-red-50 border-red-200 text-red-800',
  invoice: 'bg-orange-50 border-orange-200 text-orange-800',
  quote: 'bg-blue-50 border-blue-200 text-blue-800',
  report: 'bg-purple-50 border-purple-200 text-purple-800',
};

export function ChaosItem({ item, progress }: { item: ChaosItemData; progress: MotionValue<number> }) {
  const Icon = ICONS[item.type];
  const colorStyle = STYLES[item.type];

  const x = useTransform(progress, [0, 1], [item.x, item.targetX]);
  const y = useTransform(progress, [0, 1], [item.y, item.targetY]);
  const rotate = useTransform(progress, [0, 1], [item.rotate, 0]);
  const z = useTransform(progress, [0, 1], [item.z, 0]);
  const opacity = useTransform(progress, [0, 0.8, 1], [1, 1, 0]); // Fades out slightly at the end as module takes over
  
  // Transition text color to neutral/emerald at the end
  const bgOpacity = useTransform(progress, [0, 1], [1, 0]);

  return (
    <motion.div
      className={`absolute flex items-center gap-3 rounded-xl border p-3 shadow-[4px_4px_0_rgba(0,0,0,0.1)] ${colorStyle}`}
      style={{
        left: useTransform(x, v => `${v}%`),
        top: useTransform(y, v => `${v}%`),
        transform: useTransform(
          [x, y, z, rotate],
          ([, , zVal, rVal]) => `translate3d(-50%, -50%, ${zVal}px) rotate(${rVal}deg)`
        ),
        opacity,
        width: 'max-content',
        zIndex: useTransform(progress, [0, 1], [10, 0])
      }}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="font-mono text-xs font-medium">
        <motion.span style={{ opacity: useTransform(progress, [0, 0.5], [1, 0]) }}>
          {item.text}
        </motion.span>
        <motion.span 
          className="absolute inset-0 flex items-center justify-center p-3 text-emerald-800"
          style={{ opacity: useTransform(progress, [0.5, 1], [0, 1]) }}
        >
          {item.targetText}
        </motion.span>
      </span>
    </motion.div>
  );
}
