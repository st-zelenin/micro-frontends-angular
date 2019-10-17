// const webpack = require('webpack');
// const CustomModuleIdsPlugin = require('custom-module-ids-webpack-plugin');

module.exports = {
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
