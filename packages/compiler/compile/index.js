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
  let renderString
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
    CallExpression(path) {
      if (path.node.callee.object && path.node.callee.object.name === 'React' && path.node.callee.property.name === 'createElement') {
        const objectExp = path.node.arguments[1]
        if (objectExp !== null && objectExp.type === 'ObjectExpression') {
          Array.from(objectExp.properties).forEach(prop => {
            const code = ast2code(prop.value)
            prop.value = t.identifier("`@@attrValue__" + code + "`")
          })
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

  const f = new Function(`var React=${toObject(React)};${compiled.code}return new Button({})`)
  renderString = 'function ' + f().render.toString()
  return renderString
}
// test
// const code = `class Button extends React.Component{
//   show = () => {
//     console.log('show')
//     // this.setState({
//     // 	cool: true
//     // })
//   }
//   render(){
//     const { msg } = this.props
//     return (
//       <div>
//         <button onClick={this.show}>{ msg ? '隐藏' : '显示'}Toast</button>
//         <div>
//           <div>
//             { msg || 'toast' }
//           </div>
//         </div>
//       </div>
//     )
//   }
// }`
// const p = compile(code)
// // console.log(p)
// // console.log(`${p};return new Button({})`)

// console.log(p)

module.exports = compile