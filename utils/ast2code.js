const generate = require('@babel/generator').default

module.exports = function ast2code(ast) {
  const code = generate(ast, {}).code
  return code
}