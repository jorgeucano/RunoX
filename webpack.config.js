const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const isDevelopment = process.env.NODE_ENV === "development";

const config = {
  entry: "./src/index.ts",
  devtool: isDevelopment && "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000
  }
};

module.exports = config;
