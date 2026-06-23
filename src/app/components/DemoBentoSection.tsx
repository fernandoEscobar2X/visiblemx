import { useState } from 'react';
import { ArrowRight, Smartphone, Utensils, CalendarDays, ExternalLink, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type DemoCardProps = {
  title: string;
  description: string;
  url: string;
  Icon: typeof Smartphone;
  image: string;
  isLarge?: boolean;
};

function DemoCard({ title, description, url, Icon, image, isLarge }: DemoCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl transition-all hover:border-slate-700 ${isLarge ? 'md:col-span-2' : 'col-span-1'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10 relative">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          title="Abrir en pestaña nueva"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Interactive Canvas / Preview */}
      <div className="relative h-[400px] w-full bg-slate-950 overflow-hidden group">
        {!isActive ? (
          <>
            <div className="absolute inset-0 bg-[#0A1128] transition-colors duration-500 group-hover:bg-[#0F172A]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 transition-transform duration-500 group-hover:scale-110">
              <div className="h-16 w-16 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
                <Play className="h-6 w-6 ml-1" />
              </div>
            </div>
            {/* Click area to activate iframe */}
            <button 
              className="absolute inset-0 w-full h-full cursor-pointer z-20"
              onClick={() => setIsActive(true)}
              aria-label={`Interactuar con demo de ${title}`}
            />
          </>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-slate-950 z-10 animate-in fade-in duration-500">
            <iframe 
              src={url} 
              title={title}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Bottom Bar Mobile CTA */}
      <div className="md:hidden border-t border-slate-800 bg-slate-900/80 p-4 relative z-10">
         <a href={url} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 text-white font-bold text-sm">
            Abrir Demo Completa <ArrowRight className="w-4 h-4" />
         </a>
      </div>

    </div>
  );
}

export function DemoBentoSection() {
  const { language } = useLanguage();

  return (
    <section id="demos" className="relative w-full bg-slate-50 py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight text-[#0A1128] sm:text-4xl md:text-5xl mb-4">
            {language === 'es' ? 'Sistemas en acción.' : 'Systems in action.'}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {language === 'es' 
              ? 'Explora las maquetas de producción reales de algunos de nuestros productos estrella. Haz clic en las tarjetas para interactuar en vivo.' 
              : 'Explore the live production mocks of some of our flagship products. Click on the cards to interact.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DemoCard 
            title="Agenda Inteligente"
            description="Sistema de reservas Quiet Luxury"
            url="/demo/agenda"
            Icon={CalendarDays}
            image=""
            isLarge={true}
          />
          <DemoCard 
            title="Menú Digital"
            description="Experiencia de restaurante"
            url="/demo/menu"
            Icon={Utensils}
            image=""
          />
          <DemoCard 
            title="Smart Tap NFC"
            description="Tarjeta de presentación digital"
            url="/demo/link"
            Icon={Smartphone}
            image=""
            isLarge={true}
          />
        </div>

      </div>
    </section>
  );
}
