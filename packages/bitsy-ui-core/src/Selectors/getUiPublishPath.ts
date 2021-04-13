import { BitsyUIConfig } from '../Types';

const getUiPublishPath = (config: BitsyUIConfig) => config.settings.ui.publishDir;

export default getUiPublishPath;
