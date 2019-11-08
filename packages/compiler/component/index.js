class T extends React.Component{
  constructor(props) {
    super(props)
  }
  renderTernary() {
    return (
      <div>
        {
          show ? <h1>h1</h1> : !visiable ? <h2>h2</h2> : <h3>h3</h3>
        }
      </div>
    )
  }
  render() {
    const { list, show, visiable, msg1 } = this.props
    this.setState({})
    return (
      <div id="container">
        {this.renderTernary()}
      </div>
    )
  }
}