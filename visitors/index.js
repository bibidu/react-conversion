module.exports.compileVisitors = [
  require('./compile/CollectClassMethod'),
  require('./compile/AddUniqueId'),
  require('./compile/BuildDomTree')
]
module.exports.revertVisitors = [
  require('./revert/AddTextWrapperTag'),
  require('./revert/index')
]
