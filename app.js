require('babel-polyfill')
const fs = require("fs")
const path = require("path")
const {
  compileJS,
  revertJS
} = require('./compiler/babel')
const compileCSS = require('./compiler/postcss')
const {
  extractCssEntryAndRevert,
  externalStyle2Inline
} = require('./utils')
const store = require('./store')

// 读取组件入口文件
let code = fs.readFileSync(path.join(__dirname, '/component/index.js'), 'utf8')

// 提取组件中的css引用并转换
// TODO: import的语法编译
const {
  styleRequires: outStyleFileNames,
  code: removeCSSImportCode
} = extractCssEntryAndRevert(code)

code = removeCSSImportCode

outStyleFileNames.forEach(async ({ path: filePath }) => {
  const cssPATH = path.join(__dirname, 'component', filePath)

  // 编译css并缓存 `externalStyle` 到store
  await compileCSS(cssPATH)

  // 编译js并缓存 `classMethod` `tagsInfo` `fsRelations` `sfRelations` 到store
  compileJS(code)
  
  // 借助浏览器插入 `外联样式` 到组件，并返回 `内联样式`
  await externalStyle2Inline()

  revertJS()
  // console.log(store);
  
})

