const toVueTemplate = require('./toVueTemplate')
const toRNTemplate = require('./toRNTemplate')

const tabSize = '  '

module.exports = function toTemplate(target, jsxTree, index = 0) {
  if (target === 'vue') {
    require('fs').writeFileSync('./1.json', JSON.stringify(jsxTree, null, 2), 'utf8')
    return toVueTemplate(tabSize, jsxTree, index)
  }
  if (target === 'rn') {
    console.log(JSON.stringify(jsxTree, null, 2))
    return toRNTemplate(tabSize, jsxTree, index)
  }
}
