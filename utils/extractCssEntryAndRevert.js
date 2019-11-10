const babel = require("@babel/core")
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const { ast2code } = require('.')
const { SourceMapConsumer } = require('source-map')

module.exports = function extractCssEntryAndRevert(code) {
  const result = babel.transform(code, {
    // inputSourceMap: false,
    sourceType: 'module',
    presets: [
      // "@babel/preset-env",
      "@babel/preset-react",
    ]
  })
  
  const ast = parser.parse(result.code)
  const styleRequires = []
  traverse(ast, {
    CallExpression(path) {
      const { flag, info } = extractRequireCss(path.node)
      if (flag) {
        styleRequires.push(info)
      }
    }
  })
  return styleRequires
}

function extractRequireCss(node) {
  const returnValue = { flag: false }
  if (
    node.callee.name === 'require'
    && node.arguments.length === 1
    && node.arguments[0].type === 'StringLiteral'
    && /\.[scss|css|less]/.test(node.arguments[0].value)
  ) {
    returnValue.flag = true
    returnValue.info = { path: node.arguments[0].value }
  }
  return returnValue
}