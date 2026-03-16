import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { VisibleTapClassicDemo } from '../demos/tap/VisibleTapClassicDemo';
import { VisibleTapExecutiveDemo } from '../demos/tap/VisibleTapExecutiveDemo';
import { VisibleTapLuxuryDemo } from '../demos/tap/VisibleTapLuxuryDemo';
import { VisibleTapModernBusinessDemo } from '../demos/tap/VisibleTapModernBusinessDemo';

export function VisibleTapDemoPage() {
  const { slug } = useParams();

  const map = {
    'classic-iphone': <VisibleTapClassicDemo />,
    'executive-pro': <VisibleTapExecutiveDemo />,
    'luxury-profile': <VisibleTapLuxuryDemo />,
    'modern-business': <VisibleTapModernBusinessDemo />,
  } as const;

  const content = slug ? map[slug as keyof typeof map] : null;

  if (!content) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-4xl font-black tracking-tight">Demo no encontrada</p>
          <p className="mt-4 text-white/68">La ruta no coincide con ninguna demo disponible de Visible Tap.</p>
          <Link
            to="/tap"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Visible Tap
          </Link>
        </div>
      </div>
    );
  }

  return content;
}
