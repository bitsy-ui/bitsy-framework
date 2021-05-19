const getCombinedURL = (...segments) => {
  return segments
    .filter(Boolean)
    .map((s) => (s || '').replace(/^\/|\/$/g, ''))
    .join('/')
    .replace(/(\/)\/+/g, '$1');
}

export default getCombinedURL;
