import { useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Instagram, Twitter, Shield, Star, Trophy } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function GymTrainers() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const trainers = [
    {
      name: "Alex Rivera",
      role: "HEAD COACH",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80",
      social: "@arivera_fit",
      instagram: "https://instagram.com/arivera_fit",
      twitter: "https://x.com/arivera_fit"
    },
    {
      name: "Sarah Jenkins",
      role: "YOGA & MOBILITY",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
      social: "@sarah.yoga",
      instagram: "https://instagram.com/sarah.yoga",
      twitter: "https://x.com/sarah_yoga"
    },
    {
      name: "Mike Tyson",
      role: "BOXING PRO",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
      social: "@ironmike",
      instagram: "https://instagram.com/ironmike",
      twitter: "https://x.com/ironmike"
    },
    {
      name: "Elena Rodriguez",
      role: "NUTRITION",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
      social: "@elena_nutri",
      instagram: "https://instagram.com/elena_nutri",
      twitter: "https://x.com/elena_nutri"
    }
  ];

  const content = {
    es: {
      tag: "EQUIPO",
      title: "ENTRENA CON LEYENDAS",
      subtitle: "Nuestros coaches no son solo instructores. Son mentores dedicados a desbloquear tu máximo potencial."
    },
    en: {
      tag: "TEAM",
      title: "TRAIN WITH LEGENDS",
      subtitle: "Our coaches are not just instructors. They are mentors dedicated to unlocking your full potential."
    }
  };

  const t = content[language];

  return (
    <section id="entrenadores" ref={sectionRef} className="py-24 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-blue-500 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
            {t.tag}
          </span>
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
            {t.title}
          </h2>
          <p className="text-xl text-white/60 font-light">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/5 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-blue-500/50"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <ImageWithFallback
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-2xl font-black text-white mb-1 uppercase italic tracking-tighter">{trainer.name}</h3>
                <p className="text-blue-500 font-bold text-xs tracking-widest uppercase mb-4">{trainer.role}</p>
                
                <div className="flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href={trainer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${trainer.name} en Instagram`}
                    className="p-2 bg-white/10 hover:bg-white hover:text-black text-white rounded-full transition-colors backdrop-blur-sm"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={trainer.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${trainer.name} en X`}
                    className="p-2 bg-white/10 hover:bg-white hover:text-black text-white rounded-full transition-colors backdrop-blur-sm"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
