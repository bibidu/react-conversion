const { ast2code } = require("../../utils");

const babel = require("@babel/core")
const traverse = require('@babel/traverse').default
const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const {
  compileVisitors,
  revertVisitors
} = require('../../visitors')
const store = require('../../store')

module.exports.compileJS = function compileJS(code) {
  function _traverse(visitor) {
    const r = babel.transformSync(code, {
      plugins: [
        // ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-syntax-jsx"],
        { visitor }
      ],
    })
    code = r.code
  }

  compileVisitors.forEach(visitor => {
    _traverse(visitor)
  })
  store.addUniqueIdCode = code
}

module.exports.revertJS = function revertJS() {
  let code = store.addUniqueIdCode
  revertVisitors.forEach(visitor => {
    _traverse(visitor)
  })

  function _traverse(visitor) {
    const r = babel.transformSync(code, {
      plugins: [
        // ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-syntax-jsx"],
        { visitor }
      ],
    })
    code = r.code
  }
  const tags = [...store.rnUsingTags]
  const usingTagsString = tags.reduce((prev, curr, idx) => {
    const isLast = idx === tags.length - 1
    const current = '   ' + prev + ','  + '\n' + curr 
    return isLast ? current + `\n} from 'react-native'` : current
  }, `import {
    AppRegistry,
    StyleSheet`)
  console.log(usingTagsString);
  console.log(`const styles = StyleSheet.create(`);
  console.log(store.styleSheet);
  console.log(`)`);
  console.log(code);
}

