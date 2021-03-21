module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/env",
        {
          "targets": {
            "node": "current"
          }
        },
      ],
      "@babel/preset-typescript",
    ],
    env: {
      build: {
        ignore: [
          "**/*.test.tsx",
          "**/*.test.ts",
          "__tests__",
        ],
      },
    },
    ignore: ["node_modules"],
  };
};
