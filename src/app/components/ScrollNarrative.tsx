import { useLanguage } from '../context/LanguageContext';

export function ScrollNarrative() {
  const { language } = useLanguage();

  const text = language === 'es' ? (
    <>
      Dejarás de operar<br />
      por WhatsApp y Excel.<br />
      <span className="text-emerald-500">Es hora de escalar.</span>
    </>
  ) : (
    <>
      Stop operating<br />
      on WhatsApp and Excel.<br />
      <span className="text-emerald-500">It's time to scale.</span>
    </>
  );

  return (
    <section className="relative w-full bg-white py-32 lg:py-48 flex items-center justify-center px-6 border-b-2 border-black">
      <div className="max-w-[1400px] w-full text-center">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-black tracking-tighter uppercase leading-[0.9]">
          {text}
        </h2>
      </div>
    </section>
  );
}
