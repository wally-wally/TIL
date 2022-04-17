const initialState = {
  isLoggingIn: false,
  data: null,
}

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...prevState,
        data: action.data,
      };
    case 'LOG_OUT':
      return {
        ...prevState,
        data: null,
      };
    default:
      return prevState;
  }
};

module.exports = userReducer;