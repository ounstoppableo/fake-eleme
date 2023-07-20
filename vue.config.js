const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  // }
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
        args[0].title = 'fake_eleme'
        return args
    })},
})
