module.exports.baseVisitors = [
  require('./base/CollectMethodRawVisitor')
]
module.exports.vueVisitors = [
  require('./vue/LogicalVisitor'),
  require('./vue/MainVisitor')
]
module.exports.rnVisitors = [
  require('./rn/LogicalVisitor'),
  require('./rn/MainVisitor'),
  require('./rn/GetRenderExceptHVisitor')
]