const getCombinedPath = (...segments) =>
  segments
    .filter(Boolean)
    .map((s) => (s || '').replace(/^\/|\/$/g, ''))
    .join('/');

export default getCombinedPath;
