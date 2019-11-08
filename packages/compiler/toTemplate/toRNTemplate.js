const store = require('../store')
const tagNameMappingFn = require('../replaceMarks/rn/tagNameMapping')
const {
  rnReplaceMark
} = require('../replaceMarks')

module.exports = function toRNTemplate(tabSize, jsxTree, index, parentFor = []) {
  // 替换标签
  tagNameMappingFn(jsxTree)
  // 生成RN 顶部引用
  const imports = genRnImports()

  // 生成RN render中除了h函数的部分
  const renderExceptH = getRenderExceptH()
  // 生成RN render.template
  const renderTemplate = genRnRenderTemplate(jsxTree)
  // 生成RN 底部export
  const exportTemplate = genRnExportTemplate()
  const renderFn = renderWrapper(renderExceptH, renderTemplate)
  const template = `${imports}\n${renderFn}\n${exportTemplate}`
  return template
}

const tabSize = 2
const block = (tab) => '  '.repeat(tab)

function genRnExportTemplate() {
  const { name: componentName } = store.get('componentJson')
  return `\nexport default ${componentName}`
}
function renderWrapper(renderExceptH, renderTemplate) {
  const { name: componentName } = store.get('componentJson')
  return `class ${componentName} extends React.Component {
    render() {
      ${renderExceptH}\n
      return (
        ${renderTemplate}
      )
    }
  }` 
}
function getRenderExceptH() {
  const exceptHs = store.get('renderExceptH') || []
  return exceptHs.join('\n')
}
function genRnImports() {
  let str = `import React, { Component } from 'react'\n`
  const tagsSet = store.get('rnTags')
  const tagsArr = ([...tagsSet]).concat('StyleSheet')
  tagsArr.map((tag, idx) => {
    if (idx === 0) {
      str += `{`
    }
    str += ` ${tag},`
    if (idx === tagsArr.length - 1) {
      str += `}`
    }
  }, str += `import `)
  str = str.replace(/,}$/, ' }')
  str += `from 'react-native'`
  return str
}

function genRnRenderTemplate(jsxTree, tab = 0) {
  let str = ''
  const {
    type, tagName, attrs, for: fors, if: ifs, value, next, before, after, children
  } = jsxTree

  if (type === 'ternary') {
    if (before) {
      str += `${block(tab)}${before}`
    } else {
      str += `${block(tab)}`
    }
    str += rnReplaceMark(value)[1]
    str += after
  }

  if (fors) {
    const { list, item, index } = fors
    const mapParam = index !== undefined ? `(${item}, ${index})` : item
    str += `${block(tab)}{`
    str += `${list}.map(${mapParam} => (\n`
  }


  if (ifs && ifs.length) {
    str += ifs.reduce((prev, curr) => {
      return prev + rnReplaceMark(curr)[1]
    }, `${block(tab)}{`)
    str += '('
  } else {
    str += `${block(tab)}`
  }

  if (tagName) {
    str += `<${tagName}`
  }

  Object.entries(attrs || {}).forEach(([key, value]) => {
    const [ prefix, removeMarkValue ] = rnReplaceMark(value)
    str += ` ${key}=${removeMarkValue}`
  })
  if (tagName) {
    str += `>\n`
  }

  if (tagName === 'Text') {
    const [ prefix, removeMarkValue ] = rnReplaceMark(value)
    str += `${block(tab + 1)}${removeMarkValue}`
  }

  children.forEach(child => str += genRnRenderTemplate(child, tab + 1))

  if (tagName) { 
    str += `\n${block(tab)}</${tagName}>`
    if (after) {
      str += after
    }
  }

  if (ifs && ifs.length) {
    str += ')}\n'
  }

  if (fors) {
    str += `\n${block((tab))})}\n`
  }

  if (next) {
    str += genRnRenderTemplate(next, tab)
  }

  return str
}