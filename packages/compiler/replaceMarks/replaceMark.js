module.exports = function replaceMark (str) {
  let mark 
  // 三目
  if (str.startsWith(mark = '@@ternary__')) {
    return `{{${str.split(mark)[1]}}}`
  }
  // this作用域
  if (str.startsWith(mark = '@@ctxString__')) {
    const restStr = str.split(mark)[1]
    return `"${restStr.split('this.')[1]}"`
  }
  return str
}