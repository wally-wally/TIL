import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        {/* Link 컴포넌트 안에 a 태그를 써야 한다. */}
        <Link href="/"><a>노드버드</a></Link>
        <Link href="/profile"><a>프로필</a></Link>
        <Link href="/signup"><a>회원가입</a></Link>
      </div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppLayout;