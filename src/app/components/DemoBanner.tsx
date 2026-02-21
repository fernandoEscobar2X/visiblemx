import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

interface DemoBannerProps {
  productName: string;
  productPrice: string;
  productUrl: string;
}

export function DemoBanner({ productName, productPrice, productUrl }: DemoBannerProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left - Back button */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-slate-300 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Volver al sitio</span>
          </Link>

          {/* Center - Product info */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-white font-bold text-lg">{productName}</div>
              <div className="text-slate-400 text-sm">Demo en vivo</div>
            </div>
          </div>

          {/* Right - CTA */}
          <a
            href={productUrl}
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-100 transition-colors"
          >
            <span>Contratar {productPrice}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
