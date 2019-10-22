const code = `
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
}`

const t = require("babel-core").transform(code, {
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
})
console.log(t.code)