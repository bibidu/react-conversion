const tagNameMappingFn = require('../replaceMarks/rn/tagNameMapping')
const {
  rnReplaceMark
} = require('../replaceMarks')

module.exports = function toRNTemplate(tabSize, jsxTree, index, parentFor = []) {
  console.log('toRNTemplate')
  // 替换标签
  tagNameMappingFn(jsxTree)
  // require('fs').writeFileSync('./2.json', JSON.stringify(jsxTree, null, 2), 'utf8')
  // 生成RN模板
  const str = genRnCode(jsxTree)
  console.log('resault')
  console.log('====================')
  console.log(str)
  // console.log(jsxTree)
}

const tabSize = 2
const block = (tab) => '  '.repeat(tab)
function genRnCode(jsxTree, tab = 0) {
  let str = ''
  const {
    tagName, attrs, for: fors, children
  } = jsxTree


  if (fors) {
    const { list, item, index } = fors
    const mapParam = index !== undefined ? `(${item}, ${index})` : item
    str += `${block(tab)}{`
    str += `${list}.map(${mapParam} => (\n`
  }

  str += `${block(++tab)}<${tagName}`

  Object.entries(attrs || {}).forEach(([key, value]) => {
    const [ prefix, removeMarkValue ] = rnReplaceMark(value)
    str += ` ${key}=${removeMarkValue}`
  })
  str += `>\n`


  children.forEach(child => str += genRnCode(child, ++tab))

  str += `\n${block((tab))}</${tagName}>`


  if (fors) {
    str += `\n${block((tab))})`
    str += `${block((tab))}}`
  }

  return str
}