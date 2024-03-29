const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const React = require('../React/react')
const { toObject } = require('../utils')
const generate = require('@babel/generator').default

const {
  baseVisitors,
  vueVisitors,
  rnVisitors
} = require('../visitors')
const store = require('../store')



module.exports = function compile(target, code, componentJson) {
  store.set('componentJson', componentJson)
  let renderString, props = {}
  const r = babel.transformSync(code, {
    presets: [
      // "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: ["@babel/plugin-proposal-class-properties"]
  })
  let ast = parser.parse(r.code)
  const params = {}
  
  const visitors = target === 'vue' ? vueVisitors : rnVisitors
  Object.values(baseVisitors.concat(visitors)).forEach(visitor => {
    traverse(ast, visitor)
  })
  const compiled = generate(ast, {}, r.code)
  // const f = new Function(`var React=${toObject(React)};${compiled.code}return new ${componentJson.name}({})`)
  // renderString = 'function ' + f().render.toString()
  // store.set('componentInstance', f())
  
  return {
    markedComponent: compiled.code,
    // renderString,
    params: {
      props: params.props || {}
    }
  }
}