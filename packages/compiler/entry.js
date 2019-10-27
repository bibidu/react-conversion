const {
  Button,
  mockButtonString,
  mockRenderString,
} = require('./mock.js')
const React = require('./React')
const toTemplate = require('./toTemplate')
const {
  createInstance,
  getRenderString,
  bindCtx,
  replaceAttr,
  extractUsePrefix,
  markTernary,
  jsxCompile,
  parseFunctionMark,
  fn,
  toObject,
} = require('./utils')

const target = 'vue'
const mock = true

const reactComponent = jsxCompile(mockButtonString) || '' // TODO: react字符串组件 -> react组件 [mock]
const props = { msg: '', show: '' } // TODO: 读取react组件 得到props [mock]
let renderString, ctx = { props: {} }
// const instance = createInstance(reactComponent, props)
// const ctx = bindCtx(instance)
// renderString = getRenderString(instance)

// TODO: 标记React.createElement嵌套结构中的·三目· ·方法· 等 [mock]
const markedTernaryRenderString = !mock ? markTernary(renderString) : mockRenderString
const f = fn(`var React = ${toObject(React)};return ${markedTernaryRenderString}`)
const jsxTree = f().call(ctx)
const vueHtml = toTemplate(target, jsxTree)
console.log(vueHtml);
 

