const React = require('./React')

module.exports.componentJson = {
  props: {
    list: {
      type: 'array',
      default: [
        { id: 1, friends: ['Alice', 'John'] },
        { id: 2, friends: ['Tom', 'bibidu'] }
      ]
    },
    show: {
      type: 'boolean',
      default: true
    },
    visiable: {
      type: 'boolean',
      default: true
    }
  }
}
module.exports.componentString = `
class Button extends React.Component{
  render() {
    return (
      <div id="container">
        {
          list.map((item, idx) => (
            <h1 key={idx}>
              {
                item.friends.map(friend => (
                  <button key={friend.id}>
                    {friend}
                  </button>
                ))
              }
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
}
`
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
module.exports.mockRenderString = `function render() {
  var msg = this.props.msg;
  return React.createElement("div", null, React.createElement("button", {
    onClick: \`@@ctxString__this.show\`
  }, \`@@ternary__msg ? '隐藏' : '显示'\`, "Toast"), React.createElement("div", null, React.createElement("div", null, \`@@ternary__msg || 'toast'\`)));
}`
