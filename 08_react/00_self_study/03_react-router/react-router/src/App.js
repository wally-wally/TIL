import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// component splitting 미적용
// import Home from './routes/Home';
// import About from './routes/About';
// import Posts from './routes/Posts';
// import Login from './routes/Login';
// import MyPage from './routes/MyPage';
// import Search from './routes/Search';
// import NoMatch from './routes/NoMatch';

// component splitting 적용
import { Home, About, Posts, MyPage, Login, Search, NoMatch } from './pages';

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