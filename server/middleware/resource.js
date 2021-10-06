// 资源中间键

module.exports = () => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Mondel = require(`../models/${modelName}`)

    next()
  }
}