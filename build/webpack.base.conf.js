'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
const SpeedMeasure = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasure();

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // use: ['cache-loader','vue-loader'],
        // loaders: ['cache-loader','vue-loader'],
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: ['cache-loader','babel-loader'],
        // loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
		  test: /\.sass$/,
      loaders: ['style', 'css', 'sass'],
      include: [resolve('src')]
	  },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        },
        include: [resolve('src')]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        },
        include: [resolve('src')]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        },
        // include: [resolve('src')]
      }
    ]
  }
}

// webpackConfig = smp.wrap(webpackConfig)

module.exports = smp.wrap(vuxLoader.merge(webpackConfig, {
  plugins: [
    'vux-ui',
    'progress-bar',
    {
      name: 'duplicate-style',
      options: {
        cssProcessorOptions : {
          safe: true,
          zindex: false,
          autoprefixer: {
            add: true,
            browsers: [
              'iOS >= 7',
              'Android >= 4.1'
            ]
          }
        }
      }
    }
  ]
})
)
const themeConfig={
  name: 'less-theme',
  path: 'src/assets/less/theme.less'
};
// module.exports = vuxLoader.merge(webpackConfig, {
//   plugins:['vux-ui', themeConfig]
// });


