import doNotFoundHandler from '../Handlers/doNotFoundHandler';

const doBootControl =
  (api, config, logger) =>
  (onNotFound = doNotFoundHandler) => {
    // Attach the not found to our api object
    // api.use(onNotFound);
    // Start the server listening on the provided port
    api.listen(config.settings.api.port);
    // Log that something happened
    logger.info(config.settings.api.messages?.STARTED_UP, config.settings.api.port);
  };

export default doBootControl;
