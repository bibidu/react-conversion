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

module.exports.genPreviewHtml = function genPreviewHtml(element, vueInstance) {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>vue</title>
    <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
  </head>
  <body>
    <div id="app">
      ${element}
    </div>
  
    <script>
      ${vueInstance}
    </script>
  </body>
  </html>`
  require('fs').writeFileSync('./index.html', html, 'utf8')
}

module.exports.genVueInstance = function genVueInstance(params) {
  const props = params.props
  const template = (data) => `new Vue({
    el: '#app',
    data: ${data}
  })`
  let str = '{'
  console.log(props)
  Object.entries(props).forEach(([key, value]) => {
    console.log(value)
    str += `${key}: ${JSON.stringify(value.default, null, 2)},`
  })
  str += '}'
  return template(str)
}