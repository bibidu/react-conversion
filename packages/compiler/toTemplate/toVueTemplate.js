const {
  vueReplaceMark,
  vueReplaceKey
} = require('../replaceMarks')

const target = 'vue'

function makeIf(ifs) {
  let condition = ifs.map(item => vueReplaceMark(item)[1]).join("")
  if (condition.slice(-2) === '&&') {
    condition = condition.slice(0, -2)
  }
  if (condition.slice(-2) === '||') {
    condition = condition.slice(0, -2)
    condition = `!(${condition})`
  }
  return condition
}

module.exports = function toVueTemplate(tabSize, jsxTree, index, parentFor = []) {
  const block = tabSize.repeat(index)
  let template = ''
  if (jsxTree.tagName === 'text') {
    template += `${vueReplaceMark(jsxTree.value, parentFor)[1]}`
  } else {
    template += `<${jsxTree.tagName}`
  }
  if (jsxTree.if) {
    template += ` v-if="${makeIf(jsxTree.if)}"`
  }
  if (jsxTree.for) {
    parentFor.unshift(jsxTree.for)
    const { list, item, index } = jsxTree.for
    const iteratorItem = index ? `(${item},${index})` : item
    template += ` v-for="${iteratorItem} in ${list}"`
  }
  Object.entries(jsxTree.attrs || {}).forEach(([key, value]) => {
    const [attrPrefix, replacedValue] = vueReplaceMark(value, parentFor)
    const operator = replacedValue ? '=' : ''
    template += ` ${attrPrefix}${vueReplaceKey(key)}${operator}${replacedValue}`
  })
  if (jsxTree.tagName !== 'text') {
    template += `>`;
  }

  (jsxTree.children || []).forEach((child, idx) => {
    // const prevAndCurrentIsText = idx !== 0 && child.tagName === 'text'
    //   && jsxTree.children[idx - 1].tagName === 'text'
    const prevAndCurrentIsText = child.tagName === 'text'
    const block = prevAndCurrentIsText ? '' : `\n${tabSize.repeat(index + 1)}`
    template += `${block}${toVueTemplate(tabSize, child, index + 1, parentFor)}`
  })

  if (jsxTree.tagName !== 'text') {
    if ((jsxTree.children || []).length === 1 && jsxTree.children[0].tagName === 'text') {
      template += `</${jsxTree.tagName}>`
    } else {
      template += `\n${block}</${jsxTree.tagName}>`
    }
  }
  return template
}