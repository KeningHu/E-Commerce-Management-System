const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
		filename: 'js/app.js'
  },
  module: {
  loaders:[
      // react
    	{
      		test: /\.jsx$/,
      		exclude: /(node_modules)/,
      		use: {
        	loader: 'babel-loader',
        	options: {
          		presets: ['env', 'react'] // according envornment
        }
      		}
    	},
      // css
    	{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // sass
       {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // picture
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            },
          },
        ],
      },
      // fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            },
          },
        ],
      }


  		]
			},
  plugins: [
  // html file
  new HtmlWebpackPlugin({
  	template: './src/index.html'
  }),
  // css file
   new ExtractTextPlugin("css/[name].css"),
   // public module
   new webpack.optimize.CommonsChunkPlugin({
     name : 'common',
     filename : 'js/base.js'
   }),
    
  ],
  devServer: {
        port: 8086
       },
  
};