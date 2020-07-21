import React from 'react';
import qs from 'qs'; // 쿼리 문자열을 객체로 반환하기 위해 qs 라이브러리 설치 필요

// 쿼리를 사용할 때는 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열임!
// 즉, ?value=1 이나 ?value=true로 온다고 해서 숫자형이나 논리형으로 변환되지 않고 항상 문자열 형태로 받아짐
// 그래서 숫자로 받기 윈한다면 parseInt와 같은 숫자형 변환 함수를 사용하거나
// 논리형으로 받기 원한다면 정확히 'true'나 'false' 문자열이랑 일치(=== 'true', === 'false')하는지 비교하면 된다.
const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true // 문자열 맨 앞의 '?'를 생략
  });
  const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열임
  return (
    <div>
      <h1>소개</h1>
      <p>홈페이지 설명</p>
      {showDetail && <p>detail 값을 true로 설정함!</p>}
    </div>
  );
};

export default About;