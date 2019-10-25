const code = `

class Button {
  render(){
    return (
      <div>
      <button onClick={this.show}>{ show ? '隐藏' : '显示'}Toast</button>
      {
        show && <div style={styles.container}>
          <div style={styles.modalWrapper}>
            { msg || 'toast' }
          </div>
        </div>
      }
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
    }]
  ]
});
console.log(rest.code);

// React.createElement(MyComponent, {
//   onClick: ""
// }, "hello");