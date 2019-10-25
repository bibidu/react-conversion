var React = {
	Component: class {
    constructor(p){
      this.props = p || {}
    }
  },
  createElement(tagNameOrComponentName, attrs, ...children) {
    let str = ''
    str += `<${tagNameOrComponentName}>`
    children.forEach(child => str += `\n  ` + child + '\n  ')
    str += `</${tagNameOrComponentName}>`
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
function markTernary() {
  return `function render() {
    var msg = this.props.msg;
    return React.createElement("div", null, React.createElement("button", {
      onClick: this.show
    }, \`msg ? '隐藏' : '显示'\`, "Toast"), React.createElement("div", null, React.createElement("div", null, \`msg || 'toast'\`)));
  }`
}
// test
var props = { msg: '', show: '' } // 根据组件配置文件 获取props的结构
const instance = createInstance(Button, props)
const ctx = bindCtx(instance)
const renderString = getRenderString(instance)
const markedTernaryRenderString = markTernary(renderString)
const renderFn = new Function(`return ${markedTernaryRenderString}`)()
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

// 1. copy to compiler site
// https://www.babeljs.cn/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=G4QwTgBASgpiDGAXCBeCBvAUASAMIHsBbAB3wDsYzEAuCeAGxAGcmNMIO7ynEwBXJPjAAKYgEosnTogAWASyYA6YmHzFWaYhAA-2jAF92nQx30AaI_DBxEMAKL0YhSomGIQAcwByIZwHkwAhJyFx9nMwgQRF4mCMV4-Hl6ABNrMjE2KUdkHkg0AHJ8ow5ciABqNAADAB4AEnR3b18YAKDSCiowmH0APkriuiTUykUAMyE7BBlhRLkU1B6IUoqISoAdMg5K8sG55J38jY58sQHlquqAenrGrtaidtDm3v6pa0Q-ME3co0NDBmYrAAQnxouQIDAAB62MjJViwBCIRRtEJUSQQIxMGT4ADuqAgwgyKEW6I48G4-Ecino-A8wnyWNxJyM2EulwgsgUiiYMEQAGV3LZhKSIGyINhyZTaLw-DABmL9KdTEY0skYCIJANyWQeBgIIQmB4IPp8ZylCo1EwBu9PpthAMONVknJgD0HRBqgAjUGIcHkXD0OTwADWKAa8iUjJxvXQ-sNEAA_BB8oAEtMA86H5CC0fKAPjNAFye-X0ABV8MxEFdvWCyG6pFInS6a7W687Xe6m7GDUbdMnfWXMyYm5wri3G03hw33ePW1IlcbMIZMKM-GQkHJwVYbDAAJI69wrmDCAMgABex4iFvUGXRNq-EAoeKPp9Eqkv88Xy9X4I8vNgsPVArAOQyDpICeBAfcrxVXlbQgUC93gGBFFVdVFF9ACgLpU5DCXFdEDXTZPSA5JcEQSFhDg8CEMgsluGQJBIXxdABz8T0ACsYCQRRgxgABPJhyN3SiYDEMYJimYRuJ4hY6FIgBtSSAF18Qo_d5N4hTZxvTZ6LfHDP02QhwGDIt1TIcAeMJTIIC01Y9Lw8FkI1KyOFASBO1NCNlBfJROwAbmtaDbwRTiNyiexHGcKhhAAIhbaKIjIPh6HoCJgqRULbAcJwXBiytfTIeLnM4f1AxDaVPKjAZzAgNZKncpNUwzLNk3zQ5KgiaKSzLaKxFSuAQusMKssi1xYpdQrEuSvrEUUDLwuyqKxuACakpSmq6vjbt8l7Hg2rEfb_NMfpDDFWweEwVyIAvDQ9U7bN8giKN7uNUV2UATgtADtjQARv0AN7lAFlEwA7f0AcNMfogQB24MANeVrsAELdAGW_QAQ80wbVdRUhD8TmncwP3YQQSrc9vNOZG6NI_FCNhEiyNR4Skdo6zKDVMB0OA_Fv0QX8GaZkDBIgmnd31IyYGSEyvnM9n_14DD8UMsBjNM8zhEcznCdpxyADFNjQe8IFVj97LIYRKhs-ppe4oW5bAHixcZiXgP0SoxEJXmmEpRCaTpNWyFQ_BOcJZWdRd6laXpABaUOw7D5kibpm6PdmkBkpmUjTkwFOnYDt2FZgJhk-R9Og8KP3napDOC7T4v88jily7pUvc-r-lK_9-va6r12K-T1PO677ue5ToA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.6.4

// 2. copy compiled code to chrome console menu



























