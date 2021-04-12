import { BitsyUIConfig } from '../Types';

const getBootstrapAsset = (config: BitsyUIConfig) => config.settings.bootstrap?.asset || '';

export default getBootstrapAsset;
