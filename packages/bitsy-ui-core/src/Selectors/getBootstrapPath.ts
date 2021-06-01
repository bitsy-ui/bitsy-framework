import { BitsyUIConfig } from '../Types';
import getCombinedURL from '../Helpers/getCombinedURL';

const getBootstrapPath = (config: BitsyUIConfig) => '/bootstrap.js' || '/bootstrap.js';

export default getBootstrapPath;
