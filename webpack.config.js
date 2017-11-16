const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, './src/app.js')],
    background: ['babel-polyfill', path.resolve(__dirname, './src/background.js')],
    content: ['babel-polyfill', path.resolve(__dirname, './src/content.js')],
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader' ] ,
        }),
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname, './src/manifest.json'), to: path.resolve(__dirname, './dist') },
      { from: path.resolve(__dirname, './src/icons'), to: path.resolve(__dirname, './dist/icons') },
      { from: path.resolve(__dirname, './src/**/*.html'), to: path.resolve(__dirname, './dist'), context: 'src' },
    ]),
    new ExtractTextPlugin('app.css'),
  ],
};