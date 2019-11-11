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
    const initialInlineStyles = extractStyleAttr(attrs, {})
    // 替换标签及事件名
    const tagStyle = replaceTag(path)
    const injectStyles = inlineStyles[__className] || {}
    const mergeStyle = Object.assign(injectStyles, tagStyle, initialInlineStyles)
    // 替换样式
    setAttr(attrs, replaceStyle(mergeStyle))
    // 移除__className
    removeUniqueId(path)
  }
}


function removeUniqueId(path) {
  const args = path.node.openingElement.attributes.filter(
    item => item.name.name !== '__className'
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

function extractStyleAttr(attrs, def) {
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
      }
    }
  }
  return style
}
function setAttr(attrs, injectStyles) {
  const jsxAttributes = []
  attrs.push(
    t.jsxAttribute(
      t.jsxIdentifier('style'),
      t.JSXExpressionContainer(
        t.objectExpression(
          Object.entries(injectStyles).map(([key, value]) => {
            return t.objectProperty(
              t.Identifier(key),
              typeof value === 'number' ?
                t.NumericLiteral(value) : t.StringLiteral(value),
            )
          })
        )
      )
    )
  )
}