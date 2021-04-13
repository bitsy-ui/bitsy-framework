import { BitsyUIConfig } from '../Types';
import getCombinedURL from '../Helpers/getCombinedURL';

const getUiPublicPath = (config: BitsyUIConfig) => getCombinedURL(config.settings.ui.publicPath);

export default getUiPublicPath;
