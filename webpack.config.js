const HtmlWebpackPlugin = require("html-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve("src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "template.html")
    })
  ],
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: "./tsconfig.json"
      })
    ]
  }
};
