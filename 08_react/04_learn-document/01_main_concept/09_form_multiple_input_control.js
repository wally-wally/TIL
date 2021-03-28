class Reservation extends React.Component {
  state = {
    isGoing: true,
    numberOfGuests: 2
  }

  handleInputChange = (e) => {
    // 여러 input element를 제어할 때 각 element에 name 속성을 추가하고
    // e.target.name 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 해준다.
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // 주어진 input tag의 name 속성에 일치하는 state를 업데이트하기 위해
    // ES6의 computed property name 문법을 사용했다.
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

ReactDOM.render(
  <Reservation />,
  document.getElementById('root')
);