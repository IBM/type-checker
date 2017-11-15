const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    action: path.resolve(__dirname, './src/action.js'),
    content: path.resolve(__dirname, './src/content.js'),
    background: path.resolve(__dirname, './src/background.js'),
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
    ]),
    new ExtractTextPlugin('app.css'),
  ],
};