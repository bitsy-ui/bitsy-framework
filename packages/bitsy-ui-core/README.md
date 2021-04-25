# Bitsy UI Core

Bitsy UI core is the core library required to create a bitsy micro frontend.

## Setting Up

### Installing Library

install the lib by running `yarn add @bitsy-ui/core`

### Create React Component

Create a react component ``src/Components/ExampleComponent.tsx``

```
import React, { useCallback, useState } from 'react';

const ExampleComponent = (props) => {
  const [message, setMessage] = useState('Hello');
  const doClick = useCallback(() => {
    setMessage('Welcome');
  }, [setMessage]);
  return (
    <div onClick={doClick}>
      {message} {props?.rah}
    </div>
  );
};

export default ExampleComponent;
```

### Service (API) Setup

Setting up the service api ``src/service.ts``
```
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import createBitsyUI from '@bitsy-ui/core/lib/createBitsyUI';
import ExampleComponent from '@src/Components/ExampleComponent';

const bitsyUIConfig = require(path.join(process.cwd(), 'bitsyui.config.js'));

const { boot, strap } = createBitsyUI({ config: bitsyUIConfig });

strap('ExampleComponent', ExampleComponent);

boot((req, res) => {
  res.send({ notFound: true });
});
```

### UI Assets Setup

Setting up the assets ``service/ui.ts``

```
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { hydrate, render } from 'react-dom';
import ExampleComponent from '@src/Components/ExampleComponent';
import hydrateComponent from '@bitsy-ui/core/lib/Helpers/hydrateComponent';
import renderComponent from '@bitsy-ui/core/lib/Helpers/renderComponent';
import childComponent from '@bitsy-ui/core/lib/Helpers/childComponent';

// Enable code splitting by returning with loadable
export const Components = {
  ExampleComponent,
};

export const Hydrate = hydrateComponent(hydrate, Components);
export const Render = renderComponent(render, Components);
export const Child = childComponent(Components);
```

### Launch Dev Environment

Build the bitsy UI assets ``yarn run bitsy-ui build``

Navigate to the SSR of the example component ``http://localhost:9000/ExampleComponent``
