import { useEffect, useState } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { EliteNavbar } from '../components/EliteNavbar';
import { AwwwardsHero } from '../components/AwwwardsHero';
import { InteractiveArtifacts } from '../components/InteractiveArtifacts';
import { TheManifesto } from '../components/TheManifesto';
import { MinimalProducts } from '../components/MinimalProducts';
import { ExternalCaseShowcase } from '../components/ExternalCaseShowcase';
import { TheProtocol } from '../components/TheProtocol';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { MouseGlow } from '../components/MouseGlow';
import { ScrollProgress } from '../components/ScrollProgress';
import { PageLoader } from '../components/PageLoader';

export function LandingPage() {
  const [showEnhancedCursor, setShowEnhancedCursor] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateCursorMode = () => setShowEnhancedCursor(pointerQuery.matches && !motionQuery.matches);

    updateCursorMode();
    pointerQuery.addEventListener('change', updateCursorMode);
    motionQuery.addEventListener('change', updateCursorMode);

    return () => {
      pointerQuery.removeEventListener('change', updateCursorMode);
      motionQuery.removeEventListener('change', updateCursorMode);
    };
  }, []);

  return (
    <LanguageProvider>
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
        <EliteNavbar />
        
        <main className="relative">
          <AwwwardsHero />
          <InteractiveArtifacts />
          <TheManifesto />
          <MinimalProducts />
          <ExternalCaseShowcase />
          <TheProtocol />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
}
