const transform = require('css-to-react-native').default

module.exports = function replaceStyle(style) {
  const serilizedStyleArr = premakeStyle(style)
  const result = transform(serilizedStyleArr)
  return result
}

function premakeStyle(style) {
  const styleArr = []
  Object.entries(style).forEach(([key, value]) => {
    styleArr.push([key, typeof value === 'number' ? String(value) : value])
  })
  return styleArr
}