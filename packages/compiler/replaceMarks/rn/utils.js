
module.exports.setJsxTreeTagName = function(jsxTree, newTagName) {
  jsxTree.tagName = newTagName
}

module.exports.setJsxTreeStyles = function(jsxTree, styles) {
  if (!styles) return
  jsxTree.attrs = jsxTree.attrs || {}
  jsxTree.attrs.styles = jsxTree.attrs.styles || {}
  jsxTree.attrs.styles = Object.assign(styles, jsxTree.attrs.styles)
}