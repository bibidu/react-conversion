
const code = `
class Button extends React.Component{
  show = () => {
    console.log('show')
    // this.setState({
    // 	cool: true
    // })
  }
  render(){
    const { msg } = this.props
    return (
      <div>
        <button onClick={this.show}>{ msg ? '隐藏' : '显示'}Toast</button>
        <div>
          <div>
            { msg || 'toast' }
          </div>
        </div>
      </div>
    )
  }
}`
const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const t = require('@babel/types')
const generate = require('@babel/generator').default
const r = babel.transformSync(code, {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-proposal-class-properties"]
});
// console.log(r.code)
const ast = parser.parse(r.code)
traverse(ast, {
  CallExpression(path) {
    if (path.node.callee.object && path.node.callee.object.name === 'React' && path.node.callee.property.name === 'createElement') {
      Array.from(path.node.arguments).forEach(arg => {
        if (arg.type === 'ConditionalExpression') {
          const code = generate(arg, {}).code
          path.replaceWith(t.identifier("`@@ternary__" + code + "`"))
        }
      })
    }
  }
})
const compiled = generate(ast, {}, r.code)
console.log(compiled.code);
// const revertCode = babel.transform(r.code, {
//   plugins: [  
//     { 
//       visitor: {
//         ConditionalExpression(_path) {
//           var preOperationAST = babel.template('FUN_NAME()');
//           console.log('ConditionalExpression')
//           _path.replaceWith(
//             preOperationAST({
//               FUN_NAME: t.identifier('dxz'),
//             })
//           )
//         }
//       }
//     },
//   ]
// })
// console.log(revertCode);
// let cache = babel.transform(
//   code,
//   {
//     presets: [
//       ["es2015", { "loose": false }],
//       "stage-1"
//     ],
//     plugins: [  
//       // ["transform-remove-strict-mode"],
//       // ["transform-decorators-legacy"],
//       ["transform-class-properties", { "spec": true }]
//     ]
//   }
// )
// console.log(cache.code);
// let t = babel.transform(
//   cache.code,
//   {
//     plugins: [  
//       { visitor: visitor },
//     ]
//   }
// )