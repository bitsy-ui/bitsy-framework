import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { MicroUIConfig } from '../Types';

type DoBootstrapHandler = (config: MicroUIConfig) => (req: Request, res: Response) => Promise<void>;

const doBootstrapHandler: DoBootstrapHandler = ({ name, settings: { ui, api } }) => async (req, res) => {
  // Retrieve the manifest file contents
  const manifestData = fs.readFileSync(ui.manifest, 'utf8');
  // Replace the bootstrap JS placeholder tokens with permitted environment variables
  // This will be used by bootstrap and communicated within the window space to the built micro UI assets
  let contents = fs.readFileSync(
    path.join(process.cwd(), 'node_modules/@bitsy-ui/bootstrap/lib', 'bootstrap.js'),
    'utf8',
  );
  contents = contents.replace(/__MANIFEST__/g, manifestData);
  contents = contents.replace(
    /__ENV__/g,
    JSON.stringify({
      name,
      apiUrl: api.url,
      apiPath: api.path,
      assetUrl: ui.url || api.url,
      assetTarget: ui.target,
      assetEntry: ui.entry,
      ...(ui.env || {}),
    }),
  );
  // WARNING! Try everything we can to make sure the assets are NOT cached
  // This is the worst file to have cached, ensure this file does not cache
  res.set('Content-Type', 'application/javascript');
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.set('Expires', '-1');
  res.set('Pragma', 'no-cache');
  // Determine the correct api and asset values based on
  // Inject any additional headers
  Object.entries(api?.bootstrap?.headers || {}).forEach(([key, value]) => {
    // Set the additional header
    res.set(key, value as string);
  });
  res.status(200);
  res.send(contents);
};

export default doBootstrapHandler;
