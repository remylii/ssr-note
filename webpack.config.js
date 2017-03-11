const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    chunkFilename: "[id].js"
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?importLoaders=1',
            'postcss-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "bundle.css"
    })
  ],

  resolve: { 
    modules: [
      "src", "node_modules"
    ]
  },

  devServer: {
    contextBase: "./public",
    compress: true,
    port: 9000,
    inline: true,
    historyApiFallback: true,
    stats: {
      version: false,
      hash: false,
      chunckModules: false
    }
  }
};

