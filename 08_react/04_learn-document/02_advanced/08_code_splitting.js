// before
// import { add } from './math';

// console.log(add(16, 26));

// after
// import("./math").then(math => {
//   console.log(math.add(16, 26));
// });


// React.lazy
// React.lazy()를 사용하면 동적으로 불러오는 컴포넌트를 정의할 수 있습니다. 그러면 번들의 크기를 줄이고, 초기 렌더링에서 사용되지 않는 컴포넌트를 불러오는 작업을 지연시킬 수 있습니다.
// React.lazy 함수를 사용하면 동적 import를 사용해서 컴포넌트를 렌더링 할 수 있습니다.
// lazy 컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야 하며, Suspense는 lazy 컴포넌트가 로드되길 기다리는 동안 로딩 화면과 같은 예비 컨텐츠(fallback)를 보여줄 수 있게 해줍니다.
// Suspense 컴포넌트는 lazy 컴포넌트를 감쌉니다. 하나의 Suspense 컴포넌트로 여러 lazy 컴포넌트를 감쌀 수도 있습니다.
// cf) 동적 import와 함께 React.lazy를 사용하려면 JS 환경이 프라미스(Promise)를 지원해야 합니다. IE11 이하에서는 폴리필(Polyfill)이 필요합니다.
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}

// 애플리케이션 내에서 코드 분할의 가장 적합한 지점은 라우트이다.
// 웹 페이지를 불러오는 시간은 페이지 전환에 어느 정도 발생하며 대부분 페이지를 한번에 렌더링하기 때문에 사용자가 페이지를 렌더링하는 동안 다른 요소와 상호작용하지 않습니다.
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
// 참고로 vue.js에서도 vue-router 기반으로 구성된 router.js(또는 router.ts) 파일에서 컴포넌트 lazy loading을 구현하는 경우가 많다.

// (추가) code splitting시 아래 예시 코드와 같이 webpackChunkName을 지정하면 특정 컴포넌트들을 하나의 묶음으로 처리할 수 있다.(https://webpack.js.org/api/module-methods/#magic-comments)
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo')

// React.lazy는 현재 default exports만 지원합니다. named exports를 사용하고자 한다면 default로 이름을 재정의한 중간 모듈을 생성할 수 있습니다.
// javascript export 참고 문서(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export)
// named export는 한 모듈 내에서 여러 개 존재할 수 있지만, default export는 하나만 가능하다.
// 또한 named export는 여러 값을 내보낼 때 유용하고 가져올 때는 내보낸 이름과 동일한 이름을 사용해야 하지만, default export는 어떤 이름으로도 가져올 수 있다.