import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';

type DoRenderMarkupComponent = (name: string, config: BitsyUIConfig, props: any, el: string) => string;

const captureComponent: DoRenderMarkupComponent = (name, config, props, el) => {
  // prettier-ignore
  return ('<div data-bitsyui-library="' + config.name + '" data-bitsyui-component="' + name + '">' +
    '' + el + '' +
    '</div>');
};

export default captureComponent;
