// https://ko.reactjs.org/docs/conditional-rendering.html#preventing-component-from-rendering
// 위 문서에 있는 예제 코드를 리팩토링한 버전입니다.

function WarningBanner({ warn }) {
  return warn && <div>Warning!</div>;
}

class Page extends React.Component {
  state = {
    showWarning: true,
  }

  handleToggleClick = () => {
    this.setState(prevState => {
      return {
        showWarning: !prevState.showWarning
      }
    });
  }

  render() {
    const isWarning = this.state.showWarning;
    return (
      <div>
        <WarningBanner warn={isWarning} />
        <button onClick={this.handleToggleClick}>
          {isWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);