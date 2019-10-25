const code = `

const Card = ({ msg }) =>  {
    return (
      <div>
        {
          () => (
            <h1>{msg || '123'}</h1>
          )
        }
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