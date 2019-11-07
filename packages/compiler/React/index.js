const vueReact = require('./vueReact')
const rnReact = require('./rnReact')

module.exports = function getReactEnvironment(target) {
  if (target === 'vue') {
    return vueReact
  }
  if (target === 'rn') {
    return rnReact
  }
}