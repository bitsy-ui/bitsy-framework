import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import createBitsyUI from '@bitsy-ui/core/lib/createBitsyUI';
import ExampleComponent from '@src/Components/ExampleComponent';

// Retrieve the local config
const bitsyUIConfig = require(path.join(process.cwd(), 'bitsyui.config.js'));

const { boot, strap } = createBitsyUI({ config: bitsyUIConfig });

strap('ExampleComponent', ExampleComponent);

boot((req, res) => {
  res.send({ notFound: true });
});
