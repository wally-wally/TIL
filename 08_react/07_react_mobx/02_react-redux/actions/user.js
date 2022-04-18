// ------[async action creator]------
const logIn = (data) => {
  // thunk가 비동기 처리 작업을 해주기로 했으므로 function 형태로 return해준다.
  return (dispatch, getState) => {
    // 로그인 시도
    dispatch(logInRequest(data));
    try {
      // 2초 뒤에 성공
      setTimeout(() => {
        dispatch(logInSuccess({
          userId: 1,
          nickname: 'wallywally',
        }));
      }, 2000);
    } catch (error) {
      dispatch(loginInFailure(error));
    }
  }
};

// ------[sync action creator]------
const logInRequest = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  }
};

const logInSuccess = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  }
};

const loginInFailure = (error) => {
  return {
    type: 'LOG_IN_FAILURE',
    error,
  }
}

// ------[sync action creator]------
// const logIn = (data) => {
//   return {
//     type: 'LOG_IN',
//     data,
//   }
// };

const logOut = () => {
  return {
    type: 'LOG_OUT',
  }
};

module.exports = {
  logIn,
  logOut,
};