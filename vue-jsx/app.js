
const App = ({ list = [1, 2, 3] }) => {
  const onClick = () => {
    alert(1)
  }
  const Text = (props) => {
    return <h2>{props.msg}</h2>
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
