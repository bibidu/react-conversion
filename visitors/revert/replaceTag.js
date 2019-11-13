const t = require('@babel/types')
const store = require('../../store')

const ViewTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const TextTags = ['span']
const tagAutoStyle = {
  h1: { fontSize: '32px', fontWeight: 'bold' },
  h2: { fontSize: '24px', fontWeight: 'bold' },
  h3: { fontSize: '18px', fontWeight: 'bold' },
  h4: { fontSize: '16px', fontWeight: 'bold' },
  h5: { fontSize: '13px', fontWeight: 'bold' },
  h6: { fontSize: '12px', fontWeight: 'bold' },
}

function convertTag(path, tagName) {
  path.node.openingElement.name = t.JSXIdentifier(tagName)
  path.node.closingElement.name = t.JSXIdentifier(tagName)
}
function convertEvent(path, index, eventName) {
  path.node.openingElement.attributes[index].name = t.JSXIdentifier(eventName)
}
module.exports = function replaceTag(path) {
  const _replace = (fnName, ...args) => fnName(path, ...args)
  const tagName = path.node.openingElement.name.name
  const clickEventIndex = path.node.openingElement.attributes.findIndex(attr => attr.name.name === 'onClick')

  if (clickEventIndex > -1) {
    _replace(convertTag, "TouchableOpacity")
    _replace(convertEvent, clickEventIndex, "onPress")
    store.rnUsingTags.add("TouchableOpacity")
    return {}
  }
  if (ViewTags.includes(tagName)) {
    _replace(convertTag, "View")
    store.rnUsingTags.add("View")
    return tagAutoStyle[tagName]
  }
  if (TextTags.includes(tagName)) {
    _replace(convertTag, "Text")
    store.rnUsingTags.add("Text")
    return {}
  }
}