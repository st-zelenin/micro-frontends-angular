const webpack = require('webpack');
const CustomModuleIdsPlugin = require('custom-module-ids-webpack-plugin');

module.exports = {
  output: {
    chunkFilename: 'app-a-[id].js'
  },
  optimization: {
    concatenateModules: false,
    providedExports: false,
    usedExports: false
  },
  plugins: [
    new CustomModuleIdsPlugin({
      idFunction: function(libIdent, module) {
        if (String(libIdent).startsWith('./node_modules/')) {
          return libIdent;
        }

        console.log(libIdent, `app-a-${libIdent}`);
        return `app-a-${libIdent}`;
      }
    })
  ]
};
