import React, { Component } from 'react';

import './App.css';
// import Palette from './components/Palette';
// import Counter from './components/Counter';
// import WaitingList from './components/WaitingList';
// (3-2) PaletteContainer 컴포넌트 불러오기
import PaletteContainer from './containers/PaletteContainer';
// (4-2) CounterContainer 컴포넌트 불러오기
import CounterContainer from './containers/CounterContainer';
// (6-2) WaitingListContainer 컴포넌트 불러오기
import WaitingListContainer from './containers/WaitingListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* before */}
        {/* <Palette selected="red" /> */}
        {/* after */}
        <PaletteContainer />
        {/* before */}
        {/* <Counter value={0} color="red" /> */}
        {/* after */}
        <CounterContainer />
        {/* before */}
        {/* <WaitingList /> */}
        {/* after */}
        <WaitingListContainer />
      </div>
    );
  }
}

export default App;
