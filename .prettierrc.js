/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: true,
  experimentalTernaries: true,

  importOrder: ['^react$', '^react-native(-.*)?$', '<THIRD_PARTY_MODULES>', 'expo-brother-printer-sdk', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: ['@trivago/prettier-plugin-sort-imports'],
};

module.exports = config;
