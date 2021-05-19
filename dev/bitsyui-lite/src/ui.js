import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { hydrate, render } from 'react-dom';
import hydrateComponent from '@bitsy-ui/core/lib/Helpers/hydrateComponent';
import renderComponent from '@bitsy-ui/core/lib/Helpers/renderComponent';
import childComponent from '@bitsy-ui/core/lib/Helpers/childComponent';
import ExampleComponent from "./Components/ExampleComponent";

// Enable code splitting by returning with loadable
export const Components = {
  ExampleComponent,
};

export const Hydrate = hydrateComponent(hydrate, Components);
export const Render = renderComponent(render, Components);
export const Child = childComponent(Components);
