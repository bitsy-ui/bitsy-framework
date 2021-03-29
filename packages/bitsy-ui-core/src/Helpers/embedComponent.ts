import { MicroUIConfig } from '../Types';

type EmbedComponent = (name: string, config: MicroUIConfig, props: any, el: string) => string;

const embedComponent: EmbedComponent = (name, config, props, el) => {
  // Determine the correct api and asset values based on
  const apiUrl = config.settings.api?.url;
  const apiPath = config.settings.api?.path;
  const assetUrl = config.settings.ui?.url || apiUrl;
  const assetTarget = config.settings.ui?.target || config.settings.ui.target;
  const assetEnv = config.settings.ui?.env || {};
  // Construct the props to be passed to the rendered component
  const _props = {
    name,
    apiUrl,
    apiPath,
    assetUrl: assetUrl || apiUrl,
    assetTarget,
    ...assetEnv,
    ...props,
  };
  // Return the built component
  // prettier-ignore
  return ('<div data-microui-library="' + config.name + '" data-microui-component="' + name + '">' +
    '' + el + '' +
    '</div>' +
    '<script type="application/javascript">' +
    ' (function(n, c, p, t) {' +
    '  var w = window, m = function(e){' +
    '   if (e.detail.name === n && w[n] && w[n].Hydrate) {' +
    '    w[n].Hydrate(document.querySelector(`div[data-microui-component="' + name + '"] div`),c,p,t);' +
    '   };' +
    '  };' +
    '  if (w[`' + config.name + '`]) { m(); } else { w.addEventListener(\'microUILoaded\', m); }' +
    '  var d = document.getElementById(`' + config.name + 'Library`);' +
    '  if (d === null || d.length === 0) {' +
    '   var tag = document.createElement(\'script\');' +
    '   tag.id = `' + config.name + 'Library`;' +
    '   tag.src = `' + apiUrl + '/bootstrap.js`;' +
    '   document.body.appendChild(tag);' +
    '  }' +
    ' })(\'' + config.name + '\', \'' + name + '\', ' + JSON.stringify(_props) + ', {});' +
    '</script>');
};

export default embedComponent;
