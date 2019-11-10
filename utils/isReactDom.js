const {
  safeGet
} = require('.')

module.exports = function(node) {
  return safeGet(node, 'node.callee.object.name') === 'React'
    && safeGet(node, 'node.callee.property.name') === 'createElement'
}