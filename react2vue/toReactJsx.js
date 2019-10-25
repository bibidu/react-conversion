const babel = require("@babel/core")

module.exports = function toReactJsx(functionalCode) {
  const compiled = babel.transform(functionalCode, {
    "plugins": [
      ["@babel/plugin-transform-react-jsx", {
        "pragma": "h",
      }],
      // ["@babel/plugin-proposal-class-properties"]
    ]
  });
  return compiled.code
}