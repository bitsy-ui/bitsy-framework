import React, { useEffect, useRef } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BitsyUIProps } from './Types/BitsyUIProps';
import getBitsyUIEnv from './Helpers/getBitsyUiEnv';
import { useBitsyUI } from '@bitsy-ui/hooks';

export const BitsyUIComponent = (props: BitsyUIProps) => {
  // Deconstruct the micro UI component values
  const {
    bitsyUI: { url, library, name },
    ..._props
  } = props;
  // We need to have a ref, this will be the component the micro UI's internal reactDomRender will render into
  const el = useRef(null);
  // Invoke the custom micro UI hook to retrieve the mounting callback and the loading state
  // It does not matter if we have several components attempting to load the same micro UI, it will only load the assets once
  const [render, loaded] = useBitsyUI(url, library);
  // Once we have a ref and the micro ui reports as loaded then proceed to load in our component
  if (el.current && loaded) {
    // Retrieve the current env setting for this micro UI
    const env = getBitsyUIEnv(library);
    // Pass in our container ref, the name of the exported micro UI component we want to render and the props for that component
    // @ts-ignore as current will not be null by the time we get here
    render(el.current, name, { ...props, env });
  }
  // Set up a use effect to watch for when the component unmounts
  useEffect(
    () => () => {
      // Trigger the component to unmount
      unmountComponentAtNode(el.current);
    },
    [],
  );
  // Return out a div to embed within
  // @TODO make this able to be passed in
  return <div ref={el} {..._props} />;
};

export default BitsyUIComponent;
