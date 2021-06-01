import BitsyUIConfig from '@bitsy-ui/config/lib/Types/BitsyUIConfig';

const getBootstrapAsset = (config: BitsyUIConfig) => config.settings.bootstrap.script;

export default getBootstrapAsset;
