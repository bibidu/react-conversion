import 'index.scss'

class T extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTernary() {
    if (this.props.show) {
      return React.createElement("h1", null, "default ", this.props.show);
    }

    switch(true) {
           case 1: {
           		if (t) {
                	return <h1/>
                }
           }    
  	}
    return React.createElement("div", null, "default ", this.props.show);
  }

  renderTernary2() {
    return React.createElement("div", null, show ? React.createElement("h1", null) : visiable ? React.createElement("h2", null) : React.createElement("h3", null));
  }

  render() {
    const {
      list,
      show,
      visiable,
      msg1
    } = this.props;
    this.setState({});
    return React.createElement("div", {
      id: "container",
      className: "dxz"
    }, this.renderTernary(), this.renderTernary2());
  }

}