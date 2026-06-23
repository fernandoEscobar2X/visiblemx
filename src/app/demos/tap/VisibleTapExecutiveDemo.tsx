import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Phone, Mail, Share2, Check, ArrowDownToLine } from 'lucide-react';

interface ContactInfo {
  firstName: string;
  lastName: string;
  title: string;
  specialty: string;
  expertise: string;
  phone: string;
  email: string;
  imageUrl: string;
}

export function VisibleTapExecutiveDemo() {
  const [contactSaved, setContactSaved] = useState(false);
  const [shared, setShared] = useState(false);

  const contactInfo: ContactInfo = {
    firstName: 'Julian',
    lastName: 'Sterling',
    title: 'Managing Director',
    specialty: 'Global Strategy',
    expertise: 'Cross-Border M&A - Financial Restructuring - Board Advisory',
    phone: '+1 (917) 555-0842',
    email: 'j.sterling@sterlingadvisory.com',
    imageUrl:
      'https://images.unsplash.com/photo-1677681954237-9321d18ae0d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb3Jwb3JhdGUlMjBlbGVnYW50JTIwZXhlY3V0aXZlJTIwcG9ydHJhaXQlMjBkYXJrJTIwYXJjaGl0ZWN0dXJhbCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczNjE2MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.firstName} ${contactInfo.lastName}
N:${contactInfo.lastName};${contactInfo.firstName};;;
TITLE:${contactInfo.title}
TEL;TYPE=WORK,VOICE:${contactInfo.phone}
EMAIL;TYPE=WORK:${contactInfo.email}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactInfo.firstName}_${contactInfo.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setContactSaved(true);
    setTimeout(() => setContactSaved(false), 3000);
  };

  const shareContact = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${contactInfo.firstName} ${contactInfo.lastName}`,
          text: `${contactInfo.title} | ${contactInfo.specialty}`,
          url: window.location.href
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
      window.prompt('Copy this contact link', window.location.href);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center overflow-x-hidden bg-[#0A0A0B] px-4 py-5 font-sans text-zinc-200 selection:bg-zinc-800 selection:text-white sm:py-7">
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] bg-[#0A0A0B] shadow-2xl shadow-black/50">
        <div className="relative pb-16">
          <div className="flex justify-center px-7 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8C7A1]/15 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl">
              <div className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D8C7A1]" />
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C8BC9D]">NFC</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-[4/5] bg-zinc-900 sm:aspect-square"
          >
            <img
              src={contactInfo.imageUrl}
              alt={`${contactInfo.firstName} ${contactInfo.lastName}`}
              className="h-full w-full object-cover object-center mix-blend-luminosity opacity-90"
              style={{ filter: 'contrast(1.1) brightness(0.9)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 px-7 pb-8">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                className="space-y-2.5"
              >
                <div className="mb-1 flex items-center gap-3">
                  <div className="h-[1px] w-6 bg-[#D8C7A1]/70" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D8C7A1]/85">{contactInfo.title}</span>
                </div>

                <h1 className="text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-white">
                  {contactInfo.firstName} <br />
                  <span className="text-zinc-400">{contactInfo.lastName}</span>
                </h1>

                <p className="mt-2 text-sm font-medium tracking-wide text-zinc-300">{contactInfo.specialty}</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 mt-2 space-y-8 px-7">
            <motion.div variants={itemVariants} className="pt-2">
              <p className="text-[11px] font-medium uppercase leading-relaxed tracking-widest text-zinc-500">{contactInfo.expertise}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadVCard}
                className="relative w-full overflow-hidden rounded-xl bg-white text-black shadow-lg transition-transform"
              >
                <div className="flex items-center justify-center gap-2.5 py-4 text-[14px] font-semibold tracking-wide">
                  <AnimatePresence mode="wait">
                    {contactSaved ? (
                      <motion.div key="saved" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-2 text-black">
                        <Check className="h-4 w-4" strokeWidth={3} />
                        <span>Contact Saved</span>
                      </motion.div>
                    ) : (
                      <motion.div key="save" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                        <ArrowDownToLine className="h-4 w-4" strokeWidth={2.5} />
                        <span>Save to Contacts</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex w-full gap-3">
              <QuickAction icon={<Phone className="h-[18px] w-[18px]" />} label="Call" href={`tel:${contactInfo.phone}`} />
              <QuickAction icon={<Mail className="h-[18px] w-[18px]" />} label="Email" href={`mailto:${contactInfo.email}`} />
              <QuickAction icon={<Share2 className="h-[18px] w-[18px]" />} label={shared ? 'Shared' : 'Share'} onClick={shareContact} />
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-[1.25rem] border border-zinc-900 bg-zinc-950/70 p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">Direct Contact</p>
              <div className="space-y-2 text-[14px] leading-relaxed text-zinc-300">
                <p>{contactInfo.phone}</p>
                <p>{contactInfo.email}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, href, onClick }: { icon: React.ReactNode; label: string; href?: string; onClick?: () => void }) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(39, 39, 42, 1)' }}
      whileTap={{ scale: 0.96 }}
      className="min-w-0 flex-1 rounded-xl border border-zinc-800/80 bg-zinc-900/50 py-3.5 transition-colors"
    >
      <div className="flex flex-col items-center justify-center gap-2 px-1">
        <div className="text-zinc-300">{icon}</div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">{label}</span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block min-w-0 flex-1 outline-none">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="block min-w-0 flex-1 outline-none">
      {content}
    </button>
  );
}
