import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0
  };

  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState(prevState => {
              return {
                number: prevState.number + 1
              }
            },
            () => {
              alert(`숫자 증가 완료\n(number: ${this.state.number}, fixedNumber: ${this.state.fixedNumber})`);
            });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;