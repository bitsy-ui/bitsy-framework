type BootstrapEnv = {
  name: string;
  bootstrap: {
    host: string;
    path: string;
    url: string;
    options: { [k: string]: any };
  };
  api: {
    host: string;
    path: string;
    url: string;
    options: { [k: string]: any };
  };
  ui: {
    host: string;
    path: string;
    url: string;
    script: string;
    env: { [k: string]: any };
    options: { [k: string]: any };
  };
};

export default BootstrapEnv;
