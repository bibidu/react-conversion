const tags = new Set()

module.exports = function afterMapping(tagName) {
  tags.add(tagName)
  console.log(`当前tags: `, tags)
}