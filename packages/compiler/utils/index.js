module.exports.createInstance = function createInstance(Clazz, props) {
  return new Clazz(props)
}

module.exports.getRenderString = function getRenderString(instance) {
  return instance.render.toString()
}

module.exports.bindCtx = function bindCtx(instance) {
  const ctx = {}
  Object.keys(instance).forEach(key => ctx[key] = instance[key])
  return ctx
}

module.exports.extractUsePrefix = function extractUsePrefix(string) {
  const lastDotIndex = string.lastIndexOf('.')
  return [string.slice(0, lastDotIndex), string.slice(lastDotIndex + 1)]
}

// module.exports = function markTernary() {
  
// }


module.exports.fn = function fn(text) {
  return new Function(text)
}

module.exports.toObject = function toObject(obj){
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

module.exports.toObjectDeep = function toObjectDeep(obj){
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

module.exports.safeGet = function safeGet(source, expression, def = undefined) {
  if (typeof source !== 'object' || !expression.includes('.')) {
    return def
  }
  const splitExpArr = expression.split('.').slice(1)
  return splitExpArr.reduce((prev, curr) => {
    if (!prev) return def
    return prev[curr] || def
  }, source)
 }

 module.exports.getTypeDefault = function getTypeDefault(type) {
  const typeDefault = {
    string: '',
    Array: [1]
  }
  return typeDefault[type]
}