const fs = require('fs')
const path = require('path')
const react = require('./React/react')
const getReactEnvironment = require('./React')
const componentString = fs.readFileSync(path.join(__dirname, 'component/index.js'), 'utf8')
const componentJson = require('./component/component.json')
const toTemplate = require('./toTemplate')
const jsxCompile = require('./compile')
const {
  fn,
  toObject,
  createPropCtx
} = require('./utils')

const DEBUG = false

function start(target) {
  // 构造上下文
  const ctx = createPropCtx(componentJson)

  // 运行时的react库
  const runtimeReactLib = getReactEnvironment(target)

  // 1.得到编译后后的字符串
  const { renderString } = jsxCompile(target, componentString, componentJson)

  if (DEBUG) {
    console.log(`==================== renderString ====================`)
    console.log('========================================')
    console.log(renderString);
  }

  // 获取render函数
  const f = fn(`var React = ${toObject(runtimeReactLib)};return ${renderString}`)
  const jsxTree = f().call(new react.Component(ctx.props))

  if (DEBUG) {
    console.log(`==================== jsxTree ====================`)
    console.log('========================================')
    console.log(jsxTree);
  }

  // 2.转换成输出结果
  const html = toTemplate(target, jsxTree)
  if (DEBUG) {
    console.log(`==================== ${target}编译结果 ====================`)
    console.log('========================================')
    console.log(html);
    console.log('========================================')
  }
  // const htmlFile = genPreviewHtml(html, genVueInstance(componentJson))
   
  // console.log(htmlFile);
}
start(process.env.TARGET)
// console.log()
// start('rn')
 

