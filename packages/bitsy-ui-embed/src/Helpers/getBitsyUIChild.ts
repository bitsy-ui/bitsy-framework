import React from 'react';
import { BitsyUIProps } from '../Types/BitsyUIProps';
import getBitsyUIEnv from './getBitsyUiEnv';

type GetBitsyUIChild = (props: BitsyUIProps) => React.ReactChild | undefined;

export const getBitsyUIChild: GetBitsyUIChild = (props) => {
  // Deconstruct the micro UI component values
  const {
    bitsyUI: { library, name },
  } = props;
  // Retrieve the current env setting for this micro UI
  const env = getBitsyUIEnv(library);
  // If the library exists then return the built child
  return (window as { [k: string]: any })[library] && window[library].Child
    ? window[library].Child(name, { ...props, env })
    : undefined;
};

export default getBitsyUIChild;
