import type { ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { LanguageProvider } from './context/LanguageContext';

const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((mod) => ({ default: mod.LandingPage }))
);
const VisibleLinkDemo = lazy(() =>
  import('./demos/VisibleLinkDemo').then((mod) => ({ default: mod.VisibleLinkDemo }))
);
const VisiblePageDemo = lazy(() =>
  import('./demos/VisiblePageDemo').then((mod) => ({ default: mod.VisiblePageDemo }))
);
const VisibleMenuDemo = lazy(() =>
  import('./demos/VisibleMenuDemo').then((mod) => ({ default: mod.VisibleMenuDemo }))
);
const VisibleAgendaDemo = lazy(() =>
  import('./demos/VisibleAgendaDemo').then((mod) => ({ default: mod.VisibleAgendaDemo }))
);

function RouteFallback() {
  return <div className="min-h-screen bg-[#0A1128]" />;
}

function withSuspense(children: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

// Wrapper for demos with Language Context
function DemoWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(<LandingPage />)
  },
  {
    path: '/demo/link',
    element: withSuspense(
      <DemoWrapper>
        <VisibleLinkDemo />
      </DemoWrapper>
    )
  },
  {
    path: '/demo/page',
    element: withSuspense(
      <DemoWrapper>
        <VisiblePageDemo />
      </DemoWrapper>
    )
  },
  {
    path: '/demo/menu',
    element: withSuspense(
      <DemoWrapper>
        <VisibleMenuDemo />
      </DemoWrapper>
    )
  },
  {
    path: '/demo/agenda',
    element: withSuspense(
      <DemoWrapper>
        <VisibleAgendaDemo />
      </DemoWrapper>
    )
  }
]);
