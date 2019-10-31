const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const t = require('@babel/types')
const generate = require('@babel/generator').default

const React = require('../React')
const { toObject } = require('../utils')

function ast2code(ast) {
  const code = generate(ast, {}).code
  return code
}

function compile(code) {
  let renderString, props = {}
  const r = babel.transformSync(code, {
    presets: [
      // "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: ["@babel/plugin-proposal-class-properties"]
  })
  // console.log(r.code);
  const ast = parser.parse(r.code)

  traverse(ast, {
    Program(path) {
      Array.from(path.node.body).forEach(child => {
        if (child.type == 'ExpressionStatement') {
          if (child.expression.left.property.name === 'propTypes') {
            Array.from(child.expression.right.properties).forEach(prop => {
              props[prop.key.name] = {
                prop: prop.key.name,
                type: prop.value.value,
              }
            })
          }
        }
      })
    },
    CallExpression(path) {
      if (path.node.callee.object && path.node.callee.object.name === 'React' && path.node.callee.property.name === 'createElement') {
        const attrExpression = path.node.arguments[1]
        const chlidrenElement = path.node.arguments[2]
        // attrs的每个value添加标记
        if (attrExpression !== null && attrExpression.type === 'ObjectExpression') {
          Array.from(attrExpression.properties).forEach(prop => {
            const code = ast2code(prop.value)
            prop.value = t.identifier("`@@attrValue__" + code + "`")
          })
        }
        if (chlidrenElement.type === 'Literal') {
          // list.map
          if (chlidrenElement.callee.object.type === 'Identifier') {
            const list = chlidrenElement.callee.object.name
            const method = chlidrenElement.callee.property.name
          }
        }
      }
    },
    ConditionalExpression(path) {
      const code = ast2code(path.node)
      path.replaceWith(t.identifier("`@@string__" + code + "`"))
    },
    LogicalExpression(path) {
      const code = ast2code(path.node)
      path.replaceWith(t.identifier("`@@string__" + code + "`"))
    }
  })
  const compiled = generate(ast, {}, r.code)
// console.log(compiled.code)
  const f = new Function(`var React=${toObject(React)};${compiled.code}return new Button({})`)
  renderString = 'function ' + f().render.toString()
  return {
    renderString,
    params: {
      props
    }
  }
}
module.exports = compile