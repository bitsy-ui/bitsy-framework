import doComponentHandler from '../Handlers/doComponentHandler';
import getCombinedPath from '@bitsy-ui/common/lib/Helpers/getCombinedPath';

const addComponent = (api, config, logger) => (name, component) => {
  // Retrieve the the api prefix
  const _prefix = config.settings.api?.prefix || '';
  // Handle a GET request to fetch a component
  api.get(getCombinedPath('/', _prefix, name), doComponentHandler({ name, component, logger, config }));
  // Handle a POST request to fetch a component
  api.post(getCombinedPath('/', _prefix, name), doComponentHandler({ name, component, logger, config }));
};

export default addComponent;
