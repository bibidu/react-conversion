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
  const r = babel.transformSync(code, {
    presets: [
      "@babel/preset-react",
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
  })
  const ast = parser.parse(r.code)
  compileVisitors.forEach(visitor => {
    traverse(ast, visitor)
  })
  store.addUniqueIdCode = ast2code(ast)
  console.log(store.addUniqueIdCode);
}

module.exports.revertJS = function revertJS() {
  const ast = parser.parse(store.addUniqueIdCode)
  revertVisitors.forEach(visitor => {
    traverse(ast, visitor)
  })
}

