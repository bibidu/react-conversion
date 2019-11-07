module.exports = function replaceMark (str, parentFor) {
  let mark 
  if (typeof str === 'object') {
    return ["", `{${JSON.stringify(str)}}`]
  }
  // 裸字符
  if (str.startsWith(mark = '@@string__')) {
    return ["", `{{${str.split(mark)[1]}}}`]
  }
  if (str.startsWith(mark = '@@stringDynatic__')) {
    const removeMark = str.split(mark)[1]
    return ["", `{${removeMark}}`]
  }
  if (str.startsWith(mark = '@@attrValueDynatic__')) {
    const removeMark = str.split(mark)[1]
    return ["", `{${removeMark}}`]
  }
  if (str.startsWith(mark = '@@attrValue__')) {
    const removeMark = str.split(mark)[1]
    if (removeMark.startsWith('"') && removeMark.endsWith('"')) {
      return ["", `"${removeMark.slice(1, -1)}"`]
    }
    return ["", `"${removeMark}"`]
  }
  if (str.startsWith(mark = '@@logic__')) {
    const removeMark = str.split(mark)[1]
    return ["", removeMark]
  }
  return ["", str]
}