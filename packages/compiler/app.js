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

// const DEBUG = false
const DEBUG = true

function start(target = 'rn') {
  // 构造上下文
  const ctx = createPropCtx(componentJson)

  // 运行时的react库
  const runtimeReactLib = getReactEnvironment(target)

  // 1.得到编译后的组件字符串
  const { markedComponent } = jsxCompile(target, componentString, componentJson)

  if (DEBUG) {
    console.log(`==================== markedComponent ====================`)
    console.log('========================================')
    console.log(markedComponent);
    console.log('====================over====================')
  }

  // 2. 得到`运行时方法`改造后的jsxTree
  const renderWrapper = fn(`var React = ${toObject(runtimeReactLib)};${markedComponent};return new ${componentJson.name}().render()`)
  const jsxTree = renderWrapper()

  if (DEBUG) {
    console.log(`==================== jsxTree ====================`)
    console.log('========================================')
    console.log(jsxTree);
  }

  // 3.转换成输出结果
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
 

