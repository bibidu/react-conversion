const react = require('./react')

module.exports = vueReact = {
	Component: react.Component,
  createElement: function(tagNameOrComponentName, attrs, ...children) {
    const tree = {}
    tree.tagName = tagNameOrComponentName
    tree.attrs = attrs
    tree.children = []
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
  },
  logic: function(...args) {
    const element = args[args.length - 1]
    if (typeof element === 'object') {
      element.if = args.slice(0, -1)
      return element
    } else {
      return {
        tagName: 'template',
        if: args.map((i, idx) => {
          if (typeof i === 'object' && idx !== args.length - 1) {
            return "1"
          }
          return i
        }),
        attrs: null,
        value: '',
        children: []
      }
    }
  },
  ternary(params) {
  }
}