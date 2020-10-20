/**
 * webpack 生产环境的配置
 * 
 */
const path = require('path')
const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//分离css文件
const MiniCssExtarctPlugin = require('mini-css-extract-plugin');
//打包 -- 分离打包css & 压缩 & 重命名css
let len = baseConfig.module.rules.length;
baseConfig.module.rules[len-1].options.publicPath='../';
baseConfig.module.rules[1].use = [
   MiniCssExtarctPlugin.loader,
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
baseConfig.plugins.push(new MiniCssExtarctPlugin({
   filename:'static/css/[name].[contenthash].css'
}))
process.env.NODE_ENV  = 'production';
const prodConfig = {
   mode:'production'
}
module.exports = merge(baseConfig,prodConfig)
