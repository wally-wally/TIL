import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ name, children, favoriteNumber }) => {
  return (
    <Fragment>
      <div>함수형 컴포넌트</div>
      <div>
        안녕하세요, 제 이름은 {name} 입니다. <br />
        children 값은 {children} 입니다. <br />
        제가 제일 좋아하는 숫자는 {favoriteNumber} 입니다.
      </div>
    </Fragment>
  );
};

MyComponent.defaultProps = {
  name: '기본 이름'
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
}

export default MyComponent;