const store = require('../../../store')
const {
  safeGet,
  ast2code,
  array
} = require('../../../utils')

module.exports = function saveStoreAboutUniqueId(node, lastStackItem) {
  // if (!Array.isArray(store.sfRelations[uniqueId])) {
  //   store.sfRelations[uniqueId] = []
  // }
  // if (!Array.isArray(store.fsRelations[lastStackItem])) {
  //   store.fsRelations[lastStackItem] = []
  // }
  // store.sfRelations[uniqueId].push(lastStackItem)
  // store.fsRelations[lastStackItem].push(uniqueId)


  let uniqueId
  const tagName = node.openingElement.name.name
  let __className = '', className = ''
  let id = ''

  for (let i = 0; i < node.openingElement.attributes.length; i++) {
    const item = node.openingElement.attributes[i]
    if (item.type === 'JSXAttribute') {
      if (item.name.name.trim() === 'id') {
        id = item.value.value.trim()
      }
      if (item.name.name.trim() === 'className') {
        className = item.value.value.trim()
      }
      if (item.name.name.trim() === '__className') {
        __className = item.value.value.trim()
        uniqueId = __className
      }
    }
  }
  if (!Array.isArray(store.sfRelations[uniqueId])) {
    store.sfRelations[uniqueId] = []
  }
  if (!Array.isArray(store.fsRelations[lastStackItem])) {
    store.fsRelations[lastStackItem] = []
  }
  store.sfRelations[uniqueId].push(lastStackItem)
  store.fsRelations[lastStackItem].push(uniqueId)

  store.tagsInfo[uniqueId] = {
    tagName,
    __className,
    className,
    id
  }
  return uniqueId
}