import { BitsyUIConfig } from '../Types';

type RenderStaticComponent = (name: string, config: BitsyUIConfig, props: any, el: string) => string;

const captureComponent: RenderStaticComponent = (name, config, props, el) => {
  // Return the native JS embedding code
  // This will render a div element on the page
  // It will provide the scripting to load the bootstrap.js if it is not already present
  // It will provide the props to the component
  // It will trigger a component hydration once bootstrap has loaded
  // prettier-ignore
  return ('<div data-bitsyui-library="' + config.name + '" data-bitsyui-component="' + name + '">' +
    '' + el + '' +
    '</div>');
};

export default captureComponent;
