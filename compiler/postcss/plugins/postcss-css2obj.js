
const postcss = require('postcss')

const isRule = node => node.type === 'rule'
const isDecl = node => node.type === 'decl'
module.exports = postcss.plugin('css2obj', opts => {
  const collectCssObj = opts.collectCssObj
	return (root, result) => {
    const obj = {}
    root.walk(node => {
      if (isRule(node)) {
        obj[node.selector] = {}
      }
      if (isDecl(node)) {
        obj[node.parent.selector][node.prop] = node.value
      }
    })
    collectCssObj(obj)
  }
})