class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// FancyButton을 내보내는 대신 LogProps를 내보냅니다.
// 그래도 FancyButton을 렌더링합니다.
export default logProps(FancyButton);





import FancyButton from './FancyButton';

const ref = React.createRef();

// 가져온 FancyButton 컴포넌트는 LogProps HOC입니다.
// 렌더링된 결과가 동일하다고 하더라도,
// ref는 내부 FancyButton 컴포넌트 대신 LogProps를 가리킵니다!
// 이것은 우리가 예를 들어 ref.current.focus()를 호출할 수 없다는 것을 의미합니다.
// refs는 전달되지 않는다는 것입니다. 그것은 ref는 prop이 아니기 때문입니다. key와 마찬가지로 ref는 React에서 다르게 처리합니다.
// 만약 HOC에 ref를 추가하면 ref는 래핑 된 컴포넌트가 아니라 가장 바깥쪽 컨테이너 컴포넌트를 참조합니다.

<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;





// 다행히도 React.forwardRef API를 사용하여 내부 FancyButton 컴포넌트에 대한 refs를 명시적으로 전달할 수 있습니다.
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // 사용자 정의 prop "forwardedRef"를 ref로 할당합니다.
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // React.forwardRef에서 제공하는 두 번째 파라미터 "ref"에 주의하십시오.
  // 가령 "forwardedRef"같은 일반 prop으로 LogProps에 전달할 수 있습니다.
  // 그 다음 Component에 연결할 수 있습니다.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}