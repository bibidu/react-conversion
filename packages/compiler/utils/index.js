
function createInstance(Clazz, props) {
  return new Clazz(props)
}
function getRenderString(instance) {
  return instance.render.toString()
}
function bindCtx(instance) {
  const ctx = {}
  Object.keys(instance).forEach(key => ctx[key] = instance[key])
  return ctx
}
function extractUsePrefix(string) {
  const lastDotIndex = string.lastIndexOf('.')
  return [string.slice(0, lastDotIndex), string.slice(lastDotIndex + 1)]
}

function markTernary() {
  
}

function jsxCompile(componentText) {

}
function fn(text) {
  return new Function(text)
}
function toObject(obj){
	let i = '{'
	Object.keys(obj).forEach(item =>{
    if (typeof obj[item] === 'function') {
      i += `${item}:${("" + obj[item]).replace(obj[item].name, "function")}, `
    } else {
		  i += `${item}:${obj[item]}, `
    }
	})
	i += '}'
  return i;
}
function toObjectDeep(obj){
	let i = '{'
	Object.keys(obj).forEach(item =>{
    if (typeof obj[item] === 'function') {
      i += `${item}:${("" + obj[item]).replace(obj[item].name, "function")}, `
    } else if (typeof obj[item] === 'object') {
      i += `"${item}":${toObjectDeep(obj[item])},`
    } else {
		  i += `${item}:${obj[item]}, `
    }
	})
	i += '}'
  return i;
}
function safeGet(source, expression, def = undefined) {
  if (typeof source !== 'object' || !expression.includes('.')) {
    return def
    // return source
  }
  const splitExpArr = expression.split('.').slice(1)
  return splitExpArr.reduce((prev, curr) => {
    if (!prev) return def
    return prev[curr] || def
  }, source)
 }
function getTypeDefault(type) {
  const typeDefault = {
    string: '',
    Array: [1]
  }
  return typeDefault[type]
}

module.exports = {
  createInstance,
  getRenderString,
  bindCtx,
  extractUsePrefix,
  markTernary,
  jsxCompile,
  fn,
  toObject,
  toObjectDeep,
  safeGet,
  getTypeDefault
}