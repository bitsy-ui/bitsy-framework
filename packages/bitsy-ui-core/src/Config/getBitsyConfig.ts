import process from "process";
import path from "path";
import getCombinedBitsyConfig from "./Helpers/getCombinedBitsyConfig";
import defaultBitsyConfig from './bitsyui.default.config.js';

const getBitsyConfig = () => {
  // Determine the location of the bitsyui config
  const configPathname = path.resolve(process.cwd(), 'bitsyui.config.js');
  // @TODO if no config exists then just return the default config
  // Load the bitsyui config file
  // This will always be located at the project root
  const projectConfigFile = require(configPathname);
  // Retrieve the combined config
  // This should use the default config as a base
  return getCombinedBitsyConfig(defaultBitsyConfig, projectConfigFile);
};

export default getBitsyConfig;
