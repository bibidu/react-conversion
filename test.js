const {
  isComponentName
} = require('./utils')
let componentId = 0
const h = (tagNameOrComponentName, attrs, ...children) => {
  const tree = {}

  tree.attrs = attrs
  tree.children = children
  if (typeof tagNameOrComponentName === 'string') {
    tree.isComponent = false
    tree.tagName = tagNameOrComponentName
    return tree
  } else {
    tree.isComponent = true
    tree.componentId = ++componentId
    tree.tagName = tagNameOrComponentName.name
    return dispatchWithParams(tagNameOrComponentName, { componentId })
  }
}
const dispatchWithParams = (component, params) => {
  const result = component({})
  return {...result, ...params}
}

// console.log(tree)


const Text = props => {
  return h("h2", null, props.msg);
};

const App = ({
  list = [1, 2, 3]
}) => {
  const onClick = () => {
    alert(1);
  };

  return h("div", {
    className: "app",
    onClick: onClick
  }, list.map(item => h("h1", {
    key: item
  }, item)), h(Text, {
    msg: "gogogo"
  }));
};

const result = App({})
console.log('result')
console.log(result)