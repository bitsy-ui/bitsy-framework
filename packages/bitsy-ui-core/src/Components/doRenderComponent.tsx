import React, { FunctionComponent } from 'react';
import { render } from 'react-dom';

type DoRenderComponent = (components: {
  [key: string]: FunctionComponent;
}) => (containerEl: HTMLElement, name: string, props: any) => void;

const renderComponent: DoRenderComponent = (components) => (containerEl, name, props) => {
  const Comp = components[name];
  render(<Comp {...props} />, containerEl);
};

export default renderComponent;
