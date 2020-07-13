import React from 'react';
import Greetings from './Greetings';

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log(`${name} says hello`);
  }
  return <Greetings name="Hello" onClick={onClick} />;
};

export default App;