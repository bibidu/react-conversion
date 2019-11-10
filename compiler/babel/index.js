
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const visitors = require('../../visitors')
const store = require('../../store')

module.exports = function compileJS(code) {
  const r = babel.transformSync(code, {
    presets: [
      "@babel/preset-react",
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
  })
  const ast = parser.parse(r.code)
  // console.log(r.code);
  visitors.forEach(visitor => {
    traverse(ast, visitor)
  })

}

