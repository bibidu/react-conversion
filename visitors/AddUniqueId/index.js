const t = require('@babel/types')
const {
  safeGet,
  ast2code,
  uniqueId,
  array
} = require('../../utils')

const isReactDom = (node) => safeGet(node, 'node.callee.object.name') === 'React' && safeGet(node, 'node.callee.property.name') === 'createElement'

module.exports = {
  CallExpression(path) {
    if (isReactDom(path.node)) {
      let attr
      const attrsString = ast2code(path.node.arguments[1])
      // attr是null
      if (attrsString === 'null') {
        attr = t.objectExpression([
          t.objectProperty(
            t.identifier('__className'),
            t.stringLiteral(uniqueId())
          )
        ])
      } else {
        // attr是对象形式
        function createObjectProperty(key, value) {
          return t.objectProperty(
            t.identifier(key),
            t.stringLiteral(value)
          )
        }
        // 简单处理
        const kvsString = attrsString.slice(1, -1).split(',')
        attr = t.objectExpression(
          [`__className:${uniqueId()}`].concat(kvsString).map(kv => {
            const [selector, value] = kv.split(':')
            return createObjectProperty(selector, value)
          })
        )
      }
      path.node.arguments[1] = attr
    }
  }
}