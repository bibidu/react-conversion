const fs = require("fs")
const path = require("path")
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const code = fs.readFileSync(path.join(__dirname, '../component/index.js'), 'utf8')
const visitors = require('../visitors')
const store = require('../store')

const r = babel.transformSync(code, {
  presets: [
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-proposal-class-properties"]
})

const ast = parser.parse(r.code)

visitors.forEach(visitor => {
  traverse(ast, visitor)
})

console.log(store)

