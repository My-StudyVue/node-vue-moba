const env = process.env.NODE_ENV;

const Setting = {
  // 是否使用 Mock 的数据，默认 开发环境为 true，生产环境为 false
  // isMock: env === 'development',
  isMock: false,
  // 部署应用包时的基本 URL
  publicPath: env === 'production' ? '/' : '/',
  // 生产环境构建文件的目录名
  outputDir: 'web',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: '',
  // 开发环境每次保存时 lint 代码，会将 lint 错误输出为编译警告
  // true || false || error
  lintOnSave: false,
  // 运行时版本是否需要编译
  runtimeCompiler: true,
  // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  // transpileDependencies: [],
  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  productionSourceMap: false,
};

module.exports = Setting;
