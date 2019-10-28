const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const t = require('@babel/types')
const generate = require('@babel/generator').default

function ast2code(ast) {
  const code = generate(ast, {}).code
  return code
}

function compile(code) {
  const r = babel.transformSync(code, {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: ["@babel/plugin-proposal-class-properties"]
  })

  const ast = parser.parse(r.code)

  traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.object && path.node.callee.object.name === 'React' && path.node.callee.property.name === 'createElement') {
        Array.from(path.node.arguments).forEach(astNode => {
          if (astNode.type === 'ConditionalExpression') {
            const code = ast2code(astNode)
            path.replaceWith(t.identifier("`@@ternary__" + code + "`"))
          }
        })
      }
    }
  })
  const compiled = generate(ast, {}, r.code)
  return compiled.code
}
// test
const code = `class Button extends React.Component{
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
console.log(compile(code))
// module.exports = compile