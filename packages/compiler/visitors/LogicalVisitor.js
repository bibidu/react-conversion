const t = require('@babel/types')
const { ast2code } = require('../compile/utils')

module.exports = function LogicalVisitor(traverse, ast, params) {
  traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.object && path.node.callee.object.name === 'React' && path.node.callee.property.name === 'createElement') {
        // && || 运算符
        let parent = path.parent, firstChild = path
        const logicArray = []
        if (parent && parent.type === 'LogicalExpression') {
          // while (parent && parent.type === 'LogicalExpression') {
          //   firstChild = parent
          //   parent = parent.parent
          // }
          // // 遍历firstChild
          // while (firstChild.left) {
          //   parent = firstChild
          //   firstChild = firstChild.left
          // }
          // // 没有left
          // while (parent && parent.type === 'LogicalExpression') {
          //   logicArray.push({ name: firstChild.name, type: 'judgeWord' })
          //   firstChild = parent
          //   parent = parent.parent
          // }
        }
        // TODO: 
      }
    }
  })
}