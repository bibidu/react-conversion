module.exports = function safeGet(source, expression, def = undefined) {
  if (typeof source !== 'object' || !expression.includes('.')) {
    return def
  }
  const splitExpArr = expression.split('.').slice(1)
  return splitExpArr.reduce((prev, curr) => {
    if (!prev) return def
    return prev[curr] || def
  }, source)
 }