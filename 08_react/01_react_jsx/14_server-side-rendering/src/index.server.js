// 서버 사이드 렌더링을 할 때는 서버를 위한 엔트리(entry) 파일을 따로 생성해야 한다.
import React from 'React';
import ReactDOMServer from 'react-dom/server';

// 서버에서 리액트 컴포넌트를 렌더링할 때는 ReactDOMServer의 renderToString 함수를 사용한다.
// 이 함수에 JSX를 넣어서 호출하면 렌더링 결과를 문자열로 반환한다.
const html = ReactDOMServer.renderToString(
  <div>Hello Server Side Rendering!</div>
)

console.log(html);