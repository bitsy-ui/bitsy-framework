import doStrapHandler from '../Handlers/doStrapHandler';

const addStrapControl = (api, config, logger) => (name, component) => {
  // Retrieve the the api prefix
  const _prefix = config.settings.api?.prefix || '';
  // Handle a GET request to fetch a component
  api.get(`${_prefix}/${name}`, doStrapHandler({ name, component, logger, config }));
  // Handle a POST request to fetch a component
  api.post(`${_prefix}/${name}`, doStrapHandler({ name, component, logger, config }));
};

export default addStrapControl;
