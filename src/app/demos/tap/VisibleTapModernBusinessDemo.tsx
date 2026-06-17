import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  MessageCircle,
  Share2,
  Download,
  CheckCircle2,
} from 'lucide-react';

interface ContactData {
  name: string;
  title: string;
  company: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  photo: string;
}

const contact: ContactData = {
  name: 'Carlos Mendoza',
  title: 'Director Comercial',
  company: 'Soluciones Pro',
  tagline: 'Transformando negocios con estrategias comerciales y tecnología de clase mundial',
  phone: '+52 55 1234 5678',
  email: 'carlos@solucionespro.mx',
  whatsapp: '+525512345678',
  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
};

const springConfig = { stiffness: 300, damping: 20 };

function NFCIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_25px_rgba(15,23,42,0.06)]">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-40" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">NFC</span>
    </div>
  );
}

export function VisibleTapModernBusinessDemo() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTITLE:${contact.title}\nORG:${contact.company}\nTEL:${contact.phone}\nEMAIL:${contact.email}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'carlos_mendoza.vcf';
    link.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const handleCall = () => (window.location.href = `tel:${contact.phone}`);
  const handleWhatsApp = () => window.open(`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`, '_blank');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: contact.name,
          text: `${contact.name} - ${contact.title}`,
          url: window.location.href,
        });
        setShared(true);
        window.setTimeout(() => setShared(false), 2000);
        return;
      } catch (error) {
        if (typeof error === 'object' && error && 'name' in error && error.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      window.prompt('Copia este enlace', window.location.href);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 px-4 pb-32 font-sans">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-blue-600/10 blur-[100px]" />

      <div className="mx-auto w-full max-w-md">
        <div className="relative z-20 flex justify-end pt-6">
          <NFCIndicator />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="relative z-10 flex flex-col items-center rounded-b-[2.5rem] bg-white px-6 pb-8 pt-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: imageLoaded ? 1 : 0.8, opacity: imageLoaded ? 1 : 0 }}
            transition={{ ...springConfig, delay: 0.2 }}
            className="relative"
          >
            <img
              src={contact.photo}
              alt={contact.name}
              onLoad={() => setImageLoaded(true)}
              className="h-32 w-32 rounded-full object-cover ring-4 ring-slate-50 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-blue-600 p-1 text-white shadow-lg">
              <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: 0.3 }}
            className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900"
          >
            {contact.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: 0.35 }}
            className="mt-1.5 text-sm font-bold uppercase tracking-widest text-blue-600"
          >
            {contact.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...springConfig, delay: 0.4 }}
            className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400"
          >
            {contact.company}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...springConfig, delay: 0.45 }}
            className="mt-3 max-w-[280px] text-center text-[15px] font-medium text-slate-500"
          >
            {contact.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.5 }}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <button onClick={handleWhatsApp} className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors hover:border-blue-200 active:scale-95">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <MessageCircle className="h-6 w-6 text-blue-600" strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold text-slate-600">WhatsApp</span>
          </button>

          <button onClick={handleCall} className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors hover:border-blue-200 active:scale-95">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Phone className="h-6 w-6 text-blue-600" strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold text-slate-600">Llamar</span>
          </button>

          <button onClick={handleShare} className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors hover:border-blue-200 active:scale-95">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Share2 className="h-6 w-6 text-blue-600" strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold text-slate-600">{shared ? 'Compartido' : 'Compartir'}</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.6 }}
          className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Contacto</p>
          <div className="space-y-2 text-sm font-medium text-slate-700">
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.7 }}
        className="fixed inset-x-0 bottom-0 z-50 px-4"
      >
        <div className="mx-auto w-full max-w-md bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent p-6">
          <button onClick={handleSaveContact} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-[16px] font-bold text-white shadow-[0_8px_25px_rgba(37,99,235,0.25)] transition-all hover:bg-blue-700 active:scale-[0.98]">
            {saved ? <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} /> : <Download className="h-5 w-5" strokeWidth={2.5} />}
            {saved ? 'Contacto guardado' : 'Guardar Contacto'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
