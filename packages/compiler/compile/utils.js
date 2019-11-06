const generate = require('@babel/generator').default
const parser = require('@babel/parser')

module.exports.ast2code = function ast2code(ast) {
  const code = generate(ast, {}).code
  return code
}
module.exports.code2ast = function code2ast(code) {
  console.log('code')
  console.log(code)
  const ast = parser.parse(code)
  return ast
}