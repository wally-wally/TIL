// (4-1) CounterContainer 만들기
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

class CounterContainer extends Component {
  handleIncrement = () => {
    this.props.increment();
  }

  handleDecrement = () => {
    this.props.decrement();
  }

  render() {
    const { color, number } = this.props;
    return (
      <Counter
        color={color}
        value={number}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
      />
    );
  }
}
// destructuring 미적용 버전
// const mapStateToProps = state => ({
  // color: state.counter.color,
  // number: state.counter.number,
// });

// destructuring 적용 버전
const mapStateToProps = ({ counter }) => ({
  color: counter.color,
  number: counter.number,
})

// const mapDispatchToProps = dispatch => ({
  // (#1) bindActionCreators 미적용 버전
  // increment: () => dispatch(increment()),
  // decrement: () => dispatch(decrement()),

  // (#2) bindActionCreators 적용 버전
  // bindActionCreators({ increment, decrement }, dispatch);
// })

// (#3) 함수가 아닌 객체 설정시 자동 bindActionCreators 됨
const mapDispatchToProps = { increment, decrement };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);