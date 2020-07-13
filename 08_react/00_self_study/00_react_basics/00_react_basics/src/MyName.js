// (1) 클래스형 컴포넌트

// import React, { Component } from 'react';

// class MyName extends Component {
//   static defaultProps = {
//     name: 'velopert'
//   };
//   render() {
//     return (
//       <div>
//         안녕하세요! 제 이름은 <b>{this.props.name}</b>입니다.
//       </div>
//     );
//   }
// }

// (2) 함수형 컴포넌트 : 메모리 자원 덜 사용, 초기 구동 속도가 미세하게 빠름(속도 최적화)
// 값을 받아서 단순히 출력하는 경우 함수형 컴포넌트를 사용한다.
import React from 'react';

const MyName = ({ name }) => {
  return (
    <div>
      안녕하세요! 제 이름은 <b>{name}</b> 입니다.
    </div>
  );
};

MyName.defaultProps = {
  name: 'velopert'
};

export default MyName;
