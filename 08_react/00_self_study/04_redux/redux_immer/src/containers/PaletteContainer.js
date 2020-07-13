import React, { Component } from 'react';
import { connect } from 'react-redux';
import Palette from '../components/Palette';
import { changeColor } from '../store/modules/counter';

class PaletteContainer extends Component {
  handleSelect = color => {
    console.log(this.props)
    const { changeColor } = this.props;
    console.log('Changed color is ' + color);
    changeColor(color);
  }

  render() {
    const { color } = this.props;
    return <Palette onSelect={this.handleSelect} selected={color} />;
  }
}

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  color: state.counter.color,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(changeColor(color)),
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때는 connect 함수를 사용한다.
// mapStateToProps : 이 함수의 파라미터를 전달해 주는 역할
// 스토어 안에 있는 값을 props로 전달하고
// mapDispatchProps는 액션 생성함수를 props로 전달해준다.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteContainer)