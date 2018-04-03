/**
 * Created on 2018/3/15.
 */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: {
    index: './src/index.js'
  },
  plugins: [
    new UglifyJSPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use : ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: 'index.js',
    // chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'react-area-selector',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  }
};