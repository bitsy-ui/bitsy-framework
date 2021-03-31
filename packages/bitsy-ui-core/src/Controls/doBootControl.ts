const doBootControl = (api, config, logger) => (onNotFound = (req, res) => {}) => {
  // If a not found handler was passed through
  // Attach the not found to our api object
  if (onNotFound) api.use(onNotFound);
  // Start the server listening on the provided port
  api.listen(config.settings.api.port);
  // Log that something happened
  logger.info(config.settings.api.messages?.STARTED_UP, config.settings.api.port);
};

export default doBootControl;
