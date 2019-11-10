const store = require('../../../store')

module.exports = {
  ClassMethod(path) {
    store.classMethod.push(path.node.key.name)
  }
}