import { BitsyUIConfig } from '../Types';

const getUiAssets = (config: BitsyUIConfig) => config.settings.ui?.destination || '';

export default getUiAssets;
