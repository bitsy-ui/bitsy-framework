import { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import renderStaticComponent from '../Helpers/renderStaticComponent';
import renderEmbeddableComponent from '../Helpers/renderEmbeddableComponent';
import type BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';
import type BitsyUiLogger from '@bitsy-ui/common/lib/Types/BitsyUiLogger';

const doComponentHandler =
  ({
    name,
    component,
    logger,
    config,
  }: {
    name: string;
    component: any;
    logger: BitsyUiLogger;
    config: BitsyUIConfig;
  }) =>
  async (request, reply) => {
    // This is needed to stop issues with window and document throwing errors in SSR
    (global as any).window = {};
    (global as any).document = {};
    // Extract and construct the component props from the provided POST and GET variables
    const httpQuery = !request.query ? {} : request.query;
    const httpBody = !request.body ? {} : request.body;
    let props = { ...httpQuery, ...httpBody };
    const strapHeaders = config?.settings?.api?.ssr?.headers || {};
    // Attempt to construct a static HTML representation of the component
    // Do this using provided POST and GET parameters
    try {
      // Determine URL via request object
      // Determine the request protocol
      const protocol = `${request.protocol}://`;
      // We do this to allow bitsyui to be hosted within multiple URLs
      const hostname = request.hostname;
      // If the component has a SSR props helper
      if (component.getSSRProps) props = await component.getSSRProps(props);
      // Create the react element
      const el = createElement(component, props);
      // Attempt to render the component's HTML using react's ReactDOMServer
      const rendered = ReactDOMServer.renderToString(el);
      // If htmlOnly props has been passed we want to return only the HTML
      // otherwise we wanted to return the embeddable component
      const html = props.htmlOnly
        ? renderStaticComponent(name, config, props, rendered)
        : renderEmbeddableComponent(name, protocol, hostname, config, props, rendered);
      // Set express to return the component as the response body
      reply.header('Content-Type', 'text/html');
      // Inject any additional headers
      Object.entries(strapHeaders).forEach(([key, value]) => {
        // Set the additional header
        reply.header(key, value as string);
      });
      reply.code(200);
      reply.send(html);
    } catch (e) {
      // Log the error which the renderer encountered
      // @TODO should the error generator be a callback that can be provided to allow better customisation?
      logger.error({ type: 'COMPONENT_RENDER_ERROR', component: name, message: e.message, props });
      // Return a simple error message to the client
      // @TODO should this contain more information?
      // @TODO should this be within the config?
      reply.header('Content-Type', 'text/html');
      reply.code(500);
      reply.send('Component Error');
    }
  };

export default doComponentHandler;
