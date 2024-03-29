module.exports = function replaceMark (str, parentFor) {
  let mark 
  // 裸字符
  if (str.startsWith(mark = '@@string__')) {
    return ["", `{{${str.split(mark)[1]}}}`]
  }
  // react中attr对象的values
  if (str.startsWith(mark = '@@attrValue__')) {
    if (str.startsWith('this')) {
      const restStr = str.split(mark)[1]
      return ["", `"${restStr.split('this.')[1]}"`]
    } else {
      const value = str.split(mark)[1]
      let i = -1
      while (++i < parentFor.length) {
        const valueRoot = value.split('.')[0]
        if (Object.values(parentFor[i]).includes(valueRoot)) {
          return [":", `"${value}"`]
        }
      }
      const hasQuot = value.startsWith('"') && value.endsWith('"')
      return ["", hasQuot ? value : `"${value}"`]
    }
  }
  // && ||
  if (str.startsWith(mark = '@@logic__')) {
    return ["", str.split(mark)[1]]
  }
  //  三目
  if (str.startsWith(mark = '@@ternary__')) {
    return ["v-", `"` + str.split(mark)[1] + `"`]
  }
  // v-else
  if (str === '@@else__') {
    return ["v-", ""]
  }
  return ["", str]
}