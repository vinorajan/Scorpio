const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    app:'./src/app/main.ts',
    polyfills:"./src/polyfills.ts",
    vendor:"./src/vendor.ts"
    },
  resolve: {
    extensions: ['.js', '.ts','.css']
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loaders: [{
               loader: 'awesome-typescript-loader',
                  options: { configFileName:  path.resolve(rootDir, 'tsconfig.json') }
                } , 'angular2-template-loader'],
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.css$/,
      include: path.resolve(rootDir, 'src/assets'),
      loader: ExtractTextPlugin.extract({use:[{loader:'css-loader?sourceMap'}], fallback: 'style-loader' })
    },
    {
      test: /\.css$/,
      include: path.resolve(rootDir, 'src/app'),
      loaders: 'raw-loader'
    }/*,{
      test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
      include: path.resolve(rootDir, 'src/assets'),
      loader: 'file-loader?name=[name].[ext]&outputPath=assets/images/&publicPath=assets/images/'
    },
    {
      test: /\.(woff|woff2|ttf|eot)$/,
      include: path.resolve(rootDir, 'src/assets'),
      loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
    }*/]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'polyfills','vendor']
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '/src')
    ),
    new CopyWebpackPlugin([{
      from: 'src/assets/images',
      to: './assets/images'
    }])
  ]
};