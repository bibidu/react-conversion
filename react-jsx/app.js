const code = `

<<<<<<< HEAD
const Card = ({ header, bodyStyle, children }) =>  {
  const style = () => {}
  const className = () => {}
    return (
      <div style={style()} className={className('el-card')}>
        {
          header && <div className="el-card__header">{ header }</div>
        }
        <div className="el-card__body" style={ bodyStyle }>
          { children }
        </div>
      </div>
    )
=======
function render() {
  const { show } = this.state
  const { msg } = this.props
  return (
    <div>
    <button onClick={this.showToast}>{ show ? '隐藏' : '显示'}Toast</button>
    {
      show && <div style={styles.container}>
        <div style={styles.modalWrapper}>
          { msg || 'toast' }
        </div>
      </div>
    }
    </div>
  )
>>>>>>> f45329451d7df5b2300613eff947f276490ed1d6
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