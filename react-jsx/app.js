const code = `

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