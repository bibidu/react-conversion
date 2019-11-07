const beforeMapping = require('./beforeMapping')
const afterMapping = require('./afterMapping')
const {
  setJsxTreeTagName,
  setJsxTreeStyles
} = require('./utils')

const baseReturn = (tagName, styles) => {
  return { tagName, styles }
}
const mappings = {
  div: function(tagName, attrs) {
    if (!attrs || ['onClick'].some(event => !Object.keys(attrs).includes(event)))
      return baseReturn('View')
    return baseReturn('TouchableOpacity')
  },
  a: function() {
    return baseReturn('View')
  },
  h1: function() {
    return baseReturn('View', { fontSize: 28, lineHeight: 700 })
  },
  button: function() {
    return baseReturn('Button')
  },
  text: function() {
    return baseReturn('Text')
  }
}

function mappingFn(jsxTree) {
  let fn
  if (!(fn = mappings[jsxTree.tagName])) {
    const error = `暂不支持转义标签: "${jsxTree.tagName}"！！！`
    throw new Error(error)
  }
   const {
     tagName: newTagName,
     styles
   } = fn(jsxTree.tagName, jsxTree.attrs)

   setJsxTreeTagName(jsxTree, newTagName)
   setJsxTreeStyles(jsxTree, styles)

  jsxTree.children.forEach(child => mappingFn(child))
}


Object.entries(mappings).forEach(([tagName, fn]) => {
  const _fn = fn
  fn = function({ tagName, attrs }) {
    const revertTagName = beforeMapping(tagName)
    const newTagName = _fn(revertTagName, attrs)
    afterMapping(newTagName)
  }
})

module.exports = mappingFn