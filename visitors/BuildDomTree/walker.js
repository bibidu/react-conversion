const {
  safeGet,
  ast2code,
  array
} = require('../../utils')
const saveStoreAboutUniqueId = require('./saveStoreAboutUniqueId')
const store = require('../../store')
const walk = (type) => {
  return w[`walk${type}`]
}

const stacks = []

let w = {
  walkProgram(path) {
    array(path.node.body).forEach(body => walk(body.type)(body))
  },

  walkClassDeclaration(path) {
    walk(path.body.type)(path.body)
  },

  walkClassBody(path) {
    array(path.body).forEach(body => walk(body.type)(body))
  },

  walkClassMethod(path) {
    stacks.push(path.key.name)
    // console.log(`into ClassMethod ${path.key.name}`)
    walk(path.key.type)(path.key)
    walk(path.body.type)(path.body)
    // console.log(`out ClassMethod ${path.key.name}`)
    stacks.pop()
  },

  walkIdentifier(path) {
  },

  walkBlockStatement(path) {
    array(path.body).forEach(body => walk(body.type)(body))
  },
  walkExpressionStatement(path) {
    walk(path.expression.type)(path.expression)
  },

  walkReturnStatement(path) {
    walk(path.argument.type)(path.argument)
  },

  walkMemberExpression(path, state) {
    if (
      safeGet(state, 'state.source') === 'React.createElement'
      && store.classMethod.includes(path.property.name)
    ) {
      store.relatives.push({ [path.property.name]: stacks[stacks.length - 1] })
      
    }
    walk(path.object.type)(path.object)
    walk(path.property.type)(path.property)
  },
  walkConditionalExpression(path) {
    walk(path.test.type)(path.test)
    walk(path.consequent.type)(path.consequent)
    walk(path.alternate.type)(path.alternate)
    
  },
  walkStringLiteral(path) {

  },
  walkObjectExpression(path) {
    array(path.properties).forEach(arg => walk(arg.type)(arg))
  },
  
  walkVariableDeclaration(path) {
    array(path.declarations).forEach(arg => walk(arg.type)(arg))
  },
  walkVariableDeclarator(path) {
    walk(path.id.type)(path.id)
    walk(path.init.type)(path.init)
  },
  walkObjectPattern(path) {
    array(path.properties).forEach(arg => walk(arg.type)(arg))
  },
  walkObjectProperty(path) {
    walk(path.key.type)(path.key)
    walk(path.value.type)(path.value)
  },
  walkCallExpression(path) {
    let uniqueId
    if (safeGet(path, 'path.callee.object.name') === 'React') {
      uniqueId = saveStoreAboutUniqueId(path, stacks[stacks.length - 1])
      stacks.push(uniqueId)
      // console.log(`into React: ${path.callee.property.name} ${uniqueId}`)
    }
    walk(path.callee.type)(path.callee, { source: 'React.createElement'})
    array(path.arguments).forEach(arg => walk(arg.type)(arg))

    if (safeGet(path, 'path.callee.object.name') === 'React') {
      stacks.pop()
      // const uniqueId = path.arguments[1].properties[0].value.value
      // console.log(`out React: ${path.callee.property.name} ${uniqueId}`)
    }
  },
  walkIfStatement(path) {
    walk(path.test.type)(path.test)
    walk(path.consequent.type)(path.consequent)
  },
  walkSwitchStatement(path) {
    walk(path.discriminant.type)(path.discriminant)
    array(path.cases).forEach(arg => walk(arg.type)(arg))
  },
  walkBooleanLiteral(path) {

  },
  walkSwitchCase(path) {
    walk(path.test.type)(path.test)
    array(path.consequent).forEach(arg => walk(arg.type)(arg))
  },
  walkNumericLiteral(path) {

  },
  walkNullLiteral() {

  },
  walkSuper() {

  },
  walkThisExpression() {

  },

}
Object.keys(w).forEach(_w => {
  const fn = w[_w]
  w[_w] = (...args) => {
    // console.log(`--> [${_w}]`)
    fn(...args)
  }
})
module.exports = w

