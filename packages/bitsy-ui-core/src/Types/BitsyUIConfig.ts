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
      publicPath: string;
      script: string;
      headers?: { [k: string]: any };
      options?: { [k: string]: any };
    };
    ui: {
      script: string;
      publicPath: string;
      manifest: string;
      publishDir: string;
      babelConfig: string;
      webpackConfig: string;
      fileEntry: string;
      filePattern: string;
      fileExtensions: string[];
      aliasDirs: { [k: string]: any };
      env: { [k: string]: any };
      options: { [k: string]: any };
    };
    api: {
      publicPath: string;
      publishDir: string;
      babelConfig: string;
      fileExtensions: string[];
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
