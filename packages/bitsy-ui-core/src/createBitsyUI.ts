import 'core-js/stable';
import 'regenerator-runtime/runtime';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import addEndpoint from './Controls/addEndpoint';
import addComponent from './Controls/addComponent';
import addBoot from './Controls/addBoot';
import getUiPublishDirSelector from './Selectors/getUiPublishDirSelector';
import getUiPublicPathSelector from './Selectors/getUiPublicPathSelector';
import getBootstrapPathSelector from '@bitsy-ui/bootstrap/lib/Selectors/getBootstrapPathSelector';
import doBootstrapHandler from '@bitsy-ui/bootstrap/lib/Handlers/doBootstrapHandler';
import type BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';
import type BitsyUiLogger from '@bitsy-ui/common/lib/Types/BitsyUiLogger';

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
      root: getUiPublishDirSelector(config),
      prefix: getUiPublicPathSelector(config),
      preCompressed: true,
    });
    // Setting up middlewares
    // api.use(cors(config.settings.api.cors));
    // Hydrate and output the bootstrapper script
    // @TODO should we somehow cache this after the first request
    api.get(getBootstrapPathSelector(config), doBootstrapHandler(config));
    // Returns the instance of the server, the strapper the booter, the config and the logger
    return {
      api,
      component: addComponent(api, config, logger),
      endpoint: addEndpoint(api, config, logger),
      boot: addBoot(api, config, logger),
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
