export interface PageLike {
  id: string;
}

/**
 * Normalizes collection entry IDs to clean URL paths.
 * - 'index' -> '/'
 * - 'privacidad' -> '/privacidad'
 * - 'hub-service/spoke-location' -> '/hub-service/spoke-location'
 */
export function getPageUrl(page: PageLike): string {
  if (!page || !page.id) return '/';
  if (page.id === 'index') return '/';
  
  const cleanSlug = page.id.replace(/^\//, '').replace(/\/$/, '');
  return `/${cleanSlug}`;
}
