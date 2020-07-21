import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profiles from './Profiles';
import HistorySample from './HistorySample';
import NotFound from './NotFound';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History Example</Link>
        </li>
      </ul>
      <hr />
      {/*
        Switch 컴포넌트는 여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만 rendering 한다.
        Switch를 사용하면 모든 규칙과 일치하지 않을 때 보여 줄 Not Found 페이지도 구현할 수 있다.
      */}
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path={['/about', '/info']} component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;