const needExpandStyle = ['border', 'padding', 'margin']

module.exports = function replaceStyle(style) {
  Object.entries(style).forEach(([key, value]) => {
    if (needExpandStyle.includes(key)) {
      delete style[key]
      style[`${key}Top`] = value
      style[`${key}Left`] = value
      style[`${key}Right`] = value
      style[`${key}Bottom`] = value
    }
  })
  return style
}