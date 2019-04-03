const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.vue']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'v-distpicker.js',
    library: 'VDistpicker',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  optimization: {
    minimize: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.css$/,
      use: 'css-loader',
    }, {
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.js$/,
      use: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    }]
  }
}
