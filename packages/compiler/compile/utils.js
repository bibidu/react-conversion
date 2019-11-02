const generate = require('@babel/generator').default
const parser = require('@babel/parser')

function ast2code(ast) {
  const code = generate(ast, {}).code
  return code
}
function code2ast(code) {
  console.log('code')
  console.log(code)
  const ast = parser.parse(code)
  return ast
}
module.exports = {
  ast2code,
  code2ast
}