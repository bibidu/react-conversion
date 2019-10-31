const React = {
	Component: class {
    constructor(p){
      this.props = p || {}
    }
  },
  createElement: function(tagNameOrComponentName, attrs, ...children) {
    // console.log(`=========`)
    // console.log(tagNameOrComponentName)
    const tree = {}
    tree.children = []
    tree.tagName = tagNameOrComponentName
    tree.attrs = attrs
    children.forEach(child => {
      if (typeof child === 'string') {
        tree.children.push({
          tagName: 'text',
          attrs: null,
          value: child,
          children: []
        })
      }
      else {
        child && tree.children.push(child)
      }
    })
    return tree
  },
  map: function(list, item, index) {
    return function(fn) {
      const tree = fn()
      tree.attrs = tree.attrs || {}
      tree.for = {
        list, item, index
      }
      return tree
    }
  }
}

module.exports = React