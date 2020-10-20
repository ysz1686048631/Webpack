/**
 * webpack 处理vue的loader
 * npm install -D vue-loader vue-template-compiler
 * 
 * webpack.base.js  是dev与prod公共配置
 * 
 * webpack-merge 合并公共配置
 * 
 */
const path = require('path')
const merge = require('webpack-merge')
const baseConfigs = require('./webpack.base.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const devbaseConfig = merge(baseConfigs,{
    mode:'development',
    devServer:{
      
       watchContentBase:true,
       watchOptions:{
           // 忽略文件 因为node_modules文件里的内容是不会更改的，所有不需要对它进行监视，这样提高了效率
           ignored:/node_modules/
      },
      host:'localhost',
       //端口号
      port:3366,
       //自动打开浏览器 
       open:true,
       // 热更新  开启HMR功能
       hot:true,
    }
})


//配置端口
/**
 * portfinder 检查端口是否存在 存在报错 并再存在的端口上执行 3366+1 依次类推 3366+n
 * 
 * vue-cli 配置
 */

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devbaseConfig.devServer.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // add port to devServer config
        devbaseConfig.devServer.port = port
  
        // Add FriendlyErrorsPlugin
        devbaseConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devbaseConfig.devServer.host}:${devbaseConfig.devServer.port}`],
          },
        }))
        resolve(devbaseConfig)
      }
    })
  })
