const { ast2code } = require("../../utils");

const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const {
  compileVisitors,
  revertVisitors
} = require('../../visitors')
const store = require('../../store')

module.exports.compileJS = function compileJS(code) {
  function _traverse(visitor) {
    const r = babel.transformSync(code, {
      plugins: [
        ["@babel/plugin-syntax-jsx"],
        { visitor }
      ],
    })
    code = r.code
  }

  // const ast = parser.parse(r.code)
  compileVisitors.forEach(visitor => {
    // traverse(ast, visitor)
    _traverse(visitor)
  })

  // store.addUniqueIdCode = ast2code(ast)
}

module.exports.revertJS = function revertJS() {
  const ast = parser.parse(store.addUniqueIdCode)
  revertVisitors.forEach(visitor => {
    traverse(ast, visitor)
  })
}

