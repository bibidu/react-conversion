const {
  replaceMark,
  replaceKey
} = require('../replaceMarks')

const target = 'vue'

module.exports = function toVueTemplate(tabSize, jsxTree, index) {
  const block = tabSize.repeat(index)
  let template = ''
  if (jsxTree.tagName === 'text') {
    template += `${replaceMark(jsxTree.value)}`
  } else {
    template += `<${jsxTree.tagName}`
  }
  Object.entries(jsxTree.attrs || {}).forEach(([key, value]) => {
    template += ` ${replaceKey(key)}=${replaceMark(value)}`
  })
  if (jsxTree.tagName !== 'text') {
    template += `>`;
  }

  (jsxTree.children || []).forEach((child, idx) => {
    const prevAndCurrentIsText = idx !== 0 && child.tagName === 'text'
      && jsxTree.children[idx - 1].tagName === 'text'
    const block = prevAndCurrentIsText ? '' : `\n${tabSize.repeat(index + 1)}`
    template += `${block}${toVueTemplate(tabSize, child, index + 1)}`
  })

  if (jsxTree.tagName !== 'text') {
    template += `\n${block}</${jsxTree.tagName}>`
  }
  return template
}