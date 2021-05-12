import { BitsyUIConfig } from '../../Types';

const getCombinedConfig = (baseConfig, ...configs): BitsyUIConfig => {
  return configs.filter(Boolean).reduce((curr, config) => {
    // Progressively build the config
    const settings = Object.entries(config.settings).reduce((_curr, [key, data]) => {
      // retrieve the current settings value
      const _val = _curr[key] || {};
      // retrieve the new settings value
      const _data = typeof data === 'object' ? data : {};
      // merge the two values together
      return { ..._curr, [key]: { ..._val, ..._data } };
    }, curr.settings);
    return { ...curr, ...config, settings };
  }, baseConfig);
};

export default getCombinedConfig;
