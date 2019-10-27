const toVueTemplate = require('./toVueTemplate')

const tabSize = '  '
function toTemplate(target, jsxTree, index = 0) {
  if (target === 'vue') {
    return toVueTemplate(tabSize, jsxTree, index)
  }
}
module.exports = toTemplate