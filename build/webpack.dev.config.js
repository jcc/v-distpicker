const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './examples/main.js',
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
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/dev/index.html'),
      template: 'examples/index.html',
      inject: true
    })
  ],
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: 'vue-style-loader!css-loader!sass-loader',
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        }
      }
    }, {
      test: /\.js$/,
      loaders: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }]
  }
}
