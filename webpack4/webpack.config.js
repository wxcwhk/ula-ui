var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
    devtool: 'eval-source-map',  //source map的配置
    entry:  './src/main.js',//已多次提及的唯一入口文件
    output: {
      path: path.resolve(__dirname,'build'),//打包后的文件存放的地方
      filename: 'bundle.js'//打包后输出文件的文件名
    },
    devServer:{
      contentBase:path.resolve(__dirname,'build'), //本地服务器所加载的页面所在的目录
      historyApiFallback:true,  //不跳转
      inline:true //实时刷新
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      }
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
          use: [
              {
                  loader: "style-loader"
              }, {
                  loader: "css-loader"
              }, {
                  loader: "postcss-loader"
              }
          ]
       },{
        test: /\.(eot|svg|ttf|woff|woff2)$/,  //解决一些字体问题，主要是Element-ui
        loader: 'file-loader'
      },{
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
       },{
        　　test: /\.scss$/,
        　　loaders: ['style-loader', 'css-loader', 'sass-loader']    //webpack新版本要求loader不能缩写
        }
       
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        hash: true
      })
    ]
  }