import { BitsyUIConfig } from '../Types';
import getCombinedURL from '@bitsy-ui/common/lib/Helpers/getCombinedURL';

const getBootstrapPath = (config: BitsyUIConfig) => '/bootstrap.js' || '/bootstrap.js';

export default getBootstrapPath;
