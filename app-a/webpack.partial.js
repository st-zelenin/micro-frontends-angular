const webpack = require('webpack');
const CustomModuleIdsPlugin = require('custom-module-ids-webpack-plugin');

module.exports = {
  output: {
    chunkFilename: 'app-a-[id].js'
    // libraryTarget: 'umd'
  },
  optimization: {
    // concatenateModules: false,
    // providedExports: false,
    // usedExports: false,
  },
  // plugins: [
  //   new CustomModuleIdsPlugin({
  //     idFunction: function(libIdent, module) {
  //       if (String(libIdent).startsWith('./node_modules/')) {
  //         return libIdent;
  //       }

  //       console.log(libIdent, `app-a-${libIdent}`);
  //       return `app-a-${libIdent}`;
  //     }
  //   })
  // ],

  // externals: [
  //   /^@angular\/router$/
  // ],

  // externals: [/^@angular\/.*/, { rxjs: 'rxjs' }]

  // externals: [
  //   function(context, request, callback) {
  //     console.log(request)
  //     if (/^@angular\/.*/.test(request)){
  //       console.log(request)

  //       return callback(null, 'amd ' + request);
  //     }
  //     callback();
  //   }
  // ]

  externals: {
    'rxjs': 'rxjs',
    '@angular/common': 'ng.common',
    '@angular/core': 'ng.core',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/router': 'ng.router',
  }
};
