import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express, { json, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import doBootstrapHandler from './Handlers/doBootstrapHandler';
import doStrapHandler from './Handlers/doStrapHandler';
import type MicroUIConfig from './Types/MicroUIConfig';
import type MicroUiLogger from './Types/MicroUiLogger';

const createMicroUIService = ({ config, logger = console }: { config: MicroUIConfig; logger?: MicroUiLogger }) => {
  // Attempt to start the express server
  try {
    // Saying hello
    logger.info(config.settings.api.messages?.START_UP);
    // Create a new express instance
    const api = express();
    // Setting up middlewares
    api.use(json());
    api.use(helmet());
    api.use(cors(config.settings.api.cors));
    api.use(compression());
    // Serve static assets
    api.use(express.static('./.assets'));
    // Hydrate and output the bootstrapper script
    api.get(`${config.settings.api?.prefix || ''}/bootstrap.js`, doBootstrapHandler(config));
    // Adds a route to a router of sorts
    const route = (path, method, handler) => {
      // Sanity check to ensure only valid methods are passed
      if (!['get', 'post', 'all'].includes(method.toLowerCase())) {
        throw new Error('METHOD_NOT_SUPPORTED');
      }
      // Wrap the handler in
      api[method.toLowerCase()](`${config.settings.api?.prefix || ''}${path}`, (req: Request, res: Response) =>
        handler({ req, res, logger, config, method }),
      );
    };
    // Straps a component into the SSR api
    const strap = (name, component) => {
      // Handle a GET request to fetch a component
      api.get(`${config.settings.api?.prefix || ''}/${name}`, doStrapHandler({ name, component, logger, config }));
      // Handle a POST request to fetch a component
      api.post(`${config.settings.api?.prefix || ''}/${name}`, doStrapHandler({ name, component, logger, config }));
    };
    // Boots up the server
    const boot = () => {
      // Start the server listening on the provided port
      api.listen(config.settings.api.port);
      // Log that something happened
      logger.info(config.settings.api.messages?.STARTED_UP, config.settings.api.port);
    };
    // Returns the instance of the server, the strapper the booter, the config and the logger
    return { api, strap, boot, route, config, logger, express };
    // If the application throws an error
    // We catch and log for debugging
  } catch (e) {
    // Log out the thrown error
    logger.error(config.settings.api.messages?.FATAL, e.message);
  }
};

export default createMicroUIService;
