class T extends React.Component{
  constructor(props) {
    super(props)
  }
  test() {
    this.setState({
      
    })
  }
  render() {
    const { list, show, visiable, msg1 } = this.props
    this.setState({})
    return (
      <div id="container" onClick={() => alert(1)}>
        {
          list.map((item, idx) => (
            <h1 key={idx}>
              {
                item.friends.map(friend => (
                  <button key={friend.id}>
                    {friend}
                  </button>
                ))
              }
            </h1>
          ))
        }
        {
          'a' && 'b' || show || (
            <div>
              <h1>12</h1>
            </div>
          )
        }
        {
          show ? <h1>h1</h1> : !visiable ? <h2>h2</h2> : <h3>h3</h3>
        }
      </div>
    )
  }
}