import { BitsyUIConfig } from '../Types';
import getCombinedURL from './getCombinedURL';

type EmbedComponent = (
  name: string,
  protocol: string,
  hostname: string,
  config: BitsyUIConfig,
  props: any,
  el: string,
) => string;

const embedComponent: EmbedComponent = (name, protocol, hostname, config, props, el) => {
  // Determine the correct api and asset values based on
  const { bootstrap, api, ui } = config.settings;
  // Construct the props to be passed to the rendered component
  const _props = {
    env: {
      name,
      bootstrap: {
        host: protocol + hostname,
        path: bootstrap.path,
        url: protocol + getCombinedURL(hostname, bootstrap.path, 'bootstrap.js'),
        options: bootstrap.options || {},
      },
      api: {
        host: protocol + hostname,
        path: api.path,
        url: protocol + getCombinedURL(hostname, api.path),
        options: api.options || {},
      },
      ui: {
        host: protocol + hostname,
        path: ui.path,
        url: protocol + getCombinedURL(hostname, ui.path),
        main: ui.main,
        env: ui.env || {},
        options: ui.options || {},
      },
    },
    ...props,
  };
  // Return the built component
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
    '   tag.src = `' + protocol + getCombinedURL(hostname, bootstrap.path, 'bootstrap.js') + '`;' +
    '   document.body.appendChild(tag);' +
    '  }' +
    ' })(\'' + config.name + '\', \'' + name + '\', ' + JSON.stringify(_props) + ', {});' +
    '</script>');
};

export default embedComponent;
