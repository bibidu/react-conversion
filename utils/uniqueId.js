let prefix = '@@unique_id'
let id = 0

module.exports = function uniqueId() {
  return `${prefix}_${id++}`
}

module.exports.prefix = prefix