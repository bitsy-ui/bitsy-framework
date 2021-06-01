import fs from 'fs';
import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';
import getCombinedURL from '@bitsy-ui/common/lib/Helpers/getCombinedURL';
import getBootstrapAsset from '../Selectors/getBootstrapAsset';
import getBootstrapEnv from '../Helpers/getBootstrapEnv';

type DoBootstrapHandler = (config: BitsyUIConfig) => (request: any, reply: any) => Promise<void>;

/**
 * Dynamic Javascript Handler
 * Outputs a JS file which has values injected at runtime
 * This supports server side environment vars to be safely communicated to the frontend components
 * @param config
 */
const doBootstrapHandler: DoBootstrapHandler = (config) => async (request, reply) => {
  // Deconstruct the important values from the bitsy ui config
  const {
    settings: { bootstrap, ui },
  } = config;
  // Retrieve the manifest file contents
  const manifestData = fs.readFileSync(ui.manifest, 'utf8');
  // Replace the bootstrap JS placeholder tokens with permitted environment variables
  // This will be used by bootstrap and communicated within the window space to the built micro UI assets
  const contents = fs
    // Read the contents of the bootstrap js file
    // this would have been built within the bootstrap library
    .readFileSync(getBootstrapAsset(config), 'utf8')
    // replace the manifest token with the manifest data
    .replace(/__MANIFEST__/g, manifestData)
    // replace the env token with the env data
    .replace(/__ENV__/g, JSON.stringify(getBootstrapEnv(request, config)));
  // Determine the correct api and asset values based on
  // Inject any additional headers
  Object.entries(bootstrap?.headers || {}).forEach(([key, value]) => {
    // Set the additional header
    reply.header(key, value as string);
  });
  // Return a status of 200
  reply.code(200);
  // Send the rendered JS file
  reply.send(contents);
};

export default doBootstrapHandler;
