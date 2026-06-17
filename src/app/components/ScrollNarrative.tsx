import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MessageCircle, FileSpreadsheet, StickyNote, ArrowDown, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ScrollNarrative() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const t = language === 'es' ? {
    phase1: "Tu información está en todas partes.",
    phase2: "Nosotros la centralizamos.",
    phase3: "Y la convertimos en una operación clara, conectada y medible."
  } : {
    phase1: "Your information is everywhere.",
    phase2: "We centralize it.",
    phase3: "And turn it into a clear, connected, and measurable operation."
  };

  // --- Transforms for Desktop ---
  // Text opacities (Phase 1, 2, 3)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.45], [1, 1, 0, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1, 1], [0, 1, 1, 1]);

  // Text Y translations
  const text1Y = useTransform(scrollYProgress, [0.2, 0.35], ["0px", "-20px"]);
  const text2Y = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], ["20px", "0px", "0px", "-20px"]);
  const text3Y = useTransform(scrollYProgress, [0.65, 0.75], ["20px", "0px"]);

  // Chaos Elements (Phase 1 to Phase 2)
  // They start spread out and move to center, then fade out
  const chaosOpacity = useTransform(scrollYProgress, [0.4, 0.55], [1, 0]);
  const chaosScale = useTransform(scrollYProgress, [0.4, 0.55], [1, 0.5]);
  
  const msgX = useTransform(scrollYProgress, [0, 0.4], ["-120px", "0px"]);
  const msgY = useTransform(scrollYProgress, [0, 0.4], ["-80px", "0px"]);
  
  const excelX = useTransform(scrollYProgress, [0, 0.4], ["140px", "0px"]);
  const excelY = useTransform(scrollYProgress, [0, 0.4], ["-40px", "0px"]);

  const noteX = useTransform(scrollYProgress, [0, 0.4], ["-60px", "0px"]);
  const noteY = useTransform(scrollYProgress, [0, 0.4], ["100px", "0px"]);

  // Central Database (Phase 2)
  const dbOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.65, 0.8], [0, 1, 1, 0]);
  const dbScale = useTransform(scrollYProgress, [0.4, 0.55, 0.65, 0.8], [0.8, 1, 1, 1.2]);

  // System Dashboard (Phase 3)
  const sysOpacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);
  const sysY = useTransform(scrollYProgress, [0.7, 0.85], ["40px", "0px"]);

  return (
    <section className="relative w-full bg-white border-y border-slate-100">
      {/* ------------------------------------------------------------------ */}
      {/* 1. DESKTOP NARRATIVE SCROLL (Hidden on mobile or reduced motion)  */}
      {/* ------------------------------------------------------------------ */}
      {!reduce && (
        <div ref={containerRef} className="hidden lg:block h-[200vh] relative w-full">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            
            {/* Dynamic Text Container */}
            <div className="relative h-20 w-full max-w-4xl mx-auto text-center px-8 mb-12">
              <motion.h2 style={{ opacity: text1Opacity, y: text1Y }} className="absolute inset-x-0 top-0 text-3xl xl:text-4xl font-bold text-slate-800 tracking-tight">
                {t.phase1}
              </motion.h2>
              <motion.h2 style={{ opacity: text2Opacity, y: text2Y }} className="absolute inset-x-0 top-0 text-3xl xl:text-4xl font-bold text-slate-800 tracking-tight">
                {t.phase2}
              </motion.h2>
              <motion.h2 style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-x-0 top-0 text-3xl xl:text-4xl font-bold text-slate-800 tracking-tight">
                {t.phase3}
              </motion.h2>
            </div>

            {/* Graphics Container */}
            <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
              
              {/* Chaos Layer */}
              <motion.div style={{ opacity: chaosOpacity, scale: chaosScale }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <motion.div style={{ x: msgX, y: msgY }} className="absolute p-4 bg-white shadow-xl border border-slate-200 rounded-2xl rotate-[-12deg]">
                   <MessageCircle className="w-8 h-8 text-slate-400" />
                 </motion.div>
                 <motion.div style={{ x: excelX, y: excelY }} className="absolute p-4 bg-white shadow-xl border border-slate-200 rounded-2xl rotate-[8deg]">
                   <FileSpreadsheet className="w-8 h-8 text-slate-400" />
                 </motion.div>
                 <motion.div style={{ x: noteX, y: noteY }} className="absolute p-4 bg-white shadow-xl border border-slate-200 rounded-2xl rotate-[24deg]">
                   <StickyNote className="w-8 h-8 text-slate-400" />
                 </motion.div>
              </motion.div>

              {/* Central DB Layer */}
              <motion.div style={{ opacity: dbOpacity, scale: dbScale }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                 <div className="w-28 h-28 rounded-[2rem] bg-emerald-50 flex items-center justify-center border-2 border-emerald-200 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
                   <Database className="w-12 h-12 text-emerald-600" />
                 </div>
              </motion.div>

              {/* System Dashboard Layer */}
              <motion.div style={{ opacity: sysOpacity, y: sysY }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="w-[500px] h-[320px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4">
                  {/* Fake UI Header */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="w-32 h-5 bg-slate-100 rounded-md" />
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                  </div>
                  {/* Fake UI Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-emerald-50/50 rounded-xl border border-emerald-100/50" />
                    <div className="h-20 bg-blue-50/50 rounded-xl border border-blue-100/50" />
                    <div className="h-20 bg-slate-50/50 rounded-xl border border-slate-100/50" />
                  </div>
                  {/* Fake UI Chart */}
                  <div className="flex-1 bg-slate-50/50 rounded-xl border border-slate-100/50 mt-2" />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 2. MOBILE / REDUCED MOTION STATIC STACK                          */}
      {/* ------------------------------------------------------------------ */}
      <div className={`${!reduce ? 'block lg:hidden' : 'block'} py-24 px-6 max-w-lg mx-auto space-y-20`}>
        
        {/* Phase 1 */}
        <motion.div 
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-10%" }} 
          className="text-center"
        >
           <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-8 leading-tight">{t.phase1}</h3>
           <div className="flex justify-center gap-6 flex-wrap">
             <div className="p-4 bg-white shadow-md border border-slate-200 rounded-2xl rotate-[-6deg]"><MessageCircle className="w-6 h-6 text-slate-400" /></div>
             <div className="p-4 bg-white shadow-md border border-slate-200 rounded-2xl rotate-[4deg]"><FileSpreadsheet className="w-6 h-6 text-slate-400" /></div>
             <div className="p-4 bg-white shadow-md border border-slate-200 rounded-2xl rotate-[-2deg]"><StickyNote className="w-6 h-6 text-slate-400" /></div>
           </div>
        </motion.div>
        
        {/* Arrow */}
        <div className="flex justify-center"><ArrowDown className="w-6 h-6 text-slate-300" /></div>

        {/* Phase 2 */}
        <motion.div 
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-10%" }} 
          className="text-center"
        >
           <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-8 leading-tight">{t.phase2}</h3>
           <div className="flex justify-center">
             <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center border-2 border-emerald-200 shadow-lg">
               <Database className="w-10 h-10 text-emerald-600" />
             </div>
           </div>
        </motion.div>

        {/* Arrow */}
        <div className="flex justify-center"><ArrowDown className="w-6 h-6 text-slate-300" /></div>

        {/* Phase 3 */}
        <motion.div 
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-10%" }} 
          className="text-center"
        >
           <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-8 leading-tight">{t.phase3}</h3>
           <div className="flex justify-center">
             <div className="w-full max-w-sm h-[240px] bg-white rounded-2xl shadow-xl border border-slate-200 p-5 flex flex-col gap-4">
               <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                 <div className="w-24 h-4 bg-slate-100 rounded-md" />
                 <div className="w-6 h-6 rounded-full bg-slate-100" />
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <div className="h-16 bg-emerald-50/50 rounded-xl border border-emerald-100/50" />
                 <div className="h-16 bg-blue-50/50 rounded-xl border border-blue-100/50" />
               </div>
               <div className="flex-1 bg-slate-50/50 rounded-xl border border-slate-100/50 mt-1" />
             </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
