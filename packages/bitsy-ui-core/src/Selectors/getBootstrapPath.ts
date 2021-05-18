import { BitsyUIConfig } from '../Types';
import getCombinedURL from '../Helpers/getCombinedURL';

const getBootstrapPath = (config: BitsyUIConfig) =>
  getCombinedURL('/', config.settings.bootstrap?.publicPath, 'bootstrap.js') || '/bootstrap.js';

export default getBootstrapPath;
