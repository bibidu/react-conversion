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
  h2: function() {
    return baseReturn('View', { fontSize: 24, lineHeight: 600 })
  },
  h3: function() {
    return baseReturn('View', { fontSize: 20, lineHeight: 600 })
  },
  button: function() {
    return baseReturn('Button')
  },
  text: function() {
    return baseReturn('Text')
  }
}

function mappingFn(jsxTree) {
  
  if (jsxTree.tagName) {
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
  }

  jsxTree.children.forEach(child => mappingFn(child))
  if (jsxTree.next) {
    mappingFn(jsxTree.next)
  }
}


Object.entries(mappings).forEach(([tagName, fn]) => {
  const _fn = fn
  mappings[tagName] = function(tagName, attrs) {
    const revertTagName = beforeMapping(tagName)
    const mappingReturn = _fn(revertTagName, attrs)
    afterMapping(mappingReturn)
    
    return mappingReturn
  }
})

module.exports = mappingFn