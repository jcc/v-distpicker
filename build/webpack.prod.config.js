const path = require('path')
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['*', '.js', '.vue']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'v-distpicker.js',
    library: 'VDistpicker',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
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
    }]
  }
}
