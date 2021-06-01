import doLoadScript from './doLoadScript';
import getMicroUILoadedEvent from './getMicroUILoadedEvent';
import getMicroUIErrorEvent from './getMicroUIErrorEvent';
import getCombinedURL from './getCombinedURL';

// Tokens to be replaced by the express endpoint
// PLEASE NOTE: the __???__ will be stripped out and replaced when express serves this file
// DO NOT USE THE TOKENS THEMSELVES! ie __ENV__.something, use the const so env.something
// @ts-ignore - these will be replaced via string replacement
const env = __ENV__;
// @ts-ignore - these will be replaced via string replacement
const manifest = __MANIFEST__;

/**
 * Fetches assets and emits an event to indicate the micro UI is ready to use
 * Loops through all of the JS assets within the generate manifest.json and loads them in
 * Once all assets are loaded a event will be emitted on the window object
 * PLEASE NOTE: Components wishing to use these assets should be listening for this event emit
 */
const fetchAssetsHandler = () => {
  // Set the env vars in the window space for easy access
  // These should be only the safe vars which users could see if they monitored traffic
  window[`__BitsyUI${env.name}Env__`] = env;
  // Set the webpack custom URL for api retrieval
  window[`__BitsyUI${env.name}BootUrl__`] = getCombinedURL(env.bootstrap.url, '/');
  // Set the webpack custom URL for api retrieval
  window[`__BitsyUI${env.name}ApiUrl__`] = getCombinedURL(env.api.url, '/');
  // @TODO should we provide a list of endpoints here?
  // Set the webpack custom URL for ui retrieval
  window[`__BitsyUI${env.name}UiUrl__`] = getCombinedURL(env.ui.url, '/');
  // @TODO should we provide a list of components here?
  // Retrieve the main JS
  const script = manifest[env.ui.script || 'main.js'];
  // Load the manifest assets
  // @QUESTION should we support multiple entry files?
  doLoadScript(getCombinedURL(env.ui.url, script))
    .catch(() => {
      window.dispatchEvent(getMicroUIErrorEvent(env));
    })
    .then(() => {
      window.dispatchEvent(getMicroUILoadedEvent(env));
    });
};
// If the document is ready or has DOM elements rendered
// This is for loading bootstrap.js outside of the <HEAD>
// PLEASE NOTE: Most SPA react applications will do this
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  fetchAssetsHandler();
} else {
  document.addEventListener('DOMContentLoaded', fetchAssetsHandler, false);
}
