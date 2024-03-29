const {
  isComponentName
} = require('../utils')

let componentId = 0
const h = (tagNameOrComponentName, attrs, ...children) => {
  const tree = {}

  tree.attrs = attrs
  tree.children = children
  if (typeof tagNameOrComponentName === 'string') {
    tree.isComponent = false
    tree.tagName = tagNameOrComponentName
    return tree
  } else {
    tree.isComponent = true
    tree.componentId = ++componentId
    tree.tagName = tagNameOrComponentName.name
    return dispatchWithParams(tagNameOrComponentName, { componentId })
  }
}

const dispatchWithParams = (component, params) => {
  const result = component({})
  return {...result, ...params}
}

const renderToDom = () => {
  
}

module.exports = {
  h,
  dispatchWithParams,
  renderToDom
}