class FlavorForm extends React.Component {
  state = {
    value: 'coconut',
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit = (e) => {
    alert('Your favorite flavor is: ' + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          {/*
            기존 HTML에서는 selected 속성이 있어서 값을 초기화할 수 있었는데
            React에서는 selected 속성 대신에 최상단 select 태그에 value 속성을 사용한다.
            한 곳에서만 업데이트하면 되므로 제어 컴포넌트에서 사용하기 더 편하다.
          */}
          {/*
            참고로 select 태그에 multiple 옵션을 허용한다면 value 어트리뷰트에 배열을 전달할 수 있다.
            <select multiple={true} value={['B', 'C']}>
          */}
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('root')
);

// 전반적으로 <input type="text">, <textarea> 및 <select> 모두 매우 비슷하게 동작한다.
// 모두 제어 컴포넌트를 구현하는데 value 어트리뷰트를 허용합니다.

// 참고로 <input type="file">는 값이 읽기 전용이므로 React에서는 비제어 컴포넌트이다.