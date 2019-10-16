// const webpack = require('webpack');
// const CustomModuleIdsPlugin = require('custom-module-ids-webpack-plugin');

module.exports = {
  output: {
    chunkFilename: 'app-b-[id].js',
    libraryTarget: 'umd'
  },
  optimization: {
    concatenateModules: false,
    providedExports: false,
    usedExports: false
  },
  // plugins: [
  //   new CustomModuleIdsPlugin({
  //     idFunction: function(libIdent, module) {
  //       if (String(libIdent).startsWith('./node_modules/')) {
  //         return libIdent;
  //       }

  //       console.log(libIdent, `app-b-${libIdent}`);
  //       return `app-b-${libIdent}`;
  //     }
  //   })
  // ],

  externals: {
    rxjs: 'rxjs',
    '@angular/common': 'ng.common',
    '@angular/core': 'ng.core',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/router': 'ng.router'
  }
};
