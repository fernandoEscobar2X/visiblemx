import { useEffect } from 'react';

/**
 * Per-route metadata for the SPA. Sets <title> and <meta name="description">
 * on mount/update. Native, no dependency. The base values still live in
 * index.html as the default; this overrides them per route.
 */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let tag = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
