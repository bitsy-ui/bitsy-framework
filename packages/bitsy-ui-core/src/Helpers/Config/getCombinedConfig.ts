import { BitsyUIConfig } from '../../Types';

const getCombinedConfig = (...configs): BitsyUIConfig => {
  return configs.filter(Boolean).reduce((curr, config) => {
    return Object.entries(config).reduce((_curr, [key, data]) => {
      // @TODO allow for config data to be either extend or override
      return { ..._curr, [key]: data };
    }, config);
  }, {});
};

export default getCombinedConfig;
