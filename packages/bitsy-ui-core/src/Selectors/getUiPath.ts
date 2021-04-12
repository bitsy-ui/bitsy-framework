import { BitsyUIConfig } from '../Types';
import getCombinedURL from '../Helpers/getCombinedURL';

const getUiPath = (config: BitsyUIConfig) => getCombinedURL(config.settings.ui?.path) || '';

export default getUiPath;
