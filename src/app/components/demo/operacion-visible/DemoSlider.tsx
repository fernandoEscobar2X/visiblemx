import { type ChangeEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

type DemoSliderProps = {
  value: number;
  onChange: (value: number) => void;
  onInteractionStart: () => void;
};

export function DemoSlider({ value, onChange, onInteractionStart }: DemoSliderProps) {
  const { language } = useLanguage();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="absolute bottom-10 w-full max-w-md px-6 z-10">
      <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
        <span>{language === 'es' ? 'Caos' : 'Chaos'}</span>
        <span>{language === 'es' ? 'Sistema' : 'System'}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleInput}
        onMouseDown={onInteractionStart}
        onTouchStart={onInteractionStart}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-emerald-400 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
      />
    </div>
  );
}
