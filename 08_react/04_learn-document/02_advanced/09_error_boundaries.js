// 에러 경계는 하위 컴포넌트 트리의 어디에서든 자바스크립트 에러를 기록하며 깨진 컴포넌트 트리 대신 폴백 UI를 보여주는 React 컴포넌트
// 에러 경계는 렌더링 도중 생명주기 메서드 및 그 아래에 있는 전체 트리에서 에러를 잡아냅니다.
// 에러가 발생한 뒤에 폴백 UI를 렌더링하려면 static getDerivedStateFromError()를 에러 정보를 기록하려면 componentDidCatch()를 사용하는게 좋다.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// 위와 같은 에러 경계를 구축한 후 사용은 아래와 같이 하면 된다.
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>

// 에러 경계는 트리 내에서 하위에 존재하는 컴포넌트의 에러만을 포착합니다. 에러 경계 자체적으로는 에러를 포착할 수 없습니다.
// 에러 경계가 에러 메시지를 렌더링하는 데에 실패한다면 에러는 그 위의 가장 가까운 에러 경계로 전파될 것입니다.
// 에러 경계 배치는 개발자에게 달려있다.