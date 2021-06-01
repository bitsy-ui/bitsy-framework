import { BitsyUIConfig } from '../Types';
import getCombinedURL from '@bitsy-ui/common/lib/Helpers/getCombinedURL';

const getUiPublicPath = (config: BitsyUIConfig) => getCombinedURL(config.settings.ui.publicPath);

export default getUiPublicPath;
