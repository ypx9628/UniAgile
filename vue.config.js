const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

// module.exports = {
//   // hash 模式下可使用
//   // publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
//   publicPath: '/',
//   outputDir: 'dist',
//   assetsDir: 'static',
//   lintOnSave: false,//process.env.NODE_ENV === 'development',
//   productionSourceMap: false,
//   devServer: {
//     port: port,
//     open: false,//是否自动打开浏览器
//     overlay: {
//       warnings: false,
//       errors: false
//     },
//     proxy: {
//       '/api': {
//         target: process.env.VUE_APP_BASE_API,
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': '/'
//         }
//       },
//       '/person': {
//         target: process.env.VUE_APP_BASE_PERSONSYS,
//         changeOrigin: true,
//         pathRewrite: {
//           '^/person': '/'
//         }
//       },
//       '/pms': {
//         target: process.env.VUE_APP_BASE_AUTHORITY,
//         changeOrigin: true,
//         pathRewrite: {
//           '^/pms': '/'
//         }
//       }
//     }
//   }
// }

// module.exports = {
//   devServer: {
//     host: 'localhost', // 本地域名/ip地址
//     port: '8080', // 端口号
    
//     proxy: { // 配置跨域
//       '/apis': {
//         target: 'http://10.28.236.228:16663', // 需要代理的地址
//         secure: false, // 如果是不是https接口，可以不配置这个参数
//         changeOrigin: true, // 允许跨域
//         pathRewrite: {
//           '^/apis': '', // 路径重写，将前缀/apis转为"/"，也可以理解为"/apis"代替target里面的地址
//           // 如果本身的接口地址就有"/api"这种通用前缀，也就是说https://www.exaple.com/api，就可以把pathRewrite删掉，如果没有则加上
//         },
//       },
//     },
//   },
// };
