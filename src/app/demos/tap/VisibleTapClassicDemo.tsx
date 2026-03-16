import { useState } from 'react';

function IconMoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" /><path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" /><path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconShare2() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconCheck({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const contact = {
  slug: 'martha-camacho',
  fullName: 'Martha Camacho',
  phone: '+52 228 199 8056',
};

export function VisibleTapClassicDemo() {
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const initials = contact.fullName.split(' ').slice(0, 2).map((n) => n[0]).join('');
  const [firstName, ...rest] = contact.fullName.split(' ');
  const lastName = rest.join(' ');

  const handleSave = () => {
    setSaved(true);
    setShareMenuOpen(false);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const handleShare = async () => {
    const pageUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: contact.fullName,
          text: contact.phone,
          url: pageUrl,
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
      await navigator.clipboard.writeText(pageUrl);
      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      setShareMenuOpen(true);
    }
  };

  const bg = dark ? '#0a0a0a' : '#ffffff';
  const fg = dark ? '#ffffff' : '#000000';
  const sub = dark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)';
  const divider = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
  const avatarBg = dark ? 'linear-gradient(145deg, #2a2a2a, #1a1a1a)' : 'linear-gradient(145deg, #e8e8ed, #d1d1d6)';
  const avatarFg = dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.55)';
  const btnPrimary = dark ? '#ffffff' : '#000000';
  const btnPrimaryFg = dark ? '#000000' : '#ffffff';
  const btnSecBg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const btnSecFg = dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.6)';
  const nfcDot = dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)';
  const nfcRing = dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)';
  const nfcLabel = dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  return (
    <>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }
        @keyframes ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(2.2); opacity: 0; }
        }
        .nfc-r1 { animation: ring-pulse 2.4s ease-out infinite; }
        .nfc-r2 { animation: ring-pulse 2.4s ease-out 0.7s infinite; }
      `}</style>

      <div style={{ minHeight: '100dvh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.4s ease', overflowX: 'hidden', paddingInline: 16 }}>
        <div style={{ width: '100%', maxWidth: 390, minHeight: '100dvh', position: 'relative', display: 'flex', flexDirection: 'column', padding: '0 28px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ position: 'relative', width: 8, height: 8 }}>
                <div className="nfc-r1" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.2px solid ${nfcRing}` }} />
                <div className="nfc-r2" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.2px solid ${nfcRing}` }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: nfcDot }} />
              </div>
              <span style={{ fontSize: 12, color: nfcLabel, letterSpacing: '0.05em', fontWeight: 500 }}>NFC</span>
            </div>

            <button
              onClick={() => setDark(!dark)}
              style={{ width: 36, height: 36, borderRadius: '50%', background: btnSecBg, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: fg, transition: 'background 0.3s, color 0.4s' }}
            >
              {dark ? <IconSun /> : <IconMoon />}
            </button>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 32, fontWeight: 600, color: avatarFg, letterSpacing: '-0.5px', userSelect: 'none' }}>{initials}</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <h1 style={{ color: fg, fontSize: 38, fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.1, margin: 0, transition: 'color 0.4s' }}>
                {firstName}<br />{lastName}
              </h1>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} style={{ color: sub, fontSize: 20, fontWeight: 400, letterSpacing: '0.2px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'color 0.3s' }}>
                <IconPhone />
                {contact.phone}
              </a>
            </div>

            <div style={{ height: 1, background: divider, marginBottom: 28 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={handleSave}
                style={{
                  width: '100%', height: 56, borderRadius: 16,
                  background: saved ? (dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)') : btnPrimary,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  color: saved ? sub : btnPrimaryFg,
                  fontSize: 17, fontWeight: 590, letterSpacing: '-0.2px',
                  transition: 'background 0.35s, color 0.35s, transform 0.15s',
                  fontFamily: 'inherit',
                }}
              >
                {saved ? <><IconCheck /> Contacto guardado</> : <><IconDownload /> Guardar contacto</>}
              </button>

              <button
                onClick={handleShare}
                style={{
                  width: '100%', height: 56, borderRadius: 16,
                  background: btnSecBg,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  color: shared ? (dark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)') : btnSecFg,
                  fontSize: 17, fontWeight: 500, letterSpacing: '-0.2px',
                  transition: 'background 0.3s, color 0.3s, transform 0.15s',
                  fontFamily: 'inherit',
                }}
              >
                {shared ? <><IconCheck size={18} /> Listo</> : <><IconShare2 /> Compartir</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {shareMenuOpen ? (
        <div
          onClick={() => setShareMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 16, zIndex: 50 }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{ width: '100%', maxWidth: 390, borderRadius: 18, background: bg, border: `1px solid ${divider}`, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 18px 45px rgba(0,0,0,0.22)' }}
          >
            <a href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" style={{ height: 48, borderRadius: 12, background: btnSecBg, color: fg, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600 }}>WhatsApp</a>
            <button onClick={() => setShareMenuOpen(false)} style={{ height: 44, borderRadius: 12, border: 'none', background: btnPrimary, color: btnPrimaryFg, fontSize: 15, cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

