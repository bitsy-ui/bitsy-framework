import getCombinedURL from '@bitsy-ui/common/lib/Helpers/getCombinedURL';
import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';

const getUiPublicPathSelector = (config: BitsyUIConfig) => getCombinedURL(config.settings.ui.publicPath);

export default getUiPublicPathSelector;
