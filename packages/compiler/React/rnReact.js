const react = require('./react')

module.exports = rnReact = {
	Component: react.Component,
  createElement: function(tagNameOrComponentName, attrs, ...children) {
    const tree = {}
    tree.tagName = tagNameOrComponentName
    tree.attrs = attrs
    tree.children = []
    children.forEach((child, idx) => {
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
  constant(element, after) {
    return {
      type: 'ternary',
      after,
      value: element,
      children: []
    }
  },
  logicWrapper(...args) {
    const obj = args.reverse().reduce((prev, curr, idx) => {
      if (idx === 1) {
        prev.after = '}'
      }
      if (idx === args.length - 1) {
        curr.before = '{'
      }
      curr.next = prev
      return curr
    })
    console.log('obj')
    console.log(obj)
    return obj
  },
  merge(obj, attrs) {
    Object.keys(attrs).forEach(attr =>{
      obj[attr] = attrs[attr]
    })
    return obj
  }
}