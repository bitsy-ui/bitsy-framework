import React, { FunctionComponent } from 'react';
import { render } from 'react-dom';

type RenderComponent = (components: {
  [key: string]: FunctionComponent;
}) => (containerEl: HTMLElement, name: string, props: any) => void;

const renderComponent: RenderComponent = (components) => (containerEl, name, props) => {
  const Comp = components[name];
  render(<Comp {...props} />, containerEl);
};

export default renderComponent;
