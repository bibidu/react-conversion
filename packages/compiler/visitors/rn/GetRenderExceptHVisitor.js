const t = require('@babel/types')
const { 
  ast2code,
} = require('../../utils/babelUtil')
const store = require('../../store')

const getName = () => {
  const { name } = store.get('componentJson')
  return name
}
module.exports = {
  ClassDeclaration(path) {
    if (path.node.id.name === getName()) {
      Array.from(path.node.body.body).forEach(maybeMethod => {
        if (maybeMethod.type === 'ClassMethod' && maybeMethod.key.name === 'render') {
        const members = maybeMethod.body.body
        Array.from(members).forEach(member => {
          if (member.type !== 'ReturnStatement') {
              const code = ast2code(member)
              store.push('renderExceptH', code)
            }
          })
        }
      })
    }
  }
}