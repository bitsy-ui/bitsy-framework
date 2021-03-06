import path from 'path';
import { createElement } from 'react';
import embedComponent from '../Helpers/embedComponent';
import type BitsyUIConfig from '../Types/BitsyUIConfig';
import type BitsyUiLogger from '../Types/BitsyUiLogger';

// Direct Import React
// We have to do it this way to permit SSR react + hooks
// tslint:disable-next-line
const ReactDOMServer = require(path.join(process.cwd(), 'node_modules', 'react-dom', 'server'));

const doStrapHandler = ({
  name,
  component,
  logger,
  config,
}: {
  name: string;
  component: any;
  logger: BitsyUiLogger;
  config: BitsyUIConfig;
}) => async (req, res) => {
  // This is needed to stop issues with window and document throwing errors in SSR
  (global as any).window = {};
  (global as any).document = {};
  // Extract and construct the component props from the provided POST and GET variables
  const httpQuery = !req.query ? {} : req.query;
  const httpBody = !req.body ? {} : req.body;
  let props = { ...httpQuery, ...httpBody };
  const strapHeaders = config?.settings?.api?.ssr?.headers || {};
  // Attempt to construct a static HTML representation of the component
  // Do this using provided POST and GET parameters
  try {
    // Determine URL via request object
    // Determine the request protocol
    const protocol = req.secure ? 'https://' : 'http://';
    // We do this to allow bitsyui to be hosted within multiple URLs
    const hostname = req.headers.host;
    // If the component has a SSR props helper
    if (component.getSSRProps) props = await component.getSSRProps(props);
    // Create the react element
    const el = createElement(component, props);
    // Attempt to render the component's HTML using react's ReactDOMServer
    const rendered = ReactDOMServer.renderToString(el);
    const html = embedComponent(name, protocol, hostname, config, props, rendered);
    // Set express to return the component as the response body
    res.set('Content-Type', 'text/html');
    // Inject any additional headers
    Object.entries(strapHeaders).forEach(([key, value]) => {
      // Set the additional header
      res.set(key, value as string);
    });
    res.status(200);
    res.send(html);
  } catch (e) {
    // Log the error which the renderer encountered
    // @TODO should the error generator be a callback that can be provided to allow better customisation?
    logger.error({ type: 'COMPONENT_RENDER_ERROR', component: name, message: e.message, props });
    // Return a simple error message to the client
    // @TODO should this contain more information?
    // @TODO should this be within the config?
    res.set('Content-Type', 'text/html');
    res.status(500);
    res.send('Component Error');
  }
};

export default doStrapHandler;
