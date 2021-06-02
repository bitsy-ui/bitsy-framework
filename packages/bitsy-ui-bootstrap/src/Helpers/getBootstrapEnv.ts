import getCombinedURL from '@bitsy-ui/common/lib/Helpers/getCombinedURL';

const getBootstrapEnv = (config, { protocol, hostname }) => {
  // Deconstruct the important values from the bitsy ui config
  const {
    name,
    settings: { bootstrap, ui, api },
  } = config;
  // Return the built bootstrap env
  return {
    name,
    bootstrap: {
      host: bootstrap.hostname ? bootstrap.hostname : protocol + hostname,
      path: bootstrap.publicPath,
      url: bootstrap.hostname
        ? getCombinedURL(bootstrap.hostname, bootstrap.publicPath, 'bootstrap.js')
        : getCombinedURL(protocol, hostname, bootstrap.publicPath, 'bootstrap.js'),
      options: bootstrap.options || {},
    },
    api: {
      host: api.hostname ? api.hostname : protocol + hostname,
      path: api.publicPath,
      url: api.hostname
        ? getCombinedURL(api.hostname, api.publicPath)
        : getCombinedURL(protocol, hostname, api.publicPath),
      options: api.options || {},
    },
    ui: {
      host: ui.hostname ? ui.hostname : protocol + hostname,
      path: ui.publicPath,
      url: ui.hostname ? getCombinedURL(ui.hostname, ui.publicPath) : getCombinedURL(protocol, hostname, ui.publicPath),
      script: ui.script,
      env: ui.env || {},
      options: ui.options || {},
    },
  };
};

export default getBootstrapEnv;
