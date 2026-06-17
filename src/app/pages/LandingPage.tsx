import { useEffect, useState } from 'react';
import { AwwwardsHero } from '../components/AwwwardsHero';
import { InteractiveArtifacts } from '../components/InteractiveArtifacts';
import { TheManifesto } from '../components/TheManifesto';
import { ExternalCaseShowcase } from '../components/ExternalCaseShowcase';
import { TheProtocol } from '../components/TheProtocol';
import { ContactSection } from '../components/ContactSection';
import { CustomCursor } from '../components/CustomCursor';
import { MouseGlow } from '../components/MouseGlow';
import { ScrollProgress } from '../components/ScrollProgress';
import { PageLoader } from '../components/PageLoader';
import { ScrollNarrative } from '../components/ScrollNarrative';
import { ServicesArchitecture } from '../components/ServicesArchitecture';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function LandingPage() {
  useDocumentMeta(
    'Visible MX — Sitios, sistemas y plataformas digitales',
    'Estudio digital en Tijuana. Creamos sitios, sistemas y plataformas digitales para negocios que quieren vender mejor y operar con más orden.'
  );
  const [showEnhancedCursor, setShowEnhancedCursor] = useState(false);
  const deferredSectionStyle = {
    contentVisibility: 'auto' as const,
    containIntrinsicSize: '1px 900px',
  };

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(min-width: 1280px)');

    const updateCursorMode = () => {
      const lowMemory = 'deviceMemory' in navigator && typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
      setShowEnhancedCursor(pointerQuery.matches && !motionQuery.matches && widthQuery.matches && !lowMemory);
    };

    updateCursorMode();
    pointerQuery.addEventListener('change', updateCursorMode);
    motionQuery.addEventListener('change', updateCursorMode);
    widthQuery.addEventListener('change', updateCursorMode);

    return () => {
      pointerQuery.removeEventListener('change', updateCursorMode);
      motionQuery.removeEventListener('change', updateCursorMode);
      widthQuery.removeEventListener('change', updateCursorMode);
    };
  }, []);

  return (
    <>
      <div
        className={`min-h-screen bg-white antialiased ${showEnhancedCursor ? 'has-custom-cursor' : ''}`}
        style={{ position: 'relative' }}
      >
        <PageLoader />
        {showEnhancedCursor && (
          <>
            <CustomCursor />
            <MouseGlow />
          </>
        )}
        <ScrollProgress />

        <main className="relative">
          <AwwwardsHero />
          <ScrollNarrative />
          <div style={deferredSectionStyle}>
            <InteractiveArtifacts />
          </div>
          <div style={deferredSectionStyle}>
            <TheManifesto />
          </div>
          <div style={deferredSectionStyle}>
            <ServicesArchitecture />
          </div>
          <div style={deferredSectionStyle}>
            <ExternalCaseShowcase />
          </div>
          <div style={deferredSectionStyle}>
            <TheProtocol />
          </div>
          <div style={deferredSectionStyle}>
            <ContactSection />
          </div>
        </main>
      </div>
    </>
  );
}
