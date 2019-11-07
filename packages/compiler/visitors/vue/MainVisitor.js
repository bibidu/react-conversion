const t = require('@babel/types')
const { ast2code } = require('../../compile/utils')
// const { isCreateElement } = require('./utils')

module.exports = function mainVisitor(traverse, ast, params) {
  traverse(ast, {
    Program(path) {
      Array.from(path.node.body).forEach(child => {
        if (child.type == 'ExpressionStatement') {
          if (child.expression.left && child.expression.left.property.name === 'propTypes') {
            Array.from(child.expression.right.properties).forEach(prop => {
              params.props[prop.key.name] = {
                prop: prop.key.name,
                type: prop.value.value,
              }
            })
          }
        }
      })
    },
    CallExpression(path) {
      if (path.node.callee.object && path.node.callee.object.name === 'React' && path.node.callee.property.name === 'createElement') {
        const attrExpression = path.node.arguments[1]
        let chlidrenElement = path.node.arguments[2]
        // attrs的每个value添加标记
        if (attrExpression !== null && attrExpression.type === 'ObjectExpression') {
          Array.from(attrExpression.properties).forEach(prop => {
            const code = ast2code(prop.value)
            prop.value = t.identifier("`@@attrValue__" + code + "`")
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
        if (['Identifier', 'BinaryExpression'].includes(chlidrenElement.type)) {
          // console.log('BinaryExpressionBinaryExpressionBinaryExpression')
          path.node.arguments[2] = t.identifier("`@@string__" + ast2code(path.node.arguments[2]) + "`")
        }
      }
    },
    LogicalExpression() {
      // console.log('LogicalExpression ===============');
    },
    ConditionalExpression(path) {
      const code = ast2code(path.node)
      path.replaceWith(t.identifier("`@@string__" + code + "`"))
    },
    // LogicalExpression(path) {
    //   const code = ast2code(path.node)
    //   path.replaceWith(t.identifier("`@@string__" + code + "`"))
    // }
  })
}
// function isCreateElement(node) {
//   if (node === null) {
//     return true
//   }
//   if (
//     node.type === 'CallExpression'
//     && node.callee.object
//     && node.callee.object.name === 'React'
//     && node.callee.property.name === 'createElement'
//   ) {
//     return true
//   }
//   return false
// }