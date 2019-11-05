const fs = require('fs')
const {
  componentString,
  mockRenderString,
} = require('./mock.js')
const React = require('./React')
const toTemplate = require('./toTemplate')
const jsxCompile = require('../compiler/compile')
const {
  createInstance,
  getRenderString,
  bindCtx,
  replaceAttr,
  extractUsePrefix,
  markTernary,
  parseFunctionMark,
  fn,
  toObject,
  getTypeDefault
} = require('./utils')

function createPropCtx(props) {
  const obj = {}
  Object.keys(props).forEach(p => {
    obj[p] = getTypeDefault(props[p].type)
  })
  return {
    props: obj
  }
}

const target = 'vue'
const mock = true

const { renderString, params } = jsxCompile(componentString) || '' // TODO: react字符串组件 -> react组件 [mock]
let ctx = createPropCtx(params.props)
const f = fn(`var React = ${toObject(React)};return ${renderString}`)
const jsxTree = f().call(ctx)
// fs.writeFileSync('./1.json', JSON.stringify(jsxTree, null, 4), 'utf8')
const vueHtml = toTemplate(target, jsxTree)
// console.log('vueHtml');
console.log('========== 编译结果 ===========')
console.log(vueHtml);
 
 

