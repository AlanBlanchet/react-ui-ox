const HtmlWebpackPlugin = require("html-webpack-plugin");
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
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s.$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: "graphql-tag/loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "template.html")
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx"]
  }
};
