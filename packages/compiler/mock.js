const {
  React
} = require('./utils')

const mockButtonString = ` class Button extends React.Component{
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
}`
class Button extends React.Component{
  // show = () => {
  //   console.log('show')
  //   // this.setState({
  //   // 	cool: true
  //   // })
  // }
  // render(){
  //   const { msg } = this.props
  //   return (
  //     <div>
  //       <button onClick={this.show}>{ msg ? '隐藏' : '显示'}Toast</button>
  //       <div>
  //         <div>
  //           { msg || 'toast' }
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
}
const mockRenderString = `function render() {
  var msg = this.props.msg;
  return React.createElement("div", null, React.createElement("button", {
    onClick: \`@@ctxString__this.show\`
  }, \`@@ternary__msg ? '隐藏' : '显示'\`, "Toast"), React.createElement("div", null, React.createElement("div", null, \`@@ternary__msg || 'toast'\`)));
}`

module.exports = {
  Button,
  mockButtonString,
  mockRenderString
}