const addEndpoint = (api, config, logger) => (path, method, handler) => {
  // Retrieve the method
  const _method = method.toLowerCase();
  // Retrieve the api prefix
  const _prefix = config.settings.api?.prefix || '';
  // Wrap the handler in
  api[_method](
    `${_prefix}${path}`,
    // Execute the provided route handler
    (req, res) => handler({ req, res, logger, config, method }),
  );
};

export default addEndpoint;
