
module.exports.isCreateElement = function isCreateElement(node) {
  if (node === null) {
    return true
  }
  if (
    node.type === 'CallExpression'
    && node.callee.object
    && node.callee.object.name === 'React'
    && node.callee.property.name === 'createElement'
  ) {
    return true
  }
  return false
}

module.exports.isReactMethodIdentifier = function isReactMethod(node) {
  if (
    node.type === 'Identifier'
    && node.name.startsWith('React.')
  ) {
    return true
  }
  return false
}