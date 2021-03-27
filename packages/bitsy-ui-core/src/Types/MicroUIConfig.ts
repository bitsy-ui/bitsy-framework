type MicroUIConfig = {
  name: string;
  settings: {
    ui: {
      target: string;
      url: string;
      manifest: string;
      entry: string;
      env?: { [k: string]: any };
    };
    api: {
      url: string;
      prefix: string;
      path: string;
      port: string | number;
      bootstrap?: {
        headers?: { [k: string]: any };
      };
      ssr?: {
        headers?: { [k: string]: any };
      };
      cors?: { [k: string]: any };
      env?: { [k: string]: any };
      messages?: { [k: string]: string };
    };
  };
};

export default MicroUIConfig;
