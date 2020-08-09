import React from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
// import { bindActionCreators } from 'redux';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// mapStateToProps
// redux 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
// const mapStateToProps = state => ({
//   number: state.counter.number,
// });

// mapDispatchToProps
// 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
// const mapDispatchToProps = dispatch => (
//   bindActionCreators({ increase, decrease }, dispatch)
// );

// 컴포넌트를 redux와 연동하기 위해 react-redux에서 제공하는 connect 함수를 사용한다.
// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
// export default connect(mapStateToProps, { increase, decrease })(CounterContainer);
export default connect(state => ({
  number: state.counter.number,
}), { increase, decrease })(CounterContainer);