// styled-components
// (공식 홈페이지: https://styled-components.com/)
// (참고 문서: https://medium.com/@okys2010/%EB%AA%A8%EB%8D%98-css-1-css-in-js-c1c53d9bbbc9)
// 컴포넌트 스타일링 중 최근 트랜드는 'CSS-in-JS'이다.
// 기존 CSS 만으로 스타일링을 작업할 때 여러 문제점이 있었다.
// 클래스 이름 중복문제, 스타일 상속에 의한 중복, 미사용 코드 처리, 클래스 이름 최소화 등...
// 이러한 문제를 해결해주는 스타일링 방식인 'CSS-in-JS'가 최근 이슈에 있다.
// 'CSS-in-JS' 라이브러리 중에서 개발자들이 가장 선호하는 라이브러리로 'styled-components'가 있다.
// styled-components를 사용하면 JS 파일 하나로 스타일까지 작성할 수 있어 css 파일이나 scss 파일을 별도로 만들 필요가 없다.
// cf) vscode 마켓플레이스에서 vscode-styled-components를 다운받아서 설치하면 색상이 정상적으로 입혀진다.

import React from 'react';
import styled, { css } from 'styled-components';

// 반응형 디자인 작업을 여러 컴포넌트에서 반복해야 하는 경우 styled-components의 유틸 함수를 사용하면 해당 작업을 함수화해서 간편하게 사용할 수 있음
const sizes = {
  desktop: 1024,
  tablet: 786
};

// 위에 있는 sizes 객체에 따라 자동으로 media 쿼리 함수를 만들어 준다.
// (참고 문서: https://styled-components.com/docs/advanced#media-templates)
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

// styled.div 뒤에 템플릿 리터럴 문법을 통해 스타일을 넣어 주면 해당 스타일이 적용된 div로 이루어진 리액트 컴포넌트가 만들어진다.
const Box = styled.div`
  /* props로 넣어 준 값을 직접 전달해 줄 수 있다. */
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
  /*
    반응형 디자인(한 번만 사용하는 경우 기존 CSS 구성할 때와 동일)
    - 기본적으로 가로 크기 1024px에 가운데 정렬
    - 가로 크기가 작아짐에 따라 크기를 줄이고
    - 768px 미만이 되면 꽉 채움
  */
  /* 
  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  } */

  /* 함수화한 media를 사용한 경우 */
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`};
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용해서 Sass 처럼 자기 자신 선택이 가능하다. */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /*
    기존 CSS에서 조건부 스타일링을 하기 위해서는 className을 사용했지만
    styled-components에서는 props만으로도 간단하게 조건부 스타일리을 할 수 있다.
  */
  /* 아래 코드는 inverted 값이 true일 때 특정 스타일을 부여해 준다. */
  /* 참고로 스타일 코드 여러 줄을 아래와 같이 props에 넣어 줄 때는 CSS로 감싸주는 것이 좋다.(그래야 Syntax Highlighting과 템플릿 리터럴이 올바르게 보여지고 동작함) */
  ${props =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요.</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;