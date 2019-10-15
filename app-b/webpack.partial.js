const webpack = require('webpack');
const CustomModuleIdsPlugin = require('custom-module-ids-webpack-plugin');

module.exports = {
  output: {
    chunkFilename: 'app-b-[id].js'
  },
  plugins: [
    new CustomModuleIdsPlugin({
      idFunction: function(libIdent, module) {
        if (String(libIdent).startsWith('./node_modules/')) {
          return libIdent;
        }

        console.log(libIdent, `app-b-${libIdent}`);
        return `app-b-${libIdent}`;
      }
    })
  ]
};
