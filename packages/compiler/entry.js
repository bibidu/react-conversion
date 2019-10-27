const {
  Button,
  mockButtonString,
  mockRenderString,
} = require('./mock.js')

const {
  React,
  createInstance,
  getRenderString,
  bindCtx,
  replaceMark,
  generateAttrString,
  extractUsePrefix,
  markTernary,
  jsxCompile,
  stringify,
  parseFunctionMark
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
console.log(`var React=${stringify(React)}`);
// const renderFn = new Function(`
// var React=${stringify(markedTernaryRenderString)}
// return ${markedTernaryRenderString}
// `)()

// console.log(renderFn.call(ctx))

// // console.log('=============');
// const jsxTree = renderFn.call(ctx)
// // console.log('++++++++++');

// console.log(jsxTree());

 

