import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';
import getCombinedPath from '@bitsy-ui/common/lib/Helpers/getCombinedPath';

const getBootstrapPathSelector = (config: BitsyUIConfig) =>
  getCombinedPath(config.settings.bootstrap.publicPath, '/bootstrap.js');

export default getBootstrapPathSelector;
