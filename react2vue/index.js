const toReactJsx = require('./toReactJsx')
const extract = require('./extract')


const example = `
const Text = (props) => {
  return <h2>{props.msg}</h2>
}
const App = ({ list = [1, 2, 3] }) => {
  const onClick = () => {
    alert(1)
  }
  return (
    <div className="app" onClick={onClick}>
      {
        list.map(item => <h1 key={item}>{item}</h1>)
      }
      <Text msg="gogogo" />
    </div>
  )
}
module.exports = App
`

const reactJsx = toReactJsx(example)
console.log(reactJsx);
// const extractCode = extract(reactJsx)
// console.log(extractCode)