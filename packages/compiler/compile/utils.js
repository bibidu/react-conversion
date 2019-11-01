const generate = require('@babel/generator').default

function ast2code(ast) {
  const code = generate(ast, {}).code
  return code
}

module.exports = {
  ast2code
}