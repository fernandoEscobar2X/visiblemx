import { Outlet } from 'react-router';
import { EliteNavbar } from './EliteNavbar';
import { Footer } from './Footer';

/**
 * Marketing shell: navbar + page + footer rendered once for the marketing
 * routes (`/`, `/servicios`, `/presencia-digital`). Demo and Tap routes are
 * intentionally left outside this layout because they ship their own chrome.
 */
export function AppLayout() {
  return (
    <>
      <EliteNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
