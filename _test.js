var React = {
	Component: class {
    constructor(p){
      this.props = p || {}
    }
  },
  createElement(tagNameOrComponentName, attrs, ...children) {
    let str = '', attrString = '', attrStringDependencies = {}
    str += `<${tagNameOrComponentName}`

    if (attrs !== null && Object.keys(attrs).length) {
      [attrString, attrStringDependencies] = generateAttrString(attrs)
    }

    str += `${attrString}>`

    children.forEach(child => {
      str += `\n  ` + replaceMark(child) + `\n  `
    })
    str += `</${tagNameOrComponentName}>`

    if (Object.keys(attrStringDependencies).length) {
      console.log('attrStringDependencies收集的依赖')
      console.log(attrStringDependencies)
    }
    return str
  }
}
class Button extends React.Component{
  
  show = () => {
    console.log('show')
  	// this.setState({
    // 	cool: true
    // })
  }
  render(){
    const { msg } = this.props
    return (
      <div>
        <button onClick={this.show}>{ msg ? '隐藏' : '显示'}Toast</button>
        <div>
          <div>
            { msg || 'toast' }
          </div>
        </div>
      </div>
    )
  }
}
// 目标语言
const target = 'vue'

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
function replaceMark(str) {
  if (target === 'vue') {
    let mark 
    // 三目
    if (str.startsWith(mark = '@@ternary__')) {
      return `{{${str.split(mark)[1]}}}`
    }
    // this作用域
    if (str.startsWith(mark = '@@ctxString__')) {
      return `${str.split(mark)[1]}`
    }
    return str
  }
  throw 'no match target'
}
function generateAttrString(attrs) {
  const eventName = {
    onClick: '@click'
  }
  let attrString = '', attrStringDependencies = {}
  if (target === 'vue') {
    Object.keys(attrs).forEach(attr => {
      if (eventName[attr]) {
        const value = replaceMark(attrs[attr])
        const [prefix, restValue] = extractUsePrefix(value)
        attrString += ` ${eventName[attr]}="${restValue}"`
        attrStringDependencies[prefix === 'this' ? '@this@' : prefix] = {
          raw: value,
          restValue: restValue
        }
      }
    })
    return [attrString, attrStringDependencies]
  }
  throw 'no match target'
}
function extractUsePrefix(string) {
  const lastDotIndex = string.lastIndexOf('.')
  return [string.slice(0, lastDotIndex), string.slice(lastDotIndex + 1)]
}

// @@ternary__ -> 三目
function markTernary() {
  return `function render() {
    var msg = this.props.msg;
    return React.createElement("div", null, React.createElement("button", {
      onClick: \`@@ctxString__this.show\`
    }, \`@@ternary__msg ? '隐藏' : '显示'\`, "Toast"), React.createElement("div", null, React.createElement("div", null, \`@@ternary__msg || 'toast'\`)));
  }`
}
// test
var props = { msg: '', show: '' } // 根据组件配置文件 获取props的结构
const instance = createInstance(Button, props)
const ctx = bindCtx(instance)
const renderString = getRenderString(instance)
const markedTernaryRenderString = markTernary(renderString)
const renderFn = new Function(`return ${markedTernaryRenderString}`)()
console.log(`<div>
<button onClick={this.show}>{ msg ? '隐藏' : '显示'}Toast</button>
<div>
  <div>
    { msg || 'toast' }
  </div>
</div>
</div>`)
console.log(renderFn.toString())
console.log('---------')
const res = renderFn.call(ctx)




console.log(res)

console.log('')
console.log('')
console.log('')
console.log('')
console.log('')
console.log('')
console.log('')


























