const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/app/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  devServer: {
    static: {                               
      directory: path.join(__dirname, './'),  
      watch: true
    }
 },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }
    ]
  }
};
