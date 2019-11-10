const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const atImport = require('postcss-import')
const scss = require('postcss-node-sass')
const css2obj = require('./plugins/postcss-css2obj')
const store = require('../../store')

module.exports = function compileCss(cssPATH) {
  const css = fs.readFileSync(cssPATH, 'utf8')
  
  return new Promise(resolve => {
    postcss()
    .use(atImport())
    .use(scss())
    .use(css2obj({
      collectCssObj: (s) => store.externalStyle = Object.assign(store.externalStyle, s)
    }))
    .process(css, {
      from: cssPATH
    }).then(result => {
      resolve()
    })
  })
}