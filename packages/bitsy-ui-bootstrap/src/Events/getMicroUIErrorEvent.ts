const getMicroUIErrorEvent = (env) => new CustomEvent('bitsyUIError', { detail: env });

export default getMicroUIErrorEvent;
