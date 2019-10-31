const {
  replaceMark,
  replaceKey
} = require('../replaceMarks')

const target = 'vue'

module.exports = function toVueTemplate(tabSize, jsxTree, index, parentFor = []) {
  const block = tabSize.repeat(index)
  let template = ''
  if (jsxTree.tagName === 'text') {
    template += `${replaceMark(jsxTree.value)[1]}`
  } else {
    template += `<${jsxTree.tagName}`
  }
  if (jsxTree.for) {
    parentFor.unshift(jsxTree.for)
    const { list, item, index } = jsxTree.for
    template += ` v-for="(${item}${index ? ', ' + index : ''}) in ${list}"`
  }
  Object.entries(jsxTree.attrs || {}).forEach(([key, value]) => {
    const [attrPrefix, replacedValue] = replaceMark(value, parentFor)
    template += ` ${attrPrefix}${replaceKey(key)}=${replacedValue}`
  })
  if (jsxTree.tagName !== 'text') {
    template += `>`;
  }

  (jsxTree.children || []).forEach((child, idx) => {
    const prevAndCurrentIsText = idx !== 0 && child.tagName === 'text'
      && jsxTree.children[idx - 1].tagName === 'text'
    const block = prevAndCurrentIsText ? '' : `\n${tabSize.repeat(index + 1)}`
    template += `${block}${toVueTemplate(tabSize, child, index + 1, parentFor)}`
  })

  if (jsxTree.tagName !== 'text') {
    template += `\n${block}</${jsxTree.tagName}>`
  }
  return template
}