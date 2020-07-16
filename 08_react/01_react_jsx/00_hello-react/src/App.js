import React from 'react';
import './App.css';
import Counter from './Counter';
import Say from './Say';
import EventPractice from './EventPractice';
import EventPractice2 from './EventPractice2';
import EventPractice3 from './EventPractice3';

const App = () => {
  return (
    <div>
      <div class="chapter">3장</div>
      <Counter />
      <hr />
      <Say />
      <hr />
      <div class="chapter">4장</div>
      <EventPractice />
      <EventPractice2 />
      <EventPractice3 />
    </div>
  );
};

export default App;