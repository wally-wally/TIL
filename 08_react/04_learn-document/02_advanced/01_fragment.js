class User extends React.Component {
  render() {
    return (
      // 마치 빈 태그와 같은 Fragment를 선언하는 더 짧고 새로운 문법
      <>
        <li>wally1</li>
        <li>wally2</li>
      </>
    );
  }
}

class UserList extends React.Component {
  render() {
    return (
      <ul>
        <User />
      </ul>
    );
  }
}

ReactDOM.render(
  <UserList />,
  document.getElementById('root')
);

// 만약 Fragment에 key가 있다면 빈 태그 형태로 쓸 수 없고
// <React.Fragment> 문법으로 명시적으로 선언해야 한다.