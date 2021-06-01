import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';
import getCombinedURL from '@bitsy-ui/common/lib/Helpers/getCombinedURL';

const getBootstrapPath = (config: BitsyUIConfig) =>
  getCombinedURL(config.settings.bootstrap.publicPath, '/bootstrap.js');

export default getBootstrapPath;
