const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const React = require('../React')
const { toObject } = require('../utils')
const generate = require('@babel/generator').default

const visitors = require('../visitors')
const afterCompileMake = require('./afterCompileMake')



module.exports = function compile(code) {
  let renderString, props = {}
  const r = babel.transformSync(code, {
    presets: [
      // "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: ["@babel/plugin-proposal-class-properties"]
  })
  console.log('=============================')
  console.log('========== 原始jsx ===========')
  console.log(r.code);
  let ast = parser.parse(r.code)

  const params = {}
  Object.values(visitors).forEach(visitor => {
    visitor(traverse, ast, params)
  })

  const compiled = generate(ast, {}, r.code)
  console.log('=============================')
  console.log('========== 标记后jsx ===========')
  console.log(compiled.code)

  const f = new Function(`var React=${toObject(React)};${compiled.code}return new Button({})`)
  renderString = 'function ' + f().render.toString()

  // 字符串后处理
  renderString = afterCompileMake(renderString)
  return {
    renderString,
    params: {
      props: params.props || {}
    }
  }
}