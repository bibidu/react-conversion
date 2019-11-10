const { prefix } = require('./uniqueId')
const store = require('../store')
const runInBrowser = require('./runInBrowser')
const {
  array
} = require('.')

module.exports = async function externalStyle2Inline() {
  const {
    tagsInfo,
    externalStyle,
    fsRelations,
    sfRelations,
  } = store
  const ROOT = 'render'
  const html = createHTML(tagsInfo, fsRelations, ROOT)
  const script = createCSSScript(externalStyle)
  const inlineStyle = await runInBrowser({ html, script })

  return inlineStyle
}

function isElement(uniqueID) {
  return new RegExp(`^${prefix}`).test(uniqueID)
}

function createHTML(tagsInfo, fsRelations, ROOT) {
  let str = ''
  while (!isElement(ROOT)) {
    if (!fsRelations[ROOT]) return ''
    array(fsRelations[ROOT]).forEach(child => {
      str += createHTML(tagsInfo, fsRelations, child)
    })
    return str
  }

  const {start, end} = tagString(tagsInfo[ROOT])
  str += start
  
  if (fsRelations[ROOT]) {
    array(fsRelations[ROOT]).forEach(child => {
      str += createHTML(tagsInfo, fsRelations, child)
    })
  }
  str += end
  return str
}

function tagString(tagInfo) {
  const { tagName } = tagInfo
  let str = `<${tagName}`
  Object.entries(tagInfo).forEach(([attr, value]) => {
    if (attr !== 'tagName' && value) {
      str += ` ${attr}=${value}`
    }
  })
  str += `>\n`
  return {
    start: str,
    end: `\n</${tagName}>\n`
  }
}
function createCSSScript(externalStyle) {
  let str = '', id = 0
  str += `    const obj = {};`

  Object.entries(externalStyle).forEach(([selector, values]) => {
    str += `
    let el${++id} = document.querySelector("${selector}")
    if (el${id} && typeof el${id} === 'object') {
      console.log(el${id})
      let __className${id} = el${id}.getAttribute('__className')
      obj[__className${id}] = ${JSON.stringify(values)}
    }
    `
  })
  str += `console.log(obj);\n`
  str += `document.querySelector('#result').innerText = JSON.stringify(obj)`
  return str
}