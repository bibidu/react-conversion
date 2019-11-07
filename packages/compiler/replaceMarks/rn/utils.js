
module.exports.setJsxTreeTagName = function(jsxTree, newTagName) {
  jsxTree.tagName = newTagName
}

module.exports.setJsxTreeStyles = function(jsxTree, styles) {
  if (!styles) return
  jsxTree.attrs = jsxTree.attrs || {}
  jsxTree.attrs.style = jsxTree.attrs.style || {}
  jsxTree.attrs.style = Object.assign(styles, jsxTree.attrs.style)
}