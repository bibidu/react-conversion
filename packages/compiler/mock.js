const React = require('./React')

export const componentString = `
class Button extends React.Component{
  render() {
    return (
      <div id="container">
        {
          [1, 2].map((item, idx) => (
            <h1>
              <button key={idx}>{item}</button>
            </h1>
          ))
        }
        {
          'a' && 'b' || show || (
            <div>
              <h1>12</h1>
            </div>
          )
        }
        {
          show ? <h1>h1</h1> : !visiable ? <h2>h2</h2> : <h3>h3</h3>
        }
      </div>
    )
  }
}`
// show ? <h1>123</h1> : <h1>456</h1>
const componentString1 = `

class Button extends React.Component{
  show = () => {
    console.log('show')
    // this.setState({
    // 	cool: true
    // })
  }
  render(){
    const { msg, list } = this.props
    return (
      <div id="app" onClick={this.show}>
        <div id="container">
          {
            list.map(item => (
              <h1>
                <nutton>button</nutton>
              </h1>
            ))
          }
          <span>12</span>
        </div>
      </div>
    )
  }
}
Button.propTypes = {
  msg: 'string',
  list: 'Array'
};`
export const mockRenderString = `function render() {
  var msg = this.props.msg;
  return React.createElement("div", null, React.createElement("button", {
    onClick: \`@@ctxString__this.show\`
  }, \`@@ternary__msg ? '隐藏' : '显示'\`, "Toast"), React.createElement("div", null, React.createElement("div", null, \`@@ternary__msg || 'toast'\`)));
}`
