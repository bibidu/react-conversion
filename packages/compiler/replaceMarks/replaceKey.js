// const { extractUsePrefix } = require('../utils')
// const replaceMark = require('./replaceMark')

export default function replaceKey (key) {
  const eventName = {
    onClick: '@click'
  }
  // TODO: 生成methods
  if (eventName[key]) {
    return eventName[key]
  }
  return key
}