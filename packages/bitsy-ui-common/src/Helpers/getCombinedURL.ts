import normalizeUrl from 'normalize-url';

const getCombinedURL = (...segments) =>
  normalizeUrl(
    segments
      .filter(Boolean)
      .map((s) => (s || '').replace(/^\/|\/$/g, ''))
      .join('/'),
  );

export default getCombinedURL;
