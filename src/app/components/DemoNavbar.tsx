import { Link } from 'react-router';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface DemoNavbarProps {
  productName: string;
  productPrice: string;
  logo: string;
  phone: string;
  whatsapp: string;
  demoUrl?: string;
  accentColor?: string;
}

export function DemoNavbar({ 
  productName, 
  productPrice, 
  logo, 
  phone, 
  whatsapp,
  demoUrl = '/',
  accentColor = '#18181B'
}: DemoNavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
      aria-label={`${productName} navigation`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Back to main + Logo */}
          <div className="flex items-center gap-6">
            <Link 
              to={demoUrl}
              aria-label="Volver a Visible MX"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold hidden sm:inline">Volver a Visible MX</span>
            </Link>
            
            <div className="h-8 w-px bg-gray-300 hidden sm:block" />
            
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg"
                style={{ backgroundColor: accentColor }}
              >
                {logo}
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-black text-gray-900 leading-none">{productName}</p>
                <p className="text-xs text-gray-500">Demo Interactiva</p>
              </div>
            </div>
          </div>

          {/* Right: Contact CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-semibold">{phone}</span>
            </a>
            
            <a
              href={`https://wa.me/${whatsapp}?text=Hola, me interesa ${productName} (${productPrice})`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-900 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              aria-label={`Contratar ${productName} por WhatsApp`}
              style={{ backgroundColor: accentColor }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Contratar</span>
              <span className="sm:hidden text-black">Chat</span>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
