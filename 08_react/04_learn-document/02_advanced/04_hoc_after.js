// HOC
// 컴포넌트 로직을 재사용하기 위한 React의 고급 기술
// 동일한 패턴이 반복적으로 발생하는 로직을 한 곳에서 정의하고 많은 컴포넌트에서 로직을 공유할 수 있도록 추상화할 때 HOC 기술을 사용하면 좋다.

// 리액토 공식문서 예시 코드(전반적인 큰 구조만 살펴보자.)
// 04_hoc_before.js => 04_hoc_after.js
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

// 이 함수는 컴포넌트를 매개변수로 받고..
function withSubscription(WrappedComponent, selectData) {
  // ...다른 컴포넌트를 반환하는데...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... 구독을 담당하고...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... 래핑된 컴포넌트를 새로운 데이터로 랜더링 합니다!
      // 컴포넌트에 추가로 props를 내려주는 것에 주목하세요.
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

// 고차 컴포넌트는 입력된 컴포넌트를 수정하지 않으며 상속을 사용하여 동작을 복사하지 않는다.
// 오히려 고차 컴포넌트는 원본 컴포넌트를 컨테이너 컴포넌트로 포장(Wrapping)하여 조합(compose)합니다.
// 고차 컴포넌트는 사이드 이펙트가 전혀 없는 순수 함수입니다.
// HOC 기술을 사용할 때는 원본 컴포넌트를 변경하지 말고 조합해서 사용해야 한다.(변경된 HOC는 다른 HOC와 어디선가 충돌이 생길 수 있어 사이드 이펙트가 발생할 수 있다.)
// HOC와 컨테이너 컴포넌트 패턴은 서로 유사하다고 볼 수 있다.
// 컨테이너는 구독 및 state 같은 것을 관리하고 UI 렌더링 같은 것을 처리하는 컴포넌트에 props를 전달한다.