import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';

type DoRenderEmbeddableComponent = (name: string, config: BitsyUIConfig, props: any, el: string) => string;

const embedComponent: DoRenderEmbeddableComponent = (name, config, props, el) => {
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
    '   tag.src = `' + props.env.bootstrap.url + '?c=' + chaos + '`;' +
    '   document.body.appendChild(tag);' +
    '  }' +
    ' })(\'' + config.name + '\', \'' + name + '\', ' + JSON.stringify(props) + ', {});' +
    '</script>');
};

export default embedComponent;
