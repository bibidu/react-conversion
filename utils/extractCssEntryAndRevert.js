const babel = require("@babel/core")
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const ts = require('typescript')
const { ast2code, safeGet } = require('.')
const { SourceMapConsumer } = require('source-map')

module.exports = function extractCssEntryAndRevert(code) {
  const compiled = ts.transpileModule(code, {
    compilerOptions: {
      target: "ES6",
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      jsx: 'preserve'
    }
  })
  
  const styleRequires = []
  const r = babel.transformSync(compiled.outputText, {
    plugins: [
      ["@babel/plugin-syntax-jsx"],
      { 
        visitor: {
          CallExpression(path) {
            const { flag, info } = extractRequireCss(path.node)
            if (flag) {
              path.remove()
              styleRequires.push(info)
            }
            // 临时方案 移除ts编译产生的:
            // "use strict";

            // Object.defineProperty(exports, "__esModule", {
            //   value: true
            // });
            if (
              safeGet(path, 'path.node.callee.object.name') === 'Object'
              && safeGet(path, 'path.node.callee.property.name') === 'defineProperty'
            ) {
              const firstChild = path.node.arguments[0]
              if (firstChild.type === 'Identifier' && firstChild.name === 'exports') {
                path.remove()
              }
            }
          }
        }
      }
    ],
  })
  return {
    styleRequires,
    code: r.code
  }
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