/**
 * webpack 处理vue的loader
 * npm install -D vue-loader vue-template-compiler
 * 
 */
const path = require('path')
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssassetswebpackplugin = require('optimize-css-assets-webpack-plugin');

const commoNCss = [
    'vue-style-loader',
    'css-loader',
    {
    loader:'postcss-loader',
    options:{
        ident:'postcss',//固定写法
        plugins:()=>{
            //   postcss的插件
            require('postcss-preset-env')() 
        }
    }     
},
]

module.exports = {
     context:path.resolve(__dirname,'../'),
     entry:'./src/main.js',
     output:{
          filename:'static/js/app.js',
          path:path.resolve(__dirname,'../dis')
     },
     module:{
         rules:[
              {
                  test:/\.vue$/,
                  loader:'vue-loader'
              },
              {
                  test:/\.css$/,
                  use:[...commoNCss] 
              },
              {
                test:/\.less$/,
                use:[...commoNCss,   
                     'less-loader'
                ] 
              },
            //   {
            //     test : /\.json$/,
            //     loader : 'json-loader'
            // },
              {
                test: /\.sass$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    // Requires sass-loader@^7.0.0
                    options: {
                      implementation: require('sass'),
                      fiber: require('fibers'),
                      indentedSyntax: true // optional
                    },
                    // Requires sass-loader@^8.0.0
                    options: {
                      implementation: require('sass'),
                      sassOptions: {
                        fiber: require('fibers'),
                        indentedSyntax: true // optional
                      },
                    },
                  },
                ],
              },
              //处理css 引入图片
              {
                  test:/\.(png|jpg|svg|jpeg|gif)$/,
                  loader:'url-loader',
                  options:{
                       limit:9*1024,
                       esModule:false,
                       name:'/img/[hash:8].[ext]',
                       outputPath:'static'
                  }
              },
              //处理html中使用资源
              {
                test:/\.html$/,
                loader:'html-loader',
               },
              //这里不做esline 语法检查
              //eslint对js进行兼容性处理
               {
                 test:/\.js$/,
                 exclude:/node_modules/,
                 loader:'babel-loader',
                 options:{
                    presets:[
                        [
                        '@babel/preset-env',
                            {
                                //按需加载
                                useBuiltIns:'usage',
                                //指定core-js版本
                                corejs:{
                                version:2       
                                },
                                //指定兼容性做到那个版本浏览器
                                targets:{
                                    chrome:'60',
                                    safari:'10',
                                    firefox:'60',
                                    ie:'9',
                                    edge:'17'
                                }
                            }
                        ]
                  ],
               cacheDirectory: true
                 }       
               },
               //处理媒体文件
               {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|json)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  esModule:false,
                  name: 'media/[name].[hash:7].[ext]',
                  outputPath:'static'
                }
                },
                // 处理字体文件
                {
                test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  publicPath:'',
                  name: 'fonts/[name].[hash:10].[ext]',
                  outputPath:'static'
                }
              },


         ]
     },
     plugins:[
          //清除之前打包文件//每次保存 删除之前 生成新的文件
          new CleanWebpackPlugin(),
          new VueLoaderPlugin(),
          new HtmlWebpackPlugin({
              template:'index.html'
          }),
          //引用压缩css插件
           new OptimizeCssassetswebpackplugin()
          
     ],
     resolve:{
         /**
          * Vue 会生成三个文件：
          *     runtime only 的文件, vue.common.js
          *     compiler only 的文件, compiler.js
          *     runtime + compiler 的文件 Vue.js
          * Vue 默认导出 common.js ,我们需要的是Vue.js
          *     resolve:{
          *         alias:{
          *               'vue':'vue/dist/vue.js'  
          *         }
          *     }
          *     
          * 
          */
         extensions: ['.js', '.vue', '.json'],
         alias:{
             'vue':'vue/dist/vue.js',
             '@':path.resolve(__dirname,'../src')
         }
     },
     devtool: 'cheap-module-eval-source-map',
     devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: { colors: true },
      proxy: {
        '/api': {
          target: 'http://localhost:3308',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          
        }
        }
      }
}


