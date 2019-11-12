const t = require('@babel/types')
const {
  array,
  ast2code,
  isReactDom
} = require('../../../utils')

const ignoreText = ['']

module.exports = {
  JSXElement(path) {
    const tagName = path.node.openingElement.name.name
    const children = []
    array(path.node.children).forEach((child, idx) => {
      if (
        child.type === 'JSXText'
        && !ignoreText.includes(child.value.trim())
      ) {
        if (!['span'].includes(tagName)) {
          path.node.children[idx] = t.jsxElement(
            t.jsxOpeningElement(t.JSXIdentifier('span'), []),
            t.jsxClosingElement(t.JSXIdentifier('span')),
            [child],
            false
          )
        }
      }
    })
  }
}