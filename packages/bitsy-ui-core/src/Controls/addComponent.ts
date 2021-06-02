import doComponentHandler from '../Handlers/doComponentHandler';
import getCombinedURL from '@bitsy-ui/common/lib/Helpers/getCombinedURL';

const addComponent = (api, config, logger) => (name, component) => {
  // Retrieve the the api prefix
  const _prefix = config.settings.api?.prefix || '';
  // Handle a GET request to fetch a component
  api.get(getCombinedURL('/', _prefix, name), doComponentHandler({ name, component, logger, config }));
  // Handle a POST request to fetch a component
  api.post(getCombinedURL('/', _prefix, name), doComponentHandler({ name, component, logger, config }));
};

export default addComponent;
