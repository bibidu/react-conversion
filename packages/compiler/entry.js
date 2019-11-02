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
// console.log(renderString)
const f = fn(`var React = ${toObject(React)};return ${renderString}`)
const jsxTree = f().call(ctx)
// fs.writeFileSync('./1.json', JSON.stringify(jsxTree, null, 4), 'utf8')
const vueHtml = toTemplate(target, jsxTree)
// console.log('vueHtml');
console.log(`class Button extends React.Component{
  render() {
    return (
      <div id="container">
        {
          [1, 2].map((item, idx) => (
            <h1>
              <button key={idx}>{item}</button>
            </h1>
          ))
        }
        {
          'a' && 'b' || show || (
            <div>
              <h1>12</h1>
            </div>
          )
        }
      </div>
    )
  }
}`)
console.log('=============================')
console.log('========== 编译结果 ===========')
console.log(vueHtml);
 
 

