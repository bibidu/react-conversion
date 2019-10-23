var walk = require('estree-walker').walk;
const { Parser } = require('acorn')
const MyParser = Parser.extend(
  // require("acorn-jsx")(),
  // require("acorn-bigint")
)
module.exports = function extract(code) {
  const ast = MyParser.parse(code)
  
  walkAst(ast)
}
var f = false
function walkAst(ast) {
  const components = {}
  walk( ast, {
    enter: function ( node, parent, prop, index ) {
    //   if (!f) {
    //     f = !f
    //   console.log(parent)
    // }
      if (node.type === 'VariableDeclaration' && parent && parent.type === 'Program') {
        // && isComponentName(node.id.name)
        Array.from(node.declarations).forEach(dec => {
          if (isComponentName(dec.id.name)) {
            components[dec.id.name] = {
              name: dec.id.name,
              node: dec
            }
          }
        })
      }
    },
    leave: function ( node, parent, prop, index ) {

    }
  });
  // console.log(components);
  console.log(Object.keys(components));
}

const isComponentName = (name) => {
  const firstChar = name.slice(0, 1)
  return /[a-zA-Z]/.test(firstChar) && firstChar === firstChar.toUpperCase()
}