const code = `

const Header = ({ title }) => <h1>{title}</h1>
const arr = [1, 2, 3]
const App = <React.Fragment>
  {
    <div>
      arr.map((item) => (
        <Header key={item.id} title={item.title} />
      ))
      <div>loading</div>
    </div>
  }
</React.Fragment>
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