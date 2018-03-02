const path = require('path');

const config = {
  entry: {
    callMeAdd: './src/callMeAdd.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {test: /\.txt$/, use: 'raw-loader'},
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["es2015"]
          }
        }
      },
      {
        test: /\.(css)$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader"},
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: './static/images/source/[hash].[ext]'
          }
        }
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '../static/fonts/[name].[ext]'
          }
        }
      }
    ]
  }
};

module.exports = config;