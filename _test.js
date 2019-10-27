var React = {
	Component: class {
    constructor(p){
      this.props = p || {}
    }
  },
  createElement(tagNameOrComponentName, attrs, ...children) {
    const tree = {}
    tree.children = []
    tree.tagName = tagNameOrComponentName
    tree.attrs = attrs
    children.forEach(child => {
      if (typeof child === 'string') {
        tree.children.push({
          tagName: 'text',
          attrs: null,
          value: child,
          children: []
        })
      } else {
        child && tree.children.push(child)
      }
    })
    return tree
  }
}
// class Button extends React.Component{
  
//   show = () => {
//     console.log('show')
//   	// this.setState({
//     // 	cool: true
//     // })
//   }
//   render(){
//     const { msg } = this.props
//     return (
//       <div>
//         <button onClick={this.show}>{ msg ? '隐藏' : '显示'}Toast</button>
//         <div>
//           <div>
//             { msg || 'toast' }
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// // 目标语言
// const target = 'vue'

// function createInstance(Clazz, props) {
//   return new Clazz(props)
// }
// function getRenderString(instance) {
//   return instance.render.toString()
// }
// function bindCtx(instance) {
//   const ctx = {}
//   Object.keys(instance).forEach(key => ctx[key] = instance[key])
//   return ctx
// }
// function replaceMark(str) {
//   if (target === 'vue') {
//     let mark 
//     // 三目
//     if (str.startsWith(mark = '@@ternary__')) {
//       return `{{${str.split(mark)[1]}}}`
//     }
//     // this作用域
//     if (str.startsWith(mark = '@@ctxString__')) {
//       return `${str.split(mark)[1]}`
//     }
//     return str
//   }
//   throw 'no match target'
// }
// function generateAttrString(attrs) {
//   const eventName = {
//     onClick: '@click'
//   }
//   let attrString = '', attrStringDependencies = {}
//   if (target === 'vue') {
//     Object.keys(attrs).forEach(attr => {
//       if (eventName[attr]) {
//         const value = replaceMark(attrs[attr])
//         const [prefix, restValue] = extractUsePrefix(value)
//         attrString += ` ${eventName[attr]}="${restValue}"`
//         attrStringDependencies[value] = {
//           raw: value,
//           prefix,
//           restValue: restValue
//         }
//       }
//     })
//     return [attrString, attrStringDependencies]
//   }
//   throw 'no match target'
// }
// function extractUsePrefix(string) {
//   const lastDotIndex = string.lastIndexOf('.')
//   return [string.slice(0, lastDotIndex), string.slice(lastDotIndex + 1)]
// }

// // @@ternary__ -> 三目
// function markTernary() {
//   return `function render() {
//     var msg = this.props.msg;
//     return React.createElement("div", null, React.createElement("button", {
//       onClick: \`@@ctxString__this.show\`
//     }, \`@@ternary__msg ? '隐藏' : '显示'\`, "Toast"), React.createElement("div", null, React.createElement("div", null, \`@@ternary__msg || 'toast'\`)));
//   }`
// }
// function toTemplate(jsxTree) {
//   let template = ''
//   template += `<${jsxTree.tagName}`
//   Object.keys(jsxTree.attrs || {}).forEach(attr => {
//     template += ` ${attr}=${replaceMark(jsxTree.attrs[attr])}`
//   })
//   template += `>`

//   // (jsxTree.children || []).forEach(child => template += `  ${toTemplate(child)}`)

//   template += `</${jsxTree.tagName}>`
//   return template
// }
// // test
// var props = { msg: '', show: '' } // 根据组件配置文件 获取props的结构
// const instance = createInstance(Button, props)
// const ctx = bindCtx(instance)
// const renderString = getRenderString(instance)

// const markedTernaryRenderString = markTernary(renderString)
// const renderFn = new Function(`return ${markedTernaryRenderString}`)()
// // console.log(`<div>
// // <button onClick={this.show}>{ msg ? '隐藏' : '显示'}Toast</button>
// // <div>
// //   <div>
// //     { msg || 'toast' }
// //   </div>
// // </div>
// // </div>`)
// // console.log(renderFn.toString())
// // console.log('---------')
// const jsxTree = renderFn.call(ctx)
// console.log(jsxTree)
// const template = toTemplate(jsxTree)



// console.log(template)

// console.log('')
// console.log('')
// console.log('')
// console.log('')
// console.log('')
// console.log('')
// console.log('')




var target = 'vue'

function markTernary() {
  return `function render() {
    var msg = this.props.msg;
    return React.createElement("div", null, React.createElement("button", {
      onClick: \`@@ctxString__this.show\`
    }, \`@@ternary__msg ? '隐藏' : '显示'\`, "Toast"), React.createElement("div", null, React.createElement("div", null, \`@@ternary__msg || 'toast'\`)));
  }`
}
function createInstance(Clazz, props) {
  return new Clazz(props)
}
//  @@ternary__ -> 三目
function markTernary() {
  return `function render() {
    var msg = this.props.msg;
    return React.createElement("div", null, React.createElement("button", {
      onClick: \`@@ctxString__this.show\`
    }, \`@@ternary__msg ? '隐藏' : '显示'\`, "Toast"), React.createElement("div", null, React.createElement("div", null, \`@@ternary__msg || 'toast'\`)));
  }`
}
function bindCtx(instance) {
  const ctx = {}
  Object.keys(instance).forEach(key => ctx[key] = instance[key])
  return ctx
}
const tabSize = '  '
function toTemplate(jsxTree, index = 0) {
  if (target === 'vue') {
    const block = tabSize.repeat(index)
    let template = ''
    if (jsxTree.tagName === 'text') {
      template += `${replaceMark(jsxTree.value)}`
    } else {
      template += `<${jsxTree.tagName}`
    }
    Object.entries(jsxTree.attrs || {}).forEach(([key, value]) => {
      template += ` ${key}=${replaceMark(value)}`
    })
    if (jsxTree.tagName !== 'text') {
      template += `>`;
    }
  
    (jsxTree.children || []).forEach((child, idx) => {
      const prevAndCurrentIsText = idx !== 0 && child.tagName === 'text'
        && jsxTree.children[idx - 1].tagName === 'text'
      const block = prevAndCurrentIsText ? '' : `\n${tabSize.repeat(index + 1)}`
      template += `${block}${toTemplate(child, index + 1)}`
    })
  
    if (jsxTree.tagName !== 'text') {
      template += `\n${block}</${jsxTree.tagName}>`
    }
    return template
  }
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
const markedTernaryRenderString = markTernary()
const renderFn = new Function(`return ${markedTernaryRenderString}`)()
class T extends React.Component{}
 const ins = createInstance(T, { props: {}})
 const ctx = bindCtx(ins)
 console.log(ctx); 
 console.log(renderFn.toString()); 
const jsxTree = renderFn.call(ctx)
console.log(jsxTree);
const template = toTemplate(jsxTree)

console.log(template)



















