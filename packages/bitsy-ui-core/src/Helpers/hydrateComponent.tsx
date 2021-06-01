import React, { FunctionComponent } from 'react';
import { hydrate } from 'react-dom';

type HydrateComponent = (components: {
  [key: string]: FunctionComponent;
}) => (containerEl: HTMLElement, name: string, props: any) => void;

const hydrateComponent: HydrateComponent = (components) => (containerEl, name, props) => {
  const Comp = components[name];
  hydrate(<Comp {...props} />, containerEl);
};

export default hydrateComponent;
