const getCombinedURL = (...segments) =>
  segments
    .filter(Boolean)
    .map((s) => (s || '').replace(/^\/|\/$/g, ''))
    .join('/')
    .replace(/([^:]\/)\/+/g, '$1');

export default getCombinedURL;
