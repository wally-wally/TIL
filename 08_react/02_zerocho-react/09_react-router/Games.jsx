import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
  return (
    // BrowserRouter는 URL 주소가 깔끔하지만 새로고침하면 파일을 찾을 수 없다는 오류가 나오는 반면
    // HashRouter는 '#'이라는 해쉬가 붙어서 URL 주소가 다소 깔끔하지 않지마 새로고침해도 페이지가 잘 나온다.
    // 왜냐하면 해쉬 뒷 부분은 브라우저(FE)만 아는 부분이고 서버쪽은 인식할 수 없다.
    // 서버쪽에서 인식하지 못하면 검색 엔진 최적화 부분에서 매우 안 좋다.(검색 엔진 로봇이 읽을 수 없음)
    // 그래서 실무에서는 HashRouter를 잘 사용하지 않는다.(검색 엔진이 중요하기 때문)
    // BrowserRouter 사용해도 SEO를 위해 서버 쪽에 별도의 세팅이 필요하다.
    <BrowserRouter>
      <div>
        <Link to="/game/number-baseball?query=10&hello=wally&bye=react">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임매쳐</Link>
      </div>
      <div>
        {/* <Route path="/number-baseball" component={NumberBaseball} />
        <Route path="/rock-scissors-paper" component={RSP} />
        <Route path="/lotto-generator" component={Lotto} /> */}
        {/*
          동적 라우트 매칭(':' 붙은 것들을 params라고 한다.)
          Route가 늘어나는 것을 방지할 수 있다.
        */}
        {/* <Route path="/game/:name" component={GameMatcher} /> */}

        {/*
          Switch: 처음으로 일치하는 것들만 rendering해서 보인다.(동시에 여러 개 뜨는 것 방지)
          하지만 상위 주소와 하위 주소가 함께 있는 경우 상위 주소도 일치하는 것으로 간주됨(exact로 해결 가능)
        */}
        {/* <Switch>
          <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
          <Route path="/game/number-baseball" render={(props) => <GameMatcher {...props} />} />
        </Switch> */}
        {/* cf)props를 넘기는 경우 */}
        {/* <Route path="/game/:name" render={(props) => <GameMatcher props={props.abc} />} /> */}

        {/*
          exact: 해당 path와 정확하게 일치해야 보이도록 설정할 수 있다.(Switch만으로 해결할 수 없을 때 사용)
        */}
        <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
        <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
      </div>
    </BrowserRouter>
  );
};

export default Games;