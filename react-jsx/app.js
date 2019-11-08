const code = `
const T = () => {
	if (flag) {
		return <h1>1</h1>
	}
	return <h1>2</h1>
}
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