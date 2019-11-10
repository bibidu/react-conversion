const {
  ast2code,
  isReactDom
} = require('../../utils')
const store = require('../../store')


module.exports = {
  CallExpression(path) {
    if (isReactDom(path.node)) {
      console.log('dd');
      console.log(ast2code(path.node));
      // console.log(store);
    }
  }
}