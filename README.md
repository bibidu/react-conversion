# react-conversion

# vue-jsx or react-jsx
## 例子
```js
<MyComponent onClick="">hello</MyComponent>
```

```js
// vue
h(
  MyComponent,
  {
    on: {
      "click": ""
    }
  },
  ["hello"]
);
```

```js
// react
h(MyComponent, {
  onClick: ""
}, "hello");
```


```js
<div>
  <header>
    <h1>I'm a template!</h1>
  </header>
  {
    message ? <p>{{ message }}</p> : <p>No message.</p>
  }
</div>
```

```js
// vue
h("div", [h("header", [h("h1", ["I'm a template!"])]), message ? h("p", [{ message: message }]) : h("p", ["No message."])]);
```

```js
// react
h("div", null, h("header", null, h("h1", null, "I'm a template!")), message ? h("p", null, {
  message
}) : h("p", null, "No message."));
```

```js
const Header = <div>Header</div>
const App = <div>
  <Header>
  </Header>
</div>

```

```js
// vue
var Header = h("div", ["Header"]);
var App = h("div", [h(Header)]);
```

```js
// react
const Header = h("div", null, "Header");
const App = h("div", null, h(Header, null));
```

```js
const Header = ({ title }) => <h1>{title}</h1>
const arr = [1, 2, 3]
const App = <div>
  {
    arr.map((item) => (
      <Header key={item.id} title={item.title} />
    ))
  }
</div>
```

```js
// vue
"use strict";

var Header = function Header(_ref) {
  var title = _ref.title;
  return h("h1", [title]);
};
var arr = [1, 2, 3];
var App = h("div", [arr.map(function (item) {
  return h(Header, { key: item.id, attrs: { title: item.title }
  });
})]);
```

```js
// react
const Header = ({
  title
}) => h("h1", null, title);

const arr = [1, 2, 3];
const App = h("div", null, arr.map(item => h(Header, {
  key: item.id,
  title: item.title
})));
```

```js
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
}
```

```js
// vue
function render() {
  var show = this.state.show;
  var msg = this.props.msg;

  return h('div', [h(
    'button',
    {
      on: {
        'click': this.showToast
      }
    },
    [show ? '隐藏' : '显示', 'Toast']
  ), show && h(
    'div',
    { style: styles.container },
    [h(
      'div',
      { style: styles.modalWrapper },
      [msg || 'toast']
    )]
  )]);
}
```

```js
// react
function render() {
  const {
    show
  } = this.state;
  const {
    msg
  } = this.props;
  return h("div", null, h("button", {
    onClick: this.showToast
  }, show ? '隐藏' : '显示', "Toast"), show && h("div", {
    style: styles.container
  }, h("div", {
    style: styles.modalWrapper
  }, msg || 'toast')));
}
```
## 区别

### 事件
- vue-jsx会编译为 `on: { click: "..." }` (on开头的事件对象)
- react-jsx会编译为 `onClick: "..."` (事件名)

### 单一文本节点
- vue-jsx会编译为 `"some text"` (字符串)
- react-jsx会编译为 `["some text"]` (字符串数组)

### 标签无任何属性
- vue-jsx会编译为 `h("h1", "I'm a template!")` (忽略第二个属性对象)
- react-jsx会编译为 `h("h1", null, "I'm a template!")` (第二个属性对象为null)

### 标签存在多个属性
- vue-jsx会编译为  `h(Header, { key: item.id, attrs: { title: item.title }` (非key属性会嵌套在attrs属性中)
- react-jsx会编译为 `h(Header, { key: item.id, title: item.title })` (key与其他属性平级)


# 目前的问题
- [x] rollup打包@babel/types存在循环引用的问题、打包速度过慢
babel/core、types、generate等包时本身体积过大，将ES6引入、暴露方式改为commonjs规范的引入、暴露

- [x] v-for="(friend) in item.friends" 写法不合法
改为v-for="(friend,_) in item.friends" 或 v-for="friend in item.friends"

- [x] onClick={() => this.tapContainer()} 编译结果丢失() => {}

- [x] logicalVisitor改造ast后添加了identifier类型的React运行时方法，导致MainVisitor判断时也进行了判断，但这种情况应该忽略

- [ ] render中jsx使用了renderA、renderB，在编译时都会合并到render方法中，如何在编译完毕后再返回到各自的renderA、renderB中

- [ ] 当jsx中出现 if (flag) { return <h1/> }的写法时，如何转化成React运行时函数的形式。（思考当前编译方案的思路是否可行）

- [ ] vue的jsx写法如何支持嵌套:

```js
// jsx
const Text = (props) => {
  return <h2>{props.msg}</h2>
}
<Text msg="gogogo" />
// jsx的编译结果: 无法正常渲染
var Text = function Text(props) {
  return h("h2", [props.msg]);
};
h(Text, {
  attrs: { msg: "gogogo" }
})
```

- [x] 舍弃方案
react -> jsx method -> runtime modify -> universal js tree -> vue/...

原因: runtime modify -> universal js tree时部分语法实现过于复杂
```js
{
  [1, 2].map(item => <h1 key={item}>{item}</h1>).slice(1)
}
```

```js
Array.prototype.for = Array.prototype.map
render() {
  return (
    <>
      {
        [1, 2].for(item => <h1 key={item}>{item}</h1>).slice(1)
      }
    </>
  )
}
```

解决方案：react -> jsx method -> jsx modify -> universal jsx -> vue/...

弊端：生成代码为`通用jsx`, 对于不支持jsx语法的端如何转化仍未解决