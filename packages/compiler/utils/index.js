const React = {
	Component: class {
    constructor(p){
      this.props = p || {}
    }
  },
  createElement: function(tagNameOrComponentName, attrs, ...children) {
    console.log('createElement')
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
      } else {
        child && tree.children.push(child)
      }
    })
    return tree
  }
}

function createInstance(Clazz, props) {
  return new Clazz(props)
}
function getRenderString(instance) {
  return instance.render.toString()
}
function bindCtx(instance) {
  const ctx = {}
  Object.keys(instance).forEach(key => ctx[key] = instance[key])
  return ctx
}
function replaceMark(str) {
  if (target === 'vue') {
    let mark 
    // 三目
    if (str.startsWith(mark = '@@ternary__')) {
      return `{{${str.split(mark)[1]}}}`
    }
    // this作用域
    if (str.startsWith(mark = '@@ctxString__')) {
      return `${str.split(mark)[1]}`
    }
    return str
  }
  throw 'no match target'
}
function generateAttrString(attrs) {
  const eventName = {
    onClick: '@click'
  }
  let attrString = '', attrStringDependencies = {}
  if (target === 'vue') {
    Object.keys(attrs).forEach(attr => {
      if (eventName[attr]) {
        const value = replaceMark(attrs[attr])
        const [prefix, restValue] = extractUsePrefix(value)
        attrString += ` ${eventName[attr]}="${restValue}"`
        attrStringDependencies[value] = {
          raw: value,
          prefix,
          restValue: restValue
        }
      }
    })
    return [attrString, attrStringDependencies]
  }
  throw 'no match target'
}
function extractUsePrefix(string) {
  const lastDotIndex = string.lastIndexOf('.')
  return [string.slice(0, lastDotIndex), string.slice(lastDotIndex + 1)]
}

function markTernary() {
  
}

function jsxCompile(componentText) {

}
function stringify(obj) {
  const mark = ``
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'function') {
        obj[key] = mark + obj[key].toString()
      }
    })
  }
  return "" + obj + ""
}
function parseFunctionMark(functionStringWithMark) {
  const mark = `@@function__`
  Object.keys(functionStringWithMark).forEach(k => {
    functionStringWithMark[k] = new Function(`return ${functionStringWithMark[k].replace(mark, '')}`)
  })
  return functionStringWithMark
}

module.exports = {
  React,
  createInstance,
  getRenderString,
  bindCtx,
  replaceMark,
  generateAttrString,
  extractUsePrefix,
  markTernary,
  jsxCompile,
  stringify,
  parseFunctionMark
}