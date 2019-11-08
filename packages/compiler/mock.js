const React = require('./React')

module.exports.componentJson = {
  name: 'T',
  props: {
    list: {
      type: 'array',
      default: [
        { id: 1, friends: ['Alice', 'John'] },
        { id: 2, friends: ['Tom', 'bibidu'] }
      ]
    },
    show: {
      type: 'boolean',
      default: true
    },
    visiable: {
      type: 'boolean',
      default: true
    }
  }
}
module.exports.componentString = `
class T extends React.Component{
  render() {
    const { list, show, visiable } = this.props
    this.setState({})
    //fetch().then(res => {
      //this.setState({})
    //})
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
`