const store = require('../../store')
const { ast2code } = require('../../utils/babelUtil')
const { safeGet } = require('../../utils')

const getClazzName = () => {
  return (store.get('componentJson') || {}).name
}

module.exports = {
  Program(path) {
    const Clazz = Array.from(
        safeGet(path,'path.node.body', [])
      ).find((node) => {
      const { id, type } = node
      return type === 'ClassDeclaration' && id.name === getClazzName()
    })
    Array.from(
      safeGet(Clazz, 'Clazz.body.body', [])
      ).forEach(inner => {
      if (inner.type === 'ClassMethod') {
        store.push('raw_function_str_', {
          [inner.key.name]: {
            raw: ast2code(inner),
            body: Array.from(inner.body.body).reduce((prev, curr) => {
              return prev + ast2code(curr)
            }, '')
          }
        })
      }
    })
  },
}