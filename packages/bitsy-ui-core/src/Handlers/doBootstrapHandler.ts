import fs from 'fs';
import { Request, Response } from 'express';
import { BitsyUIConfig } from '../Types';
import getBootstrapAsset from '../Selectors/getBootstrapAsset';
import getCombinedURL from '../Helpers/getCombinedURL';

type DoBootstrapHandler = (config: BitsyUIConfig) => (req: Request, res: Response) => Promise<void>;

/**
 * Dynamic Javascript Handler
 * Outputs a JS file which has values injected at runtime
 * This supports server side environment vars to be safely communicated to the frontend components
 * @param config
 */
const doBootstrapHandler: DoBootstrapHandler = (config) => async (req, res) => {
  // Deconstruct the important values from the bitsy ui config
  const {
    name,
    settings: { bootstrap, ui, api },
  } = config;
  // Retrieve the manifest file contents
  const manifestData = fs.readFileSync(ui.manifest, 'utf8');
  // Determine the request protocol
  const protocol = req.secure ? 'https://' : 'http://';
  // Determine URL via request object
  // We do this to allow bitsyui to be hosted within multiple URLs
  const hostname = req.headers.host;
  // Replace the bootstrap JS placeholder tokens with permitted environment variables
  // This will be used by bootstrap and communicated within the window space to the built micro UI assets
  const contents = fs
    // Read the contents of the bootstrap js file
    // this would have been built within the bootstrap library
    .readFileSync(getBootstrapAsset(config), 'utf8')
    // replace the manifest token with the manifest data
    .replace(/__MANIFEST__/g, manifestData)
    // replace the env token with the env data
    .replace(
      /__ENV__/g,
      JSON.stringify({
        name,
        bootstrap: {
          host: protocol + hostname,
          path: bootstrap.path,
          url: protocol + getCombinedURL(hostname, bootstrap.path, 'bootstrap.js'),
          options: bootstrap.options || {},
        },
        api: {
          host: protocol + hostname,
          path: api.path,
          url: protocol + getCombinedURL(hostname, api.path),
          options: api.options || {},
        },
        ui: {
          host: protocol + hostname,
          path: api.path,
          url: protocol + getCombinedURL(hostname, ui.path),
          main: ui.main,
          env: ui.env || {},
          options: ui.options || {},
        },
      }),
    );
  // Determine the correct api and asset values based on
  // Inject any additional headers
  Object.entries(bootstrap?.headers || {}).forEach(([key, value]) => {
    // Set the additional header
    res.set(key, value as string);
  });
  // Return a status of 200
  res.status(200);
  // Send the rendered JS file
  res.send(contents);
};

export default doBootstrapHandler;
