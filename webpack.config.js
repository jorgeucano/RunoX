const HtmlWebPackPlugin = require("html-webpack-plugin");

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
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
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
  ]
};

module.exports = config;
