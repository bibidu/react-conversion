const store = require('../../../store')
const {
  safeGet,
  ast2code,
  array
} = require('../../../utils')

module.exports = function saveStoreAboutUniqueId(path, lastStackItem) {
  const uniqueId = path.arguments[1].properties[0].value.value

  const tagName = path.arguments[0].value
  let __className = '', className = ''
  let id = ''

  for (let i = 0; i < path.arguments[1].properties.length; i++) {
    const item = path.arguments[1].properties[i]
    if (item.key.name.trim() === 'id') {
      id = item.value.value.trim()
    }
    if (item.key.name.trim() === 'className') {
      className = item.value.value.trim()
    }
    if (item.key.name.trim() === '__className') {
      __className = '"' + item.value.value.trim() + '"'
    }
  }
  ;(store.sfRelations[uniqueId] || (store.sfRelations[uniqueId] = [])).push(lastStackItem)
  ;(store.fsRelations[lastStackItem] || (store.fsRelations[lastStackItem] = [])).push(uniqueId)
  store.tagsInfo[uniqueId] = {
    tagName,
    __className,
    className,
    id
  }
  return uniqueId
}