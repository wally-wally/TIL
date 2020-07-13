# :page_facing_up: React-router

<br>

## :one: Installation

```bash
npx create-react-app react-router
yarn add react-router-dom # 이 명령어만 입력해도 react-router도 함께 설치됨
```

<br>

## :two: Usage

### (1) `Router`, `Route`

`App.js`

- `BrowserRouter as Router` : `BrowserRouter`는 BrowserHistory를 이용해서 구현할 Router이며 이를 `Router`라는 이름으로 부르겠다는 의미

```react
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';

import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        {/* exact 옵션: 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여준다. */}
        {/* 만약 exact 옵션이 없다면 about 페이지에서도 Home 내용이 보인다. */}
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
};

export default App;
```

<br>

### (2) `Link`

`Header.js`

- 해당 `Link`를 누를 때 새로운 페이지를 불러오는 것이 아니라 기존의 코드만 바꿔주는 방식이다.

```react
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="item">홈</Link>
      <Link to="/about" className="item">소개</Link>
    </div>
  );
};

export default Header;
```

:heavy_check_mark: <b>지금까지 상황</b>

![캡처](https://user-images.githubusercontent.com/52685250/82287326-e610c380-99da-11ea-84cd-be1384fa9d73.JPG)

<br>

### (3) `url ` parameter

`App.js`

- `path`의 주소 뒤에 `:username` 추가

```react
<Route path="/about/:username" component={About} />
```

`About.js`

- `match.params.username`와 같이 접근

```react
import React from 'react';

const About = ({match}) => {
  return (
    <div>
      {match.params.username} 의 소개
    </div>
  );
};

export default About;
```

`Header.js`

```react
<Link to="/about/wally-wally" className="item">소개</Link>
```

<br>

### (4) nested route

`App.js`에 구문 추가

```react
<Route path="/posts" component={Posts}/>
```

`Header.js`에 `Link` 구문 추가

```react
<Link to="/posts" className="item">포스트</Link>
```

`Posts.js`

```react
import React from 'react';
import { Route, Link } from 'react-router-dom';

const Post = ({match}) => {
  return (
    <h2>
      {match.params.title}
    </h2>
  )
}

const Posts = () => {
  return (
    <div>
      <h1>포스트</h1>
      <Link to="/posts/react">React</Link>
      <Link to="/posts/redux">Redux</Link>
      <Link to="/posts/relay">Relay</Link>
      <Route
        path="/posts/:title"
        component={Post}
      />
    </div>
  );
};

export default Posts;
```

:heavy_check_mark: <b>지금까지 상황</b>

![캡처01](https://user-images.githubusercontent.com/52685250/82289677-47876100-99e0-11ea-8b35-4f6c5f16db02.JPG)

<br>

### (5) `NavLink`

- `NavLink`는 `Link`와 비슷한데, 만약 현재 경로와 `Link`에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 클래스를 적용할 수 있는 컴포넌트이다.
  - 즉, `NavLink`를 이용하면 각 페이지마다 스타일을 다르게 줄 수 있다.
- 무조건 `NavLink`를 사용해야하는 것은 아니지만 상황에 따라 `Link` 보다 `NavLink`를 사용하면 편리한 경우가 있다.

`Header.css`

```css
.item:active, .item.active { /* .item.active 추가 */
  background: white;
  color: #5c7cfa;
}
```

`Header.js`

- `Link` => `NavLink`로 수정
- 그리고 선택된 메뉴는 class명이 `active`로 바뀌도록 `activeClassName="active"` 구문을 추가해준다.
- 여기서도 마찬가지로 어느 화면을 이동해도 홈 메뉴의 배경색이 항상 흰색으로 나오기 때문에 `exact` 옵션을 추가해줘야 한다.

```react
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <NavLink exact to="/" className="item" activeClassName="active">홈</NavLink>
      <NavLink to="/about/wally-wally" className="item">소개</NavLink>
      <NavLink to="/posts" className="item">포스트</NavLink>
    </div>
  );
};

export default Header;
```

:heavy_check_mark: <b>`NavLink`를 적용한 지금까지 상황</b>

![캡처02](https://user-images.githubusercontent.com/52685250/82290004-e01de100-99e0-11ea-889d-658ee6e26417.JPG)

<br>

### (6) redirect - `Redirect` 컴포넌트만으로 구현

- 로그인을 하지 않은 경우 `마이페이지`에 바로 접근할 수 없고 `로그인` 페이지로 redirect되는 상황을 만들어보자.

- 우선 `Header.js`와 `App.js`에 로그인, 마이페이지 관련 routes component를 등록하자.

`MyPage.js`

- `logged` 값이 `false`인 경우 상단 메뉴에서 `마이페이지`를 클릭해도 `로그인`페이지로 redirect 된다.
- 반대로 `true`인 경우 `마이페에지`로 이동이 된다.

```react
import React from 'react';
import { Redirect } from 'react-router-dom';

const logged = false;

const MyPage = () => {
  return (
    <div>
      {
        !logged && <Redirect to="/login"/>
      }
      마이페이지
    </div>
  );
};

export default MyPage;
```

<br>

### (7) history로 페이지 이동

- `Home` 컴포넌트에서 `props` 중 `history`로 페이지를 이동할 수 있다.
- 참고로 `history` 객체를 통해서 우리가 컴포넌트 내에 구현하는 메소드에서 라우터에 직접 접근을 할 수 있다.
  - ex) 뒤로가기, 특정 경로로 이동, 이탈 방지 등..

`Home.js`

```react
import React from 'react';

const Home = ({history}) => {
  return (
    <div>
      Home
      <button onClick={() => {history.push('/posts')}}>post 페이지로 이동</button>
    </div>
  );
};

export default Home;
```

<br>

### (8) query parameter 처리 방법

- `Search` 컴포넌트에서 `props` 중 `location`을 이용해서 처리한다.

- `Search.js`

```react
import React from 'react';

const Search = ({location}) => {
  return (
    <div>
      {new URLSearchParams(location.search).get('keyword')} search
    </div>
  );
};

export default Search;
```

:heavy_check_mark: <b>`http://localhost:3000/search?keyword=나`로 검색했을 때 개발자 도구로 props 확인</b>

- `location` > `search` 에 이상한 문자열로 보이지만 실제로 `나` 라는 텍스트가 전달됨을 볼 수 있다.

![캡처03](https://user-images.githubusercontent.com/52685250/82291175-7b17ba80-99e3-11ea-861c-0cd2dfa33abc.JPG)

<br>

### (9) 404 Not Found Page

`App.js`

- `import` 문에 `Switch` 컴포넌트 추가

```react
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';
import Posts from './routes/Posts';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import Search from './routes/Search';
import NoMatch from './routes/NoMatch';

import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div>
        {/* Switch component로 가장 처음 매칭되는 부분만 보여주고 나머지는 무시한다. */}
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about/:username" component={About} />
          <Route path="/posts" component={Posts}/>
          <Route path="/login" component={Login}/>
          <Route path="/mypage" component={MyPage}/>
          <Route path="/search" component={Search}/>
          {/* 여기까지 왔는데 매칭되는게 없다면 NoMatch.js 즉, 404 페이지를 보여주면 된다. */}
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```

:heavy_check_mark: <b>404 Not Found Page로 접근</b>

![404](https://user-images.githubusercontent.com/52685250/82291688-6d166980-99e4-11ea-9a65-415d9e16ae10.JPG)

<br>

### (10) component code splitting

- `App.js`에서 기존의 import 구문을 사용해서 처음 홈페이지에 접속할 때 모든 컴포넌트를 가져오고 로딩해서 준비해야하므로 초기 접속 시간이 다소 오래걸릴 수 있다는 문제가 생긴다.
- 그래서 code splitting을 통해 해당 페이지에 접속할 때만 해당하는 컴포넌트만 가져와서 로딩함으로써 홈페이지 성능을 최적화시킬 수 있다.

`src` > `utils` > `withSplitting.js`

(참고 문서 : https://velog.io/@velopert/react-code-splitting)

```react
import React, { Component } from 'react';

const withSplitting = getComponent => {
  // 여기서 getComponent 는 () => import('./SplitMe') 의 형태로 함수가 전달되야합니다.
  class WithSplitting extends Component {
    state = {
      Splitted: null
    };

    constructor(props) {
      super(props);
      getComponent().then(({ default: Splitted }) => {
        this.setState({
          Splitted
        });
      });
    }

    render() {
      const { Splitted } = this.state;
      if (!Splitted) {
        return null;
      }
      return <Splitted {...this.props} />;
    }
  }

  return WithSplitting;
};

export default withSplitting;
```

`src` > `pages` > `index.js`

```react
import withSplitting from '../utils/withSplitting';

export const Home = withSplitting(() => import ('../routes/Home'));
export const About = withSplitting(() => import ('../routes/About'));
export const Posts = withSplitting(() => import ('../routes/Posts'));
export const MyPage = withSplitting(() => import ('../routes/MyPage'));
export const Login = withSplitting(() => import ('../routes/Login'));
export const Search = withSplitting(() => import ('../routes/Search'));
export const NoMatch = withSplitting(() => import ('../routes/NoMatch'));
```

`App.js`

```react
// before(component code splitting 미적용) => 전부 삭제
import Home from './routes/Home';
import About from './routes/About';
import Posts from './routes/Posts';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import Search from './routes/Search';
import NoMatch from './routes/NoMatch';

// after(component code splitting 적용) => 이 구문으로 변경
import { Home, About, Posts, MyPage, Login, Search, NoMatch } from './pages';
```

- code splitting을 적용함으로써 코드 라인도 1줄로 간결해짐을 볼 수 있다.