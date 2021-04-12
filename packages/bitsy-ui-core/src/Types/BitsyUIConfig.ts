type BitsyUIConfig = {
  name: string;
  settings: {
    bootstrap: {
      path: string;
      entry: string;
      asset: string;
      destination: string;
      headers?: { [k: string]: any };
      options?: { [k: string]: any };
    };
    ui: {
      url: string;
      path: string;
      main: string;
      entry: string;
      output: string;
      manifest: string;
      destination: string;
      babelConfig: string;
      webpackConfig: string;
      public: string;
      extensions: string;
      aliases: { [k: string]: any };
      env: { [k: string]: any };
      options?: { [k: string]: any };
    };
    api: {
      url: string;
      prefix: string;
      path: string;
      port: string | number;
      ssr?: {
        headers?: { [k: string]: any };
      };
      cors?: { [k: string]: any };
      env?: { [k: string]: any };
      messages?: { [k: string]: string };
      options?: { [k: string]: any };
    };
  };
};

export default BitsyUIConfig;
