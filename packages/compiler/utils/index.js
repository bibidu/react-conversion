
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

module.exports = {
  createInstance,
  getRenderString,
  bindCtx,
  extractUsePrefix,
  markTernary,
  jsxCompile,
  fn,
  toObject,
}