const DataSource = {
  getBookList() {
    return [
      {
        id: 1,
        name: 'book1',
        price: '10000',
      },
      {
        id: 2,
        name: 'book2',
        price: '20000',
      },
      {
        id: 3,
        name: 'book3',
        price: '30000',
      },
    ]
  },
  getFruit(id) {
    const fruits = [
      {
        id: 1,
        name: 'fruit1',
        price: '1000',
      },
      {
        id: 2,
        name: 'fruit2',
        price: '2000',
      },
      {
        id: 3,
        name: 'fruit3',
        price: '3000',
      },
    ]
    return fruits.find(fruit => fruit.id === id);
  },
}

function BookList(props) {
  return (
    <ul>
      {props.data.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  )
}

function FruitList(props) {
  return (
    <div>{JSON.stringify(props.data)}</div>
  )
}

function withHoc(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      }
      this.showItem = this.showItem.bind(this);
    }

    componentDidMount() {
      this.showItem();
    }

    showItem() {
      console.log(this.state.data);
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

const BookWithHoc = withHoc(
  BookList,
  (DataSource) => DataSource.getBookList()
)

const FruitWithHoc = withHoc(
  FruitList,
  (DataSource, props) => DataSource.getFruit(props.id)
)

ReactDOM.render(
  <React.Fragment>
    <BookWithHoc />
    <FruitWithHoc id={1} />
  </React.Fragment>,
  document.getElementById('root')
);
