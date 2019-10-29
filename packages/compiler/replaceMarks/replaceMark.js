module.exports = function replaceMark (str) {
  let mark 
  // 裸字符
  if (str.startsWith(mark = '@@string__')) {
    return `{{${str.split(mark)[1]}}}`
  }
  // react中attr对象的values
  if (str.startsWith(mark = '@@attrValue__')) {
    const restStr = str.split(mark)[1]
    return `"${restStr.split('this.')[1]}"`
  }
  return str
}