var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/js/app.js'
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devtool: 'cheap-source-map',

  devServer: {
    contentBase: 'dist'
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'eslint',
    //     include: [path.resolve(__dirname, 'src')]
    //   }
    // ],

    rules: [{
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.svg|\.ico|\.png$/,
        use: 'file-loader?name=[name].[ext]&outputPath=images/'
      }
    ]

  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
  ]
};