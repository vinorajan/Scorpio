const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    app:'./src/app/main.ts',
    polyfills:"./src/polyfills.ts"
    },
  resolve: {
    extensions: ['.js', '.ts','.css']
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader', 'angular2-template-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.(png|jpg|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      exclude:path.resolve(rootDir,'node_modules'),
      loader: 'url-loader?name=[name].[ext]&outputPath=assets/img/'
    },
    {
      test: /\.css$/,
      exclude: path.resolve(rootDir, 'src/app'),
      loader: 'css-loader!style-loader'
    },
    {
      test: /\.css$/,
      include: path.resolve(rootDir, 'src/app'),
      loader: 'raw-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'polyfills']
    }),
    ]
};