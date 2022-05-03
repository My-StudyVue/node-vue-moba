const Setting = require('./src/setting.env');

module.exports = {
  publicPath: Setting.publicPath,
  lintOnSave: Setting.lintOnSave,
  outputDir: Setting.outputDir,
  assetsDir: Setting.assetsDir,
  runtimeCompiler: Setting.productionSourceMap,
  productionSourceMap: Setting.productionSourceMap,
  devServer: {
    port: 8888,     // 端口号
  }
};