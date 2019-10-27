var path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    devtool: 'null',  //注意修改了这里，这能大大压缩我们的打包代码
    entry:  './src/main.js',//已多次提及的唯一入口文件
    output: {
      path: path.resolve(__dirname,'build'),//打包后的文件存放的地方
      filename: 'bundle-[hash].js'//打包后输出文件的文件名
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      }
    },
    devServer:{
      contentBase:path.resolve(__dirname,'build'), //本地服务器所加载的页面所在的目录
      historyApiFallback:true,  //不跳转
      inline:true //实时刷新
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },{
          test:/(\.jsx|\.js)$/,
          use:{
            loader:"babel-loader"
          },
          exclude:/node_modules/
        },{
          test: /\.css$/,
          use:ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader"
                }
            ]
          })
          
       }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        hash: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin("styles.css"),
      new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: false, // Must be set to true if using source-maps in production
              terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
              }
            }),
          ],
    },
  }