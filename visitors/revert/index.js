const t = require('@babel/types')
const {
  array,
  ast2code,
  isReactDom
} = require('../../utils')
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
    let injectStyles
    if (injectStyles = inlineStyles[__className]) {
      const mergeStyle = Object.assign(injectStyles, initialInlineStyles)
      // TODO: 样式转换
      setAttr(attrs, mergeStyle)
    }
    // TODO: 移除__className
    // TODO: 替换标签名、替换事件名
  }
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
  for (let i = 0; i < attrs.length; i++) {
    const attrItem = attrs[i]
    if (attrItem.name.name === 'style') {
      // TODO: 目前仅支持 style={styles.title}、 style={{color: 'red', border: 'none'}}两种写法
      // style={style.title}
      if (attrItem.value.type === 'JSXExpressionContainer') {

      }
    }
  }
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
              t.StringLiteral(value),
            )
          })
        )
      )
    )
  )
}