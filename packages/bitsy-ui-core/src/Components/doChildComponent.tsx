import React, { FunctionComponent, ReactNode } from 'react';

type DoChildComponent = (components: { [key: string]: FunctionComponent }) => (name: string, props: any) => ReactNode;

const childComponent: DoChildComponent = (components) => (name, props) => {
  const Comp = components[name];
  return Comp ? <Comp {...props} /> : <React.Fragment />;
};

export default childComponent;
