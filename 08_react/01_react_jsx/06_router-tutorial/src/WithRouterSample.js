import React from 'react';
import { withRouter } from 'react-router-dom';

const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        rows={12}
        cols={36}
        readOnly={true}
      />
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={12}
        cols={36}
        readOnly={true}
      />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

// withRouter 함수
// HoC로써 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해준다.
// 해당 함수를 사용할 대는 컴포넌트를 내보내 줄 때 함수로 감싸 준다.
export default withRouter(WithRouterSample);