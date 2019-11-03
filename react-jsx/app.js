const code = `
const T = () => (
  <div>
    { show ? this.renderA() : this.renderB() }
  </div>
)
`
  // <p v-else>No message.</p>
  const rest = require("@babel/core").transform(code, {
    presets: [
      // "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: ["@babel/plugin-proposal-class-properties"]
});
console.log('==============');
console.log(rest.code);

// React.createElement(MyComponent, {
//   onClick: ""
// }, "hello");