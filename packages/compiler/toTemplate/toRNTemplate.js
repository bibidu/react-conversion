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
    tagName, attrs, for: fors, if: ifs, value, children
  } = jsxTree

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

  str += `<${tagName}`


  Object.entries(attrs || {}).forEach(([key, value]) => {
    const [ prefix, removeMarkValue ] = rnReplaceMark(value)
    str += ` ${key}=${removeMarkValue}`
  })
  str += `>\n`

  if (tagName === 'Text') {
    const [ prefix, removeMarkValue ] = rnReplaceMark(value)
    str += `${block(tab + 1)}${removeMarkValue}`
  }

  children.forEach(child => str += genRnCode(child, tab + 1))

  str += `\n${block(tab)}</${tagName}>`

  if (ifs && ifs.length) {
    str += ')}'
  }

  if (fors) {
    str += `\n${block((tab))})}\n`
  }

  return str
}