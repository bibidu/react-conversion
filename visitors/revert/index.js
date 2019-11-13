const t = require('@babel/types')
const {
  array,
  ast2code,
  isReactDom
} = require('../../utils')
const replaceTag = require('./replaceTag')
const replaceStyle = require('./replaceStyle')
const store = require('../../store')

// 替换标签： 原标签名 + 该标签的attrs
// 移除style： 直接删除
// 替换事件名： 原事件名
module.exports = {
  JSXElement(path) {
    const inlineStyles = store.inlineStyle
    const tagName = path.node.openingElement.name.name
    const attrs = path.node.openingElement.attributes
    const __className = extractUniqueId(attrs, '__className')
    const initialInlineStyles = extractStyleAttr(attrs)
    // 替换标签及事件名
    const tagStyle = replaceTag(path)
    const injectStyles = inlineStyles[__className] || {}
    const mergeStyle = Object.assign(injectStyles, tagStyle)
    // 替换样式
    const styleSheet = setStyleSheet(attrs, [replaceStyle(mergeStyle), replaceStyle(initialInlineStyles)], __className)
    // 移除__className
    removeUniqueId(path, ['__className'])
  },

}


function removeUniqueId(path, attrs) {
  const args = path.node.openingElement.attributes.filter(
    item => !attrs.includes(item.name.name)
  )
  path.node.openingElement.attributes = args
}

function extractUniqueId(attrs, attr) {
  for (let i = 0; i < attrs.length; i++) {
    const attrItem = attrs[i]
    if (attrItem.name.name === attr) {
      return attrItem.value.value
    }
  }
  return ''
}
// TODO: 允许import引入css、并在解析完毕后删除css、允许class内static语法
function extractStyleAttr(attrs) {
  const style = {}
  for (let i = 0; i < attrs.length; i++) {
    const attrItem = attrs[i]
    if (attrItem.name.name === 'style') {
      // TODO: 支持style={styles.title}
      // 目前仅支持 style={{color: 'red', border: 'none'}}
      if (
        attrItem.value.type === 'JSXExpressionContainer'
        && attrItem.value.expression.type === 'ObjectExpression'
      ) {
        array(attrItem.value.expression.properties).forEach(prop => {
          style[prop.key.name] = prop.value.value
        })
        attrs.splice(i, 1)
      }
    }
  }
  return style
}

// injectStyles: Array | object
function setStyleSheet(attrs, injectStyles, uniqueId) {
  const haveAtLeastOneStyleAttr = injectStyles.some(style => Object.keys(style).length)

  // 动态生成的新节点不含有uniqueId "如h1内的文本标签<Text />"
  if (uniqueId && haveAtLeastOneStyleAttr) {
    const [mergeStyle, inlineStyle] = injectStyles
    uniqueId = uniqueId.slice(2)
    const styleSheet = {}
    let styleArrs = []
    if (Object.keys(mergeStyle).length) {
      styleSheet[uniqueId] = mergeStyle
      styleArrs.push(['styles', uniqueId])
    }
    if (Object.keys(inlineStyle).length) {
      uniqueId = uniqueId + '_inline'
      styleSheet[uniqueId] = inlineStyle
      styleArrs.push(['styles', uniqueId])
    }
    // 将styleSheet添加到store
    store.styleSheet = Object.assign({}, store.styleSheet, styleSheet)
    attrs.push(createArrayJSXAttr('style', styleArrs))
  }
}

function createArrayJSXAttr(attrName, values) {
  const styleNode = values.length > 1 ? t.arrayExpression(
    values.map(value => (
      t.memberExpression(
        ...(value.map(v => t.identifier(v)))
      )
    ))
  ) : t.memberExpression(
    ...(values[0].map(v => t.identifier(v)))
  )

  return t.jsxAttribute(
    t.jsxIdentifier(attrName),
    t.JSXExpressionContainer(
      styleNode
    )
  )
}