const t = require('@babel/types')
const { ast2code } = require('../../utils/babelUtil')
const {
  isCreateElement,
  isReactMethodIdentifier
} = require('../utils')

// const ClazzName = 'T'
module.exports = {
    CallExpression(path) {
      if (isCreateElement(path.node)) {
        const attrExpression = path.node.arguments[1]
        let chlidrenElement = path.node.arguments[2]
        // attrs的每个value添加标记
        if (attrExpression !== null && attrExpression.type === 'ObjectExpression') {
          Array.from(attrExpression.properties).forEach(prop => {
            const code = ast2code(prop.value)
            if (code.startsWith('"') &&  code.endsWith('"')) {
              prop.value = t.identifier("`@@attrValue__" + code + "`")
            } else {
              prop.value = t.identifier("`@@attrValueDynatic__" + code + "`")
            }
          })
        }
        if (chlidrenElement.type === 'CallExpression') {
              // list.map
          const type = chlidrenElement.callee.object.type
          if (type === 'Identifier' || 'ArrayExpression') {
            let methodCaller = chlidrenElement.callee.object
            const method = chlidrenElement.callee.property.name
            const methodCallerStr = ast2code(methodCaller)
            if (method === 'map') {
              const identifierParam = `"${methodCallerStr}"`
              const fnParams = []
              // 函数入参
              const fn = Array.from(path.node.arguments[2].arguments)[0]
              fn.params.forEach(param => {
                const args = ast2code(param)
                fnParams.push(`"${args}"`)
              })
              // 修改为React.map([1, 2], ['item', 'index'])(() => {})
              path.node.arguments[2].callee.object = t.identifier("React")
              path.node.arguments[2].callee.property = 
                t.identifier(method + `(${identifierParam}, ${fnParams})`)
            }
          }
        }
        // 标记字符串
        if (
          ['Identifier', 'BinaryExpression'].includes(chlidrenElement.type)
          && !isReactMethodIdentifier(chlidrenElement)
        ) {
          let code = ast2code(path.node.arguments[2])
            if (code.startsWith('"') &&  code.endsWith('"')) {
              code = t.identifier("`@@string__" + code + "`")
            } else {
              code = t.identifier("`@@stringDynatic__" + code + "`")
            }
            path.node.arguments[2] = code
        }
      }
    },
    ConditionalExpression(path) {
      const code = ast2code(path.node)
      path.replaceWith(t.identifier("`@@string__" + code + "`"))
    }
}