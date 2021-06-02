import doRenderComponent from './Components/doRenderComponent';
import doHydrateComponent from './Components/doHydrateComponent';
import doChildComponent from './Components/doChildComponent';

const strapBitsyUIComponents = (components) => {
  // @ts-ignore
  window[__BITSYUI__.library] = {
    // @ts-ignore
    Hydrate: doHydrateComponent(components),
    Render: doRenderComponent(components),
    Child: doChildComponent(components),
  };
};

export default strapBitsyUIComponents;
