import 'core-js/stable';
import 'regenerator-runtime/runtime';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import addRouteControl from './Controls/addRouteControl';
import addStrapControl from './Controls/addStrapControl';
import doBootControl from './Controls/doBootControl';
import getUiPublishPath from './Selectors/getUiPublishPath';
import getUiPublicPath from './Selectors/getUiPublicPath';
import getBootstrapPath from '@bitsy-ui/bootstrap/lib/Selectors/getBootstrapPath';
import doBootstrapHandler from '@bitsy-ui/bootstrap/lib/Handlers/doBootstrapHandler';
import type BitsyUiLogger from './Types/BitsyUiLogger';
import type BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';

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
