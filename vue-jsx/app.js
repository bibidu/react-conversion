const Header = ({ title }) => <h1>{title}</h1>
const arr = [1, 2, 3]
const App = <React.Fragment>
  {
    <div>
      arr.map((item) => (
        <Header key={item.id} title={item.title} />
      ))
      <div>loading</div>
    </div>
  }
</React.Fragment>