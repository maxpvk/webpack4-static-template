const webpack = require('webpack')
const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')




module.exports = {
  entry: {
    app: ['./src/index.js', './src/assets/stylesheets/index.scss'],
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: ['handlebars-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          //fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /node_modules/,
  //         name: 'vendor',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  plugins: [
    
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin(
      [{ from: 'assets', to: 'assets' }],
      {
        ignore: ['*.scss', '*.css'],
        context: 'src/',
        copyUnmodified: true
      }
    ),
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin({ test: /\.js$/ }),
    new HTMLWebpackPlugin({
      template: './src/index.hbs',
      filename: 'index.html'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    hot: true
  }
}