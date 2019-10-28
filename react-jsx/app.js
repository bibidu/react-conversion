const code = `
class Button extends React.Component{
  show = () => {
    console.log('show')
    this.setState({
    	cool: true
    })
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
`
  // <p v-else>No message.</p>
  const rest = require("@babel/core").transform(code, {
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h", // default pragma is React.createElement
      "pragmaFrag": "React.Fragment", // default is React.Fragment
      // "throwIfNamespace": false // defaults to true
    }],
    ["@babel/plugin-proposal-class-properties"]
  ]
});
console.log(rest.code);

// React.createElement(MyComponent, {
//   onClick: ""
// }, "hello");