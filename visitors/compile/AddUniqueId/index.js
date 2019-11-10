const t = require('@babel/types')
const {
  safeGet,
  ast2code,
  uniqueId,
  array,
  isReactDom
} = require('../../../utils')

module.exports = {
  JSXOpeningElement(path) {
    path.node.attributes.push(
      t.jsxAttribute(
        t.jsxIdentifier('__className'),
        t.StringLiteral(uniqueId())
      )
    )
  }
}