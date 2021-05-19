type BitsyUIConfig = {
  name: string;
  settings: {
    bootstrap: {
      webpackConfig: string;
      babelConfig: string;
      filePattern: string;
      fileEntry: string;
      fileExtensions: string[];
      publishDir: string;
      hostname: void | string;
      publicPath: string;
      script: string;
      headers?: { [k: string]: any };
      options?: { [k: string]: any };
    };
    ui: {
      script: string;
      hostname: void | string;
      publicPath: string;
      manifest: string;
      publishDir: string;
      babelConfig: string;
      webpackConfig: string;
      buildEntry: string;
      filePattern: string;
      fileExtensions: string[];
      aliasDirs: { [k: string]: any };
      env: { [k: string]: any };
      options: { [k: string]: any };
    };
    api: {
      hostname: void | string;
      publicPath: string;
      publishDir: string;
      babelConfig: string;
      fileExtensions: string[];
      fileEntry: string;
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
