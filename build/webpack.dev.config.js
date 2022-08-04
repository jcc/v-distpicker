const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const isProd = process.env.NODE_ENV === "production";

const config = {
  root: path.join(__dirname, "./"),
};

module.exports = {
  entry: "./examples/main.js",
  mode: "development",
  resolve: {
    extensions: [".js", ".json", ".vue"],
  },
  devtool: "cheap-module-source-map",
  output: {
    path: path.join(config.root, "../dist"),
    filename: "v-distpicker.js",
  },
  devServer: {
    static: path.resolve(__dirname, "../examples"),
    compress: false,
    port: 3000,
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(config.root, "../examples/template.html"),
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
