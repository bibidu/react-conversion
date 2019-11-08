const store = {}

module.exports.set = function(k, v) {
  store[k] = v
}
module.exports.get = function(k) {
  return store[k]
}
module.exports.add = function(k, v) {
  const arr = store[k] ? store[k] : (store[k] = new Set())
  arr.add(v)
  return arr
}
module.exports.push = function(k, v) {
  const arr = store[k] ? store[k] : (store[k] = [])
  arr.push(v)
  return arr
}
module.exports.clear = function(k) {
  delete store[k]
}
module.exports.flush = function(k, v) {
  store = {}
}