export function createInstance(Clazz, props) {
  return new Clazz(props)
}

export function getRenderString(instance) {
  return instance.render.toString()
}

export function bindCtx(instance) {
  const ctx = {}
  Object.keys(instance).forEach(key => ctx[key] = instance[key])
  return ctx
}

export function extractUsePrefix(string) {
  const lastDotIndex = string.lastIndexOf('.')
  return [string.slice(0, lastDotIndex), string.slice(lastDotIndex + 1)]
}

export function markTernary() {
  
}

export function jsxCompile(componentText) {

}

export function fn(text) {
  return new Function(text)
}

export function toObject(obj){
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

export function toObjectDeep(obj){
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

export function safeGet(source, expression, def = undefined) {
  if (typeof source !== 'object' || !expression.includes('.')) {
    return def
  }
  const splitExpArr = expression.split('.').slice(1)
  return splitExpArr.reduce((prev, curr) => {
    if (!prev) return def
    return prev[curr] || def
  }, source)
 }

 export function getTypeDefault(type) {
  const typeDefault = {
    string: '',
    Array: [1]
  }
  return typeDefault[type]
}