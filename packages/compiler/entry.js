const getReactEnvironment = require('./React')
const {
  componentString,
  componentJson
} = require('./mock')
const toTemplate = require('./toTemplate')
const jsxCompile = require('./compile')
const {
  fn,
  toObject,
  getTypeDefault,
  genPreviewHtml,
  genVueInstance
} = require('./utils')

function createPropCtx({ props }) {
  const obj = {}
  Object.keys(props).forEach(p => {
    obj[p] = props[p].default
  })
  return {
    props: obj
  }
}

let target
// target = 'vue'
target = 'rn'

const { renderString, params } = jsxCompile(target, componentString) || ''
let ctx = createPropCtx(componentJson)
const f = fn(`var React = ${toObject(getReactEnvironment(target))};return ${renderString}`)
const jsxTree = f().call(ctx)
// require('fs').writeFileSync('./1.json', JSON.stringify(jsxTree, null, 2), 'utf8')
const html = toTemplate(target, jsxTree)
// console.log('vueHtml');
// console.log('========== 编译结果 ===========')
// console.log(html);
// const htmlFile = genPreviewHtml(html, genVueInstance(componentJson))
 
// console.log(htmlFile);
 

