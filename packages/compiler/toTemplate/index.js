const toVueTemplate = require('./toVueTemplate')

const tabSize = '  '
function toTemplate(target, jsxTree, index = 0) {
  if (target === 'vue') {
    console.log('=============================')
    console.log('========== jsxTree ===========')
    console.log(jsxTree)
    return toVueTemplate(tabSize, jsxTree, index)
  }
}
module.exports = toTemplate