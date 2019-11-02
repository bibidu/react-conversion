module.exports = function replaceMark (str, parentFor) {
  let mark 
  // 裸字符
  if (str.startsWith(mark = '@@string__')) {
    return ["", `{{${str.split(mark)[1]}}}`]
  }
  // react中attr对象的values
  if (str.startsWith(mark = '@@attrValue__')) {
    if (str.includes('this')) {
      const restStr = str.split(mark)[1]
      return ["", `"${restStr.split('this.')[1]}"`]
    } else {
      const value = str.split(mark)[1]
      let i = -1
      while (++i < parentFor.length) {
        if (Object.values(parentFor[i]).includes(value)) {
          return [":", `"${value}"`]
        }
      }
      
      return ["", value]
    }
  }
  // && ||
  if (str.startsWith(mark = '@@logic__')) {
    return ["", str.split(mark)[1]]
  }
  return ["", str]
}