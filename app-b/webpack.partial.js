// const webpack = require('webpack');
// const CustomModuleIdsPlugin = require('custom-module-ids-webpack-plugin');

module.exports = {
  entry: {
    'app-b': './src/main-b.ts'
  },
  output: {
    jsonpFunction: 'webpackJsonp-app-b',
    library: 'appB',
    chunkFilename: 'app-b-[id].js',
    // libraryTarget: 'umd'
  },
  optimization: {
    // concatenateModules: false,
    // providedExports: false,
    // usedExports: false
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
    'zone.js/dist/zone': 'Zone',
    rxjs: 'rxjs',
    '@angular/common': 'ng.common',
    '@angular/core': 'ng.core',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/router': 'ng.router'
  }
};
