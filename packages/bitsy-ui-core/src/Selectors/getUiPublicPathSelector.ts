import getCombinedPath from '@bitsy-ui/common/lib/Helpers/getCombinedPath';
import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';

const getUiPublicPathSelector = (config: BitsyUIConfig) => getCombinedPath(config.settings.ui.publicPath);

export default getUiPublicPathSelector;
