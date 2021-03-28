class LoginControl extends React.Component {
  state = {
    isLoggedIn: false,
  }

  handleLoginClick = () => {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick = () => {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {isLoggedIn
          ? <LogoutButton onClick={this.handleLogoutClick} />
          : <LoginButton onClick={this.handleLoginClick} />
        }
      </div>
    );
  }
}

function Greeting({ isLoggedIn }) {
  return (
    <h1>
      {isLoggedIn ? 'Welcome back!' : 'Please sign up.'}
    </h1>
  )
}

function LoginButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Login
    </button>
  );
}

function LogoutButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Logout
    </button>
  );
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
