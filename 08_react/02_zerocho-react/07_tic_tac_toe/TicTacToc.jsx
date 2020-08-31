import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  recentCell: [-1, -1],
};

// 액션 타입 변수(주로 대문자로 작성하고 단어 사이는 하이픈(_)으로 연결)
// 또한 export로 모듈 형태로 만들어야 다른 컴포넌트에서 사용할 수 있다.
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

// action을 해석해서 state를 바꿔주는 것을 reducer라고 한다.
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // 아래와 같이 직접 state를 바꾸면 안 된다.(바뀐 값만 바꿔야 한다.) => 불변성 유지
      // state.winner = action.winner;
      return {
        ...state, // spread operator로 얕은 복사를 한 후
        winner: action.winner, // 바뀔 부분만 작성해준다.
      }
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 문제 해결
      tableData[action.row][action.cell] = state.turn; // 클릭한 칸에 현재 turn 값 넣음
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        recentCell: [-1, -1],
      }
    }
    default:
      return state;
  }
};

const TicTacToc = () => {
  // state가 너무 많아지는 경우 useReducer를 고려해보도록 하자
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // 컴포넌트에 넣는 함수(이벤트)들은 useCallback으로!
  const onClickTable = useCallback(() => {
    // 이벤트 발생 => 액션 객체 생성 => dispatch => state 변경(어떻게 바꿀지는 reducer에 작성)
    // dispatch(액션 객체); => 액션 객체를 dispatch(실행)한다는 의미 => reducer 부분이 실행됨
    dispatch({ type: 'SET_WINNER', winner: 'O' });
  }, []);

  // 비동기인 state에서 무언가를 처리하려면 useEffect를 사용해야 한다.
  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로줄 검사
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로줄 검사
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 좌측 대각선 검사
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 우측 대각선 검사
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) { // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // 기본적으로 칸 들이 다 차있다고 가정(all이 true면 무승부라는 뜻)
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false; // 칸이 하나라도 빈 칸이 있으는 경우 false로(즉, 무승부가 아님)
          }
        })
      })
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        // dispatch가 state를 바꾸는 로직은 비동기이므로 작성 순서 유의!
        dispatch({ type: CHANGE_TURN }); // turn을 바꾼다.
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToc;