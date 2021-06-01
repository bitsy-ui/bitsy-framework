import hydrateComponent from './Helpers/hydrateComponent';
import renderComponent from './Helpers/renderComponent';
import childComponent from './Helpers/childComponent';

const strapBitsyUIComponents = (components) => {
  // @ts-ignore
  window[__BITSYUI__.library] = {
    // @ts-ignore
    Hydrate: hydrateComponent(components),
    Render: renderComponent(components),
    Child: childComponent(components),
  };
};

export default strapBitsyUIComponents;
