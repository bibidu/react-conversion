const t = require('@babel/types')
const { ast2code } = require('../compile/utils')

module.exports = function LogicalVisitor(traverse, ast, params) {
  traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.object && path.node.callee.object.name === 'React' && path.node.callee.property.name === 'createElement') {
        Array.from(path.node.arguments).forEach(args => {
          // && || 运算符
          if (args.type === 'LogicalExpression') {
            const nodes = []
            deepTraversal(args, nodes)
            console.log('nodes');
            console.log(nodes);
            let lastIdx = 0
            nodes.reduce((prev, curr, index) => {
              if (prev.type === 'operator' && curr.type === 'createElement') {
                console.log(`React.logic(${nodes.slice(lastIdx, index - 1).map(i => i.value).join("")}) React.logic("${nodes[index - 1].value}")`)
                lastIdx = index + 1
                console.log(lastIdx);
              }
              if (index === nodes.length - 1) {
                if (lastIdx === 0) {
                  console.log(`React.logic(${nodes.slice(lastIdx, nodes.length).map(i => i.value).join("")})`)
                } else {
                  // TODO: 截取操作符 + rest部分
                  // console.log(`React.logic(${nodes[lastIdx], })`);
                }
              }
              return curr
            }, { type: '', value: '' })
          }
        })
      }
    }
  })
}

function deepTraversal(current, nodes) {
  if (current.left) {
    deepTraversal(current.left, nodes)
  } else {
    nodes.push({
      type: isCreateElement(current) ? 'createElement' : 'string',
      value: ast2code(current)
    })
    return 
  }
  nodes.push({
    type: 'operator',
    value: current.operator
  })
  if (current.right) {
    deepTraversal(current.right, nodes)
  } else {
    nodes.push({
      type: isCreateElement(current) ? 'createElement' : 'string',
      value: isCreateElement(current) ? JSON.stringify(ast2code(current.operator)) : ast2code(current.operator)
    })
  }
}

function isCreateElement(node) {
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