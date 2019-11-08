const toVueTemplate = require('./toVueTemplate')
const toRNTemplate = require('./toRNTemplate')

const tabSize = '  '

module.exports = function toTemplate(target, jsxTree, index = 0) {
  if (target === 'vue') {
    return toVueTemplate(tabSize, jsxTree, index)
  }
  if (target === 'rn') {
    return toRNTemplate(tabSize, jsxTree, index)
  }
}
