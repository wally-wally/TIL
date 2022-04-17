const initialState = [];

// state의 구조가 쪼개졌기 때문에 prevState에 기본값을 넘겨줘야 한다.
const postReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...prevState, action.data];
    default:
      return prevState;
  }
};

module.exports = postReducer;