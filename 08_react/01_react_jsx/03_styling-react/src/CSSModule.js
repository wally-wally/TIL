import React from 'react';
import classNames from 'classnames/bind';
import styles from './CSSModule.module.scss';

const cx = classNames.bind(styles); // 미리 styles 에서 클래스를 받아오도록 설정

const CSSModule = () => {
  return (
    // <div className={`${styles.wrapper} ${styles.inverted}`}>
    <div className={cx('wrapper', 'inverted')}>
      안녕하세요. 저는<span className="something">wally-wally</span>입니다!
    </div>
  );
};

export default CSSModule;