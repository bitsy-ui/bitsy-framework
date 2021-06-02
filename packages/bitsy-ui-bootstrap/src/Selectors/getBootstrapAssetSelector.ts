import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';

const getBootstrapAssetSelector = (config: BitsyUIConfig) => config.settings.bootstrap.script;

export default getBootstrapAssetSelector;
