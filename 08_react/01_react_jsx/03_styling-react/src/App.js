import React, { Component } from 'react';
import SassComponent from './SassComponent';
import CSSModule from './CSSModule';
import StyledComponent from './StyledComponent';

class App extends Component {
  render() {
    return (
      <div>
        <SassComponent />
        <hr />
        <CSSModule />
        <hr />
        <StyledComponent />
      </div>
    );
  }
}

export default App;