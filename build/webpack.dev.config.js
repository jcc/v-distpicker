const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './examples/main.js',
  mode: 'development',
  resolve: {
    extensions: ['*', '.js', '.vue'],
    alias: {
      main: path.resolve(__dirname, '../src')
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist/dev'),
    publicPath: '/',
    filename: 'v-distpicker.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist/dev'),
    compress: false,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/dev/index.html'),
      template: 'examples/index.html',
      inject: true
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.js$/,
      use: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: 'css-loader',
    }, {
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'url-loader',
        query: {
          name: '[path][name].[ext]?[hash:8]',
          limit: 8192
        }
      }]
    }]
  }
}
