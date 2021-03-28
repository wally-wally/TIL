// 제어 컴포넌트(Controlled Component)
// React에 의해 값이 제어되는 입력 form element

class NameForm extends React.Component {
  state = {
    value: 'Please write an essay about your favorite DOM element.',
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit = (e) => {
    alert('A name was submitted: ' + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" /> */}
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);