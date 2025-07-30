module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        'babel-plugin-dotenv-import',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            '@components': './components',
            '@lib': './lib',
            '@api': './api',
            '@app': './app',
            '@assets': './assets',
            '@ios': './ios',
            '@android': './android',
            '@services': './services',
            '@store': './store',
          },
        },
      ],
    ],
  };
};
