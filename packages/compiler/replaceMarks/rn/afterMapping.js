const store = require('../../store')

module.exports = function afterMapping(mappingReturn) {
  store.add('rnTags', mappingReturn.tagName)
}