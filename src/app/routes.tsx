import type { ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router';
import { LanguageProvider } from './context/LanguageContext';
import { useHashScrollListener } from './hooks/useHashScroll';
import { AppLayout } from './components/AppLayout';

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
const VisibleTapPage = lazy(() =>
  import('./pages/VisibleTapPage').then((mod) => ({ default: mod.VisibleTapPage }))
);
const VisibleTapDemoPage = lazy(() =>
  import('./pages/VisibleTapDemoPage').then((mod) => ({ default: mod.VisibleTapDemoPage }))
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((mod) => ({ default: mod.ServicesPage }))
);
const DigitalPresencePage = lazy(() =>
  import('./pages/DigitalPresencePage').then((mod) => ({ default: mod.DigitalPresencePage }))
);
const OperationVisibleDemoPage = lazy(() =>
  import('./pages/OperationVisibleDemoPage').then((mod) => ({ default: mod.OperationVisibleDemoPage }))
);

function RouteFallback() {
  return <div className="min-h-screen bg-[#0A1128]" />;
}

function withSuspense(children: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

// Global Layout to handle Providers and centralized hooks
function RootLayout() {
  useHashScrollListener();
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: withSuspense(<LandingPage />)
          },
          {
            path: '/servicios',
            element: withSuspense(<ServicesPage />)
          },
          {
            path: '/presencia-digital',
            element: withSuspense(<DigitalPresencePage />)
          }
        ]
      },
      {
        path: '/demo/link',
        element: withSuspense(<VisibleLinkDemo />)
      },
      {
        path: '/demo/page',
        element: withSuspense(<VisiblePageDemo />)
      },
      {
        path: '/demo/menu',
        element: withSuspense(<VisibleMenuDemo />)
      },
      {
        path: '/demo/agenda',
        element: withSuspense(<VisibleAgendaDemo />)
      },
      {
        path: '/tap',
        element: withSuspense(<VisibleTapPage />)
      },
      {
        path: '/tap/demos/:slug',
        element: withSuspense(<VisibleTapDemoPage />)
      },
      {
        path: '/demo/operacion-visible',
        element: withSuspense(<OperationVisibleDemoPage />)
      }
    ]
  }
]);
