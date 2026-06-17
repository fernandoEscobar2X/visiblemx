import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Scroll to `#id` if it exists in the DOM. Respects prefers-reduced-motion. */
function scrollToHash(hash: string): boolean {
  if (!hash) return false;

  const element = document.getElementById(hash.replace('#', ''));
  if (!element) return false;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
  return true;
}

/**
 * Mount ONCE, in the root layout. On every location change it scrolls to the
 * hash target (or to the top). When the target isn't mounted yet (lazy route or
 * a section gated by `content-visibility`) it waits for it via MutationObserver
 * instead of polling with timers; a single safety timeout only disconnects the
 * observer so it can't linger if the target never appears.
 */
export function useHashScrollListener() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    if (scrollToHash(location.hash)) return;

    const observer = new MutationObserver(() => {
      if (scrollToHash(location.hash)) {
        observer.disconnect();
        window.clearTimeout(safety);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Leak guard only — not a polling retry.
    const safety = window.setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [location]);
}

/**
 * For components that render same-page hash links (e.g. the navbar). Intercepts
 * a click that points to the hash we're already on — react-router won't re-run
 * the listener when the URL is unchanged — and scrolls manually. Does NOT run
 * the global listener, so it can be used anywhere without duplicating effects.
 */
export function useHashLink() {
  const location = useLocation();

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (!to.includes('#')) return;

    const [path, hash] = to.split('#');
    const targetPath = path || '/';

    if (location.pathname === targetPath && location.hash === `#${hash}`) {
      e.preventDefault();
      scrollToHash(`#${hash}`);
    }
  };

  return { handleHashLinkClick };
}
