import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express, { json } from 'express';
import cors from 'cors';
import compression from 'compression';
import doBootstrapHandler from './Handlers/doBootstrapHandler';
import addRouteControl from './Controls/addRouteControl';
import addStrapControl from './Controls/addStrapControl';
import doBootControl from './Controls/doBootControl';
import getBootstrapPath from './Selectors/getBootstrapPath';
import getUiPublishPath from './Selectors/getUiPublishPath';
import getUiPublicPath from './Selectors/getUiPublicPath';
import type BitsyUIConfig from './Types/BitsyUIConfig';
import type BitsyUiLogger from './Types/BitsyUiLogger';

const createBitsyUI = ({
  config,
  logger = console,
  onError = (e) => {},
}: {
  config: BitsyUIConfig;
  logger?: BitsyUiLogger;
  onError?: (e) => void;
}) => {
  // Attempt to start the express server
  try {
    // Saying hello
    logger.info(config.settings.api.messages?.START_UP);
    // Create a new express instance
    const api = express();
    // Setting up middlewares
    api.use(json());
    api.use(cors(config.settings.api.cors));
    api.use(compression());
    // Serve static assets
    api.use(getUiPublicPath(config), express.static(getUiPublishPath(config)));
    // Hydrate and output the bootstrapper script
    api.get(getBootstrapPath(config), doBootstrapHandler(config));
    // Returns the instance of the server, the strapper the booter, the config and the logger
    return {
      api,
      strap: addStrapControl(api, config, logger),
      route: addRouteControl(api, config, logger),
      boot: doBootControl(api, config, logger),
      config,
      logger,
      express,
    };
    // If the application throws an error
    // We catch and log for debugging
  } catch (e) {
    // If an on error was provided
    if (onError) onError(e);
    // Log out the thrown error
    logger.error(config.settings.api.messages?.FATAL, e.message);
  }
};

export default createBitsyUI;
