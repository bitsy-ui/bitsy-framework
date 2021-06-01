import 'core-js/stable';
import 'regenerator-runtime/runtime';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
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
    const api = fastify();
    // Set up the ability to serve static assets
    api.register(fastifyStatic, {
      root: getUiPublishPath(config),
      prefix: getUiPublicPath(config),
      preCompressed: true,
    });
    // Setting up middlewares
    // api.use(cors(config.settings.api.cors));
    // Hydrate and output the bootstrapper script
    // @TODO should we somehow cache this after the first request
    api.get(getBootstrapPath(config), doBootstrapHandler(config));
    // Returns the instance of the server, the strapper the booter, the config and the logger
    return {
      api,
      strap: addStrapControl(api, config, logger),
      route: addRouteControl(api, config, logger),
      boot: doBootControl(api, config, logger),
      config,
      logger,
      fastify,
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
