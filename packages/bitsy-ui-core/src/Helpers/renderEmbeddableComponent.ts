import { BitsyUIConfig } from '../Types';
import getCombinedURL from './getCombinedURL';

type RenderEmbeddableComponent = (
  name: string,
  protocol: string,
  hostname: string,
  config: BitsyUIConfig,
  props: any,
  el: string,
) => string;

const embedComponent: RenderEmbeddableComponent = (name, protocol, hostname, config, props, el) => {
  // Determine the correct api and asset values based on
  const { bootstrap, api, ui } = config.settings;

  console.log('---->', ui.hostname);
  // Construct the props to be passed to the rendered component
  const _props = {
    // Add the frontend safe micro ui vars as env to pass into the micro ui component
    // These would typically be available on mount if mounted via the browser
    env: {
      name,
      bootstrap: {
        host: bootstrap.hostname ? bootstrap.hostname : protocol + hostname,
        path: bootstrap.publicPath,
        url: bootstrap.hostname
          ? getCombinedURL(bootstrap.hostname, bootstrap.publicPath, 'bootstrap.js')
          : getCombinedURL(protocol, hostname, bootstrap.publicPath, 'bootstrap.js'),
        options: bootstrap.options || {},
      },
      api: {
        host: api.hostname ? api.hostname : protocol + hostname,
        path: api.publicPath,
        url: api.hostname
          ? getCombinedURL(api.hostname, api.publicPath)
          : getCombinedURL(protocol, hostname, api.publicPath),
        options: api.options || {},
      },
      ui: {
        host: ui.hostname ? ui.hostname : protocol + hostname,
        path: ui.publicPath,
        url: ui.hostname
          ? getCombinedURL(ui.hostname, ui.publicPath)
          : getCombinedURL(protocol, hostname, ui.publicPath),
        script: ui.script,
        env: ui.env || {},
        options: ui.options || {},
      },
    },
    // Spread operate any additional props
    ...props,
  };
  // Generate some chaos
  const chaos = Math.random().toString(36).substring(7);
  // Return the native JS embedding code
  // This will render a div element on the page
  // It will provide the scripting to load the bootstrap.js if it is not already present
  // It will provide the props to the component
  // It will trigger a component hydration once bootstrap has loaded
  // prettier-ignore
  return ('<div data-bitsyui-library="' + config.name + '" data-bitsyui-component="' + name + '">' +
    '' + el + '' +
    '</div>' +
    '<script type="application/javascript">' +
    ' (function(n, c, p, t) {' +
    '  var w = window, m = function(e){' +
    '   if (e.detail.name === n && w[n] && w[n].Hydrate) {' +
    '    w[n].Hydrate(document.querySelector(`div[data-bitsyui-component="' + name + '"] div`),c,p,t);' +
    '   };' +
    '  };' +
    '  if (w[`' + config.name + '`]) { m(); } else { w.addEventListener(\'bitsyUILoaded\', m); }' +
    '  var d = document.getElementById(`' + config.name + 'Library`);' +
    '  if (d === null || d.length === 0) {' +
    '   var tag = document.createElement(\'script\');' +
    '   tag.id = `' + config.name + 'Library`;' +
    '   tag.src = `' + _props.env.bootstrap.url + '?c=' + chaos + '`;' +
    '   document.body.appendChild(tag);' +
    '  }' +
    ' })(\'' + config.name + '\', \'' + name + '\', ' + JSON.stringify(_props) + ', {});' +
    '</script>');
};

export default embedComponent;
