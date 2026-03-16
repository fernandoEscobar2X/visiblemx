import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Download, Share2, Mail, Check } from 'lucide-react';

export function VisibleTapLuxuryDemo() {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  const profile = {
    name: 'Isabella Laurent',
    title: 'Aesthetic Medicine Specialist',
    quote: 'Elevating natural beauty through science and artistry',
    whatsapp: 'https://wa.me/13105550192',
    email: 'hello@isabellalaurent.com',
  };

  const saveContact = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.name}\nTITLE:${profile.title}\nTEL:+1 310 555 0192\nEMAIL:${profile.email}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'isabella_laurent.vcf';
    link.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: `${profile.title}`,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
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
      setTimeout(() => setShared(false), 2000);
    } catch {
      window.prompt('Copy this profile link', window.location.href);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-x-hidden bg-gradient-to-br from-[#F8F6F3] via-[#F5F1ED] to-[#EDE8E3] p-4 font-sans">
      <motion.div className="w-full max-w-md" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="mb-4 flex items-center justify-center gap-2" variants={itemVariants}>
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#C9A686] to-[#B8936F]"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#9D8F7F]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            NFC
          </span>
        </motion.div>

        <motion.div
          className="relative mb-6 aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl shadow-black/10"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src="https://images.unsplash.com/photo-1761429945327-97e5f01433ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGx1eHVyeXxlbnwxfHx8fDE3NzM2MTYxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Isabella Laurent"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

          <motion.div
            className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A686] to-[#A8896A] text-white">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </div>
            <span className="text-xs tracking-wide text-[#3D3530]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Verified
            </span>
          </motion.div>
        </motion.div>

        <motion.div className="mb-8 space-y-3" variants={itemVariants}>
          <h1 className="text-5xl leading-[1.1] tracking-tight text-[#2A2520]" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            {profile.name}
          </h1>
          <p className="text-[15px] uppercase tracking-wide text-[#736B63]" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em', fontWeight: 400 }}>
            {profile.title}
          </p>
          <p className="text-[17px] italic leading-relaxed text-[#4A443E]" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
            "{profile.quote}"
          </p>
        </motion.div>

        <motion.button
          className="mb-6 w-full rounded-2xl bg-gradient-to-r from-[#C9A686] to-[#B8936F] py-4 text-white shadow-lg shadow-[#C9A686]/20 active:scale-[0.98]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}
          variants={itemVariants}
          whileHover={{ scale: 1.01, boxShadow: '0 20px 40px rgba(201, 166, 134, 0.25)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.open(profile.whatsapp, '_blank')}
        >
          Contact by WhatsApp
        </motion.button>

        <motion.div className="grid grid-cols-1 gap-3 sm:grid-cols-3" variants={itemVariants}>
          <ActionButton icon={<Download className="h-5 w-5" />} label={saved ? 'Saved' : 'Save Contact'} onClick={saveContact} />
          <ActionButton icon={<Share2 className="h-5 w-5" />} label={shared ? 'Shared' : 'Share'} onClick={shareProfile} />
          <ActionButton icon={<Mail className="h-5 w-5" />} label="Email" onClick={() => (window.location.href = `mailto:${profile.email}`)} />
        </motion.div>
      </motion.div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <motion.button
      className="flex flex-col items-center gap-2.5 rounded-xl border border-[#E8E1D8] bg-white/80 px-4 py-4 backdrop-blur-sm active:scale-[0.95]"
      style={{ fontFamily: 'Inter, sans-serif' }}
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#C9A686', scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="text-[#8B7F73]">{icon}</div>
      <span className="text-[13px] font-medium tracking-wide text-[#5A534C]">{label}</span>
    </motion.button>
  );
}
