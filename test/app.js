const ts = require('typescript')
// const transform = require('css-to-react-native').default
// const { getStylesForProperty } = require('css-to-react-native')
const code = `
import 'index.scss'
class T extends React.Component{
  constructor(props) {
    super(props)
  }
  clickEvent() {
    console.log('clickEvent')
  }
  renderTernary() {
    const { show, visiable } = this.props
    return (
      <div>
        {
          show ? <h1>h1</h1> : !visiable ? <h2 onClick={this.clickEvent}>h2</h2> : <h3>h3</h3>
        }
      </div>
    )
  }
  renderTernary2() {
    if (true) {
      return <h4>renderTernary2: h4</h4>
    }
    return <h5>renderTernary2: h5</h5>
  }
  render() {
    const { list, show, visiable, msg1 } = this.props
    return (
      <h6 id="container" style={{border: '1px solid #ccc'}}>
        {this.renderTernary()}
        {this.renderTernary2()}
      </h6>
    )
  }
}`
const compiled = ts.transpileModule(code, {
  compilerOptions: {
    target: "ES6",
    esModuleInterop: true,
    module: ts.ModuleKind.CommonJS,
    jsx: 'preserve'
  }
})

console.log(compiled.outputText)

// const res = transform([
//   ['border ', '1px solid #ccc'],
// ])

// console.log(getStylesForProperty('color', 'green'))
// console.log(getStylesForProperty('font-family', '"微软雅黑"'))
// console.log(getStylesForProperty('font-size', '15px'))
// console.log(getStylesForProperty('font-size', '15rem'))
// console.log(getStylesForProperty('background-size', 'red'))

// console.log(res)