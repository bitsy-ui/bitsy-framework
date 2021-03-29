import React from 'react';
import { MicroUIProps } from '../Types/MicroUIProps';
import getMicroUiEnv from './getMicroUiEnv';

type GetMicroUiChild = (props: MicroUIProps) => React.ReactChild | undefined;

export const getMicroUIChild: GetMicroUiChild = (props) => {
  // Deconstruct the micro UI component values
  const {
    microUi: { library, name },
  } = props;
  // Retrieve the current env setting for this micro UI
  const env = getMicroUiEnv(library);
  // If the library exists then return the built child
  return (window as { [k: string]: any })[library] && window[library].Child
    ? window[library].Child(name, { ...props, env })
    : undefined;
};

export default getMicroUIChild;
