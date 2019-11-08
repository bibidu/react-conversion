const t = require('@babel/types')
const { 
  ast2code,
  code2ast
} = require('../../compile/utils')
// const { toObjectDeep } = require('../../utils')

module.exports = function LogicalVisitor(traverse, ast, params) {
  traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.object && path.node.callee.object.name === 'React' && path.node.callee.property.name === 'createElement') {
        Array.from(path.node.arguments).forEach((args, idx) => {
          // && || 运算符
          if (args.type === 'LogicalExpression') {
            const nodes = []
            // 深度优先遍历
            deepTraversalLogical(args, nodes)
            let lastIdx = 0, logics = []
            nodes.reduce((prev, curr, index) => {
              
              if (prev.type === 'operator' && curr.type === 'createElement') {
                const beforeLogic = {
                  type: 'logic',
                  value: `${extractAndJoin(nodes.slice(lastIdx, index - 1))}`
                }
                const operatorLogic = {
                  type: 'logic',
                  value: `${extractAndJoin(nodes[index - 1])}`
                }
                const element = {
                  type: 'element',
                  value: nodes[index].value
                }
                logics.push(beforeLogic, operatorLogic, element)
                lastIdx = index
              }
              if (index === nodes.length - 1) {
                if (lastIdx === 0) {
                  const allLogic = {
                    type: 'logic',
                    value: `${extractAndJoin(nodes.slice(lastIdx, nodes.length))}`
                  }
                  logics.push(allLogic)
                } else if (lastIdx === index) {
                } else {
                  const operatorLogic = {
                    type: 'logic',
                    value: `${extractAndJoin(nodes[lastIdx + 1])}`
                  }
                  const restLogic = {
                    type: 'logic',
                    value: `${extractAndJoin(nodes.slice(lastIdx + 2))}`
                  }
                  logics.push(operatorLogic, restLogic) 
                }
              }
              return curr
            }, { type: '', value: '' })
            const identifiers = []
            logics.forEach((logic, i) => {
              if (logic.value) {
                identifiers.push(t.identifier(logic.type === 'element' ? logic.value : "`@@logic__" + logic.value + "`"))
              }
            })
            path.node.arguments[idx] = t.callExpression(
              t.identifier("React.logic"),
              identifiers
            )
          }
            // 三目 args idx
          if (args.type === 'ConditionalExpression') {
            const nodes = []
            let methodBody = {}
            deepTraversalConditional(args, nodes)
            const str = markWrapper(nodes)
            path.node.arguments[idx] = t.identifier(str)
          }
        })
      }
    }
  })
}
function markWrapper(nodes) {
  let str = 'React.logicWrapper('
  nodes.forEach(node => {
    const element = node.isElement ?
      `React.merge(${node.value}, {after: "${node.after}"})` : `React.constant(\`@@constant__${node.value}\`, "${node.after}", "${node.type}")`
    str += `${element},\n`
  })
  str += ')'
  return str
}
// "`@@condition__"   "`"
function deepTraversalConditional(current, nodes) {
  if (current.test) {
    nodes.push({
      isElement: isCreateElement(current.test),
      value: ast2code(current.test),
      type: 'test',
      after: ' ?'
    })
  }
  if (current.consequent) {
    if (current.consequent.type === 'ConditionalExpression') {
      deepTraversalConditional(current.consequent, nodes)
    } else {
      nodes.push({
        isElement: isCreateElement(current.consequent),
        value: ast2code(current.consequent),
        type: 'consequent',
        after: ' :'
      })
    }
  }
  if (current.alternate) {
    if (current.alternate.type === 'ConditionalExpression') {
      deepTraversalConditional(current.alternate, nodes)
    } else {
      nodes.push({
        isElement: isCreateElement(current.alternate),
        value: ast2code(current.alternate),
        type: 'alternate',
        after: ''
      })
    }
  }
}


function extractAndJoin(arrOrObj, attr = 'value') {
  if (Array.isArray(arrOrObj)) {
    return arrOrObj.map(i => i[attr]).join("")
  }
  return arrOrObj[attr]
}
function deepTraversalLogical(current, nodes) {
  if (current.left) {
    deepTraversalLogical(current.left, nodes)
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
    deepTraversalLogical(current.right, nodes)
  } else {
    nodes.push({
      type: isCreateElement(current) ? 'createElement' : 'string',
      value: isCreateElement(current) ? JSON.stringify(ast2code(current.operator)) : ast2code(current.operator)
    })
  }
}

function isCreateElement(node) {
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