const toVueTemplate = require('./toVueTemplate')

const tabSize = '  '
function toTemplate(target, jsxTree, index = 0) {
  if (target === 'vue') {
    console.log('=============================')
    console.log('========== jsxTree ===========')
    // console.log(JSON.stringify(jsxTree, null, 2))
    // require('fs').writeFileSync('jsx.json', JSON.stringify(jsxTree, null, 2), 'utf8')
    return toVueTemplate(tabSize, jsxTree, index)
  }
}
module.exports = toTemplate