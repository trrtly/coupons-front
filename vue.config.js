const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/less/variables.less')]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://pb4bq6eow8rgun5h.xmanfulong.com',
        changeOrigin: true, // 是否跨域
        ws: true,
        pathRewrite: {
          // 重写路径
        }
      }
    }
  }
}
