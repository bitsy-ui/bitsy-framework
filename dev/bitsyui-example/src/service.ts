import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import createBitsyUI from '@bitsy-ui/core/lib/createBitsyUI';

// Retrieve the local config
const bitsyUIConfig = require(path.join(process.cwd(), 'bitsyui.config.js'));

const { boot } = createBitsyUI({ config: bitsyUIConfig });

boot();
