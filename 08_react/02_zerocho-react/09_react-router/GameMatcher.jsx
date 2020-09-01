import React, { Component } from 'react';
import NumberBaseball from '../03_number-baseball/NumberBaseball-class';
import RSP from '../05_rsp/RSPClass';
import Lotto from '../06_lotto/LottoClass';
// import { withRouter } from 'react-router-dom';

class GameMatcher extends Component {
  render() {
    console.log(this.props);
    // history: 기존의 페이지 넘나드는 내역들
    // react-router는 실제로 페이지가 바뀌는 것이 아니고
    // 실제로 페이지가 바뀌는 것처럼 보이는 마치 하나의 페이지에서 눈속임 하는 것이다.
    // 그래서 기존 JS의 history API를 사용하면 안 되고 react-router의 history를 사용해야 한다.

    // match: 실제 주소 정보들이 담겨 있다.
    // match.params에 params로 설정한 값들이 저장되어 있다.
    // 이 값들로 분기 처리해서 보여주는 컴포넌트들을 설정할 것이다.

    // location: pathname, search, hash들이 들어 있다.
    // location.search에 queryString 값을 가져올 수 있다.
    // 여기에 있는 값들을 편하게 보기 위해 아래와 같이 작성할 수 있다.
    // react-router에서는 기본적으로 query 값을 가져오는 기능이 없으므로 JS의 URLSearchParams를 이용하면 된다.
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlSearchParams.get('query'));
    console.log(urlSearchParams.get('hello'));
    console.log(urlSearchParams.get('bye'));

    // 아래와 같이 구성하면 Route를 많이 구성할 필요가 없지만
    // 해당 컴포넌트에서 코드가 길어진다는 단점이 있다.
    // 그래서 상황에 맞게 판단해서 어떻게 코드를 구성할지 결정하면 된다.
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball />;
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP />;
    } else if (this.props.match.params.name === 'lotto-generator') {
      return <Lotto />;
    }
    return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    );
  }
}

// Route로 연결되지 않은 컴포넌트들에서 history, match, location에 접근해서 쓰고 싶으면
// withRouter로 연결해줘야 한다.
// 저 세 가지 값들이 그냥 하늘에서 떨어지는 것이 아니라 어딘가에 react-router가 연결되어 있다는 점을 잊지 말자.
// export default withRouter(GameMatcher);
export default GameMatcher;