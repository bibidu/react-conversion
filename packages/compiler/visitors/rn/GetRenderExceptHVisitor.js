const t = require('@babel/types')
const { 
  ast2code,
  code2ast
} = require('../../compile/utils')
const { toObjectDeep } = require('../../utils')
const store = require('../../store')

module.exports = function GetRenderExceptHVisitor(traverse, ast, params) {
  const { name: componentName } = store.get('componentJson')
  traverse(ast, {
    ClassDeclaration(path) {
      if (path.node.id.name === componentName) {
        Array.from(path.node.body.body).forEach(maybeMethod => {
          // MethodDefinition
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
  })
}