const babel = require('@babel/core')
const code = `
<div id="app">
  <div id="container">
    <div>
    {
      [1, 2].map(item => (
      <span>span</span>
      ))
    }
    </div>

  </div>
</div>
                    `

const r = babel.transformSync(code, {
  presets: [
    // "@babel/preset-env",
    "@babel/preset-react"
  ],
})

// console.log(r.code)