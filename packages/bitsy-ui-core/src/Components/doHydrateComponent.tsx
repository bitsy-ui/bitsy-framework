import React, { FunctionComponent } from 'react';
import { hydrate } from 'react-dom';

type DoHydrateComponent = (components: {
  [key: string]: FunctionComponent;
}) => (containerEl: HTMLElement, name: string, props: any) => void;

const hydrateComponent: DoHydrateComponent = (components) => (containerEl, name, props) => {
  const Comp = components[name];
  hydrate(<Comp {...props} />, containerEl);
};

export default hydrateComponent;
