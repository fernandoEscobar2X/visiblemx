import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CASE_URL = 'https://cltj.netlify.app';

export function ExternalCaseShowcase() {
  const { language } = useLanguage();

  return (
    <section id="caso-real" className="w-full bg-black border-y-2 border-slate-900 overflow-hidden">
      <a 
        href={CASE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 py-16 lg:py-24 hover:bg-slate-950 transition-colors"
      >
        <div className="flex flex-col">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
            {language === 'es' ? 'Caso Externo' : 'External Case'}
          </span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white leading-none">
            Corte Laser Tijuana
          </h2>
        </div>
        
        <div className="mt-8 md:mt-0 w-24 h-24 rounded-full border-2 border-slate-800 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 shrink-0">
          <ArrowRight className="w-8 h-8 text-slate-500 group-hover:text-black transition-colors" />
        </div>
      </a>
    </section>
  );
}
