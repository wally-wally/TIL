const user = {
  firstName: 'Harper',
  lastName: 'Perez',
  avatarUrl: 'https://user-images.githubusercontent.com/52685250/112709876-3f515980-8f00-11eb-958b-cc29493eb884.png',
};

function formatName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

const avatarUrlStyle = {
  width: '200px',
  height: '200px',
  padding: '10px',
  border: '1px solid silver',
};

const element = (
  <div>
    <img src={user.avatarUrl} style={avatarUrlStyle} />
    {getGreeting(user)}
  </div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
);