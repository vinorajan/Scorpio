const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
                  options: { configFileName:  path.resolve(__dirname, 'tsconfig.json') }
                } , 'angular2-template-loader'],
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.css$/,
      include: path.resolve(rootDir, 'src/assets'),
      loader: ExtractTextPlugin.extract({use:[{loader:'css-loader'}], fallback: 'style-loader' })
    },
    {
      test: /\.css$/,
      include: path.resolve(rootDir, 'src/app'),
      loader: 'raw-loader'
    },{
      test: /\.(png|jpg|jpe?g|gif|svg|ico)$/,
      include: path.resolve(rootDir, 'src/assets'),
      loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
    },
    {
      test: /\.(woff|woff2|ttf|eot)$/,
      include: path.resolve(rootDir, 'src/assets'),
      loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
    }]
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
      path.resolve(rootDir, '/src')
    )
    ]
};