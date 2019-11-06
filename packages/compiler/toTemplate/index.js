const toVueTemplate = require('./toVueTemplate')

const tabSize = '  '

module.exports = function toTemplate(target, jsxTree, index = 0) {
  if (target === 'vue') {
    console.log('=============================')
    console.log('========== jsxTree ===========')
    return toVueTemplate(tabSize, jsxTree, index)
  }
}
