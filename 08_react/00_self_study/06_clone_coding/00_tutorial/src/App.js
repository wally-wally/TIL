import React from 'react';
import PropTypes from 'prop-types';

function Computer({ name, imgUrl, info, rating }) {
  return (
    <div>
      <h2>I like {name}</h2>
      <h4>{rating}/5.0</h4>
      <img src={imgUrl} alt={name} />
      <ul>
        <li>OS: {info.OS}</li>
        <li>Price: {info.price}[원]</li>
      </ul>
    </div>
  )
}

const computers = [
  {
    id: 1,
    name: 'Product1',
    imgUrl: 'https://user-images.githubusercontent.com/52685250/84468550-11c15980-acba-11ea-88f5-faafa1ca1906.jpg',
    info: {
      OS: 'Mac',
      price: 2500000
    },
    rating: 5
  },
  {
    id: 2,
    name: 'Product2',
    imgUrl: 'https://user-images.githubusercontent.com/52685250/84468555-1259f000-acba-11ea-9c49-127bc0e6e600.jpg',
    info: {
      OS: 'Mac',
      price: 2000000
    },
    rating: 4.9
  }
];


function App() {
  return (
    <div>
      <h1>Computer Models</h1>
      {computers.map(computer => (
        <Computer name={computer.name} imgUrl={computer.imgUrl} info={computer.info} key={computer.id} rating={computer.rating} />
      ))}
    </div>
  );
}

Computer.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  rating: PropTypes.number // isRequired가 없는 경우 필수 요소는 아니지만 nubmer 자료형인지는 검사한다.
}

export default App;
