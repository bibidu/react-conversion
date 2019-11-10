const {
  safeGet,
  ast2code,
  array
} = require('../../../utils')
const saveStoreAboutUniqueId = require('./saveStoreAboutUniqueId')
const store = require('../../../store')
const walk = (type) => {
  // console.log(type);
  return w[`walk${type}`]
}

const getUniqueId = (node) => {
  for (let i = 0; i < node.openingElement.attributes.length; i++) {
    const item = node.openingElement.attributes[i]
    if (
      item.type === 'JSXAttribute'
      && item.name.name === '__className'
    ) {
      return item.value.value
    }
  }
}
const stacks = []

let w = {
  walkProgram(path) {
    array(path.node.body).forEach(body => walk(body.type)(body))
  },

  walkJSXElement(path) {
    const lastStackItem = stacks[stacks.length - 1]
    saveStoreAboutUniqueId(path, lastStackItem)

    const uniqueId = getUniqueId(path)
    stacks.push(uniqueId)

    walk(path.openingElement.type)(path.openingElement)
    array(path.children).forEach(body => walk(body.type)(body))
    walk(path.closingElement.type)(path.closingElement)

    stacks.pop()
  },
  walkJSXText(path) {

  },
  walkJSXExpressionContainer(path) {
    walk(path.expression.type)(path.expression, { source: 'JSXExpressionContainer'})
  },
  walkJSXOpeningElement(path) {

    walk(path.name.type)(path.name)
    array(path.attributes).forEach(body => walk(body.type)(body))
  },
  walkJSXClosingElement(path) {
    walk(path.name.type)(path.name)
  },
  walkJSXIdentifier(path) {

  },
  walkJSXAttribute(path) {
    walk(path.name.type)(path.name)
    walk(path.value.type)(path.value)
  },

  walkClassDeclaration(path) {
    walk(path.body.type)(path.body)
  },

  walkClassBody(path) {
    array(path.body).forEach(body => walk(body.type)(body))
  },

  walkClassMethod(path) {
    stacks.push(path.key.name)
    walk(path.key.type)(path.key, { source: 'classMethod' })
    walk(path.body.type)(path.body)
    stacks.pop()
  },

  walkIdentifier(path, state) {
    if (state && state.source === 'classMethod') {
      // const uniqueId = path.name
      // const lastStackItem = stacks[stacks.length - 1]
      // if (!Array.isArray(store.sfRelations[uniqueId])) {
      //   store.sfRelations[uniqueId] = []
      // }
      // if (!Array.isArray(store.fsRelations[lastStackItem])) {
      //   store.fsRelations[lastStackItem] = []
      // }
      // store.sfRelations[uniqueId].push(lastStackItem)
      // store.fsRelations[lastStackItem].push(uniqueId)
    }
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
    // if (
    //   safeGet(state, 'state.source') === 'React.createElement'
    //   && store.classMethod.includes(path.property.name)
    // ) {
    //   const uniqueId = path.property.name
    //   const lastStackItem = stacks[stacks.length - 1]
    //   ;(store.sfRelations[uniqueId] || (store.sfRelations[uniqueId] = [])).push(lastStackItem)
    //   ;(store.fsRelations[lastStackItem] || (store.fsRelations[lastStackItem] = [])).push(uniqueId)
    // }
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
  walkCallExpression(path, state) {
    // TODO: 后续加入作用域的判断
    if (state && state.source === 'JSXExpressionContainer') {
      const uniqueId = path.callee.property.name
      const lastStackItem = stacks[stacks.length - 1]
      if (!Array.isArray(store.sfRelations[uniqueId])) {
        store.sfRelations[uniqueId] = []
      }
      if (!Array.isArray(store.fsRelations[lastStackItem])) {
        store.fsRelations[lastStackItem] = []
      }
      store.sfRelations[uniqueId].push(lastStackItem)
      store.fsRelations[lastStackItem].push(uniqueId)
    }
    walk(path.callee.type)(path.callee, { source: 'React.createElement'})
    array(path.arguments).forEach(arg => walk(arg.type)(arg))
  },
  walkUnaryExpression(path) {
    walk(path.argument.type)(path.argument)
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

