import * as api from '../lib/api';
import { handleActions, createAction } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
// import { startLoading, finishLoading } from './loading';

// 액션 타입 선언
// 한 요청당 세 개 생성
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';


export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);


// function* getPostSaga(action) {
//   yield put(startLoading(GET_POST)); // 로딩 시작
//   // 파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있다.
//   try {
//     // API를 호출해야 하는 상황에서는 사가 내부에서 직접 호출하지 않고 call 함수를 사용한다.
//     // call을 사용하면 Promise로 반환하는 함수를 호출하고, 기다릴 수 있다.
//     // 첫 번째 파라미터는 호출하고 싶은 함수 함수, 나머지 파라미터는 해당 함수에 넣을 인수
//     const post = yield call(api.getPost, action.payload); // api.getPost(action.payload)를 의미
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data
//     });
//   } catch (error) {
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: error,
//       error: true
//     });
//   }
//   yield put(finishLoading(GET_POST)); // 로딩 완료
// }

// function* getUsersSaga() {
//   yield put(startLoading(GET_USERS));
//   try {
//     const users = yield call(api.getUsers);
//     yield put({
//       type: GET_USERS_SUCCESS,
//       payload: users.data
//     });
//   } catch (error) {
//     yield put({
//       type: GET_USERS_FAILURE,
//       payload: error,
//       error: true
//     });
//   }
//   yield put(finishLoading(GET_USERS));
// }

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}


// 초기 상태 선언
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리
const initialState = {
  post: null,
  users: null
};


// 리듀서 함수
const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload
    }),
  },
  initialState
);

export default sample;