const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const atImport = require('postcss-import')
const scss = require('postcss-node-sass')
const css2obj = require('./plugins/postcss-css2obj')
const store = require('../../store')
const cssPATH = path.join(process.cwd(), 'component/index.scss')
const css = fs.readFileSync(cssPATH, 'utf8')

postcss()
  .use(atImport())
  .use(scss())
  .use(css2obj({
    collectCssObj: (s) => store.componentOutStyle = s
  }))
  .process(css, {
    from: cssPATH
  }).then(result => {
    console.log('===result.css===')
    console.log(result.css)
  })