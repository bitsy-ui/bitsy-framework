import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import createBitsyUI from '@bitsy-ui/core/lib/createBitsyUI';
import ExampleComponent from '@src/Components/ExampleComponent';
import getBitsyConfig from "@bitsy-ui/core/lib/Config/getBitsyConfig";

const config = getBitsyConfig();

const { boot, strap } = createBitsyUI({ config });

strap('ExampleComponent', ExampleComponent);

boot((req, res) => {
  res.send({ notFound: true });
});
