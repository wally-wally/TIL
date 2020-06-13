import React, { Component } from 'react';

class Detail extends Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push('/');
    }
  }
  
  render() {
    const { location } = this.props;
    if (location.state) {
      return (
        <div>
          {location.state.title}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Detail;