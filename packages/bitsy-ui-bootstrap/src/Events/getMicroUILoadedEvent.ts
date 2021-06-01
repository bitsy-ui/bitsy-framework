const getMicroUILoadedEvent = (env) => new CustomEvent('bitsyUILoaded', { detail: env });

export default getMicroUILoadedEvent;
