const toReactJsx = require('./toReactJsx')
const {
  h,
  dispatchWithParams
} = require('./extract')


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
`

const reactJsx = toReactJsx(example)
console.log(reactJsx);
// const extractCode = extract(reactJsx)

const fn = new Function(`
let componentId = 0
var h = ${h};
var dispatchWithParams = ${dispatchWithParams}
${reactJsx}
return App`)()
console.log(fn.toString())
const res = fn({})
console.log(res);