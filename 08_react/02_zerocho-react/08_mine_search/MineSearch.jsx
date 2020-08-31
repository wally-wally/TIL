import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Form from './Form';
import Table from './Table';

// 칸에 어떻게 보일지 정리함
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
}

// createContext 첫 번째 인자는 초기값 설정
export const TableContext = createContext({
  // 모양만 맞춰줬다.
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0, // 지금까지 오픈한 칸의 개수
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      let openedCount = 0;
      const checkAround = (row, cell) => {
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) { // 상하좌우 지뢰찾기 게임판 범위를 벗어난 경우 필터링
          return;
        }
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) { // 닫힌 칸만 열기
          return;
        }
        if (checked.includes(`${row},${cell}`)) { // 이미 검사한 칸인 경우 
          return;
        } else { // 새로 검사하는 칸이면 checked Array에 추가(콜스택 터지는 것을 방지)
          checked.push(`${row},${cell}`);
        }
        // 내 칸 기준으로 주변 지뢰 개수 및 인접한 빈 칸 영역 한 번에 보이게 하기
        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          );
        }
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          );
        }
        // 위 코드에서 좌우 방향으로 지뢰찾기 게임판을 벗어났는지 if문으로 특별히 검사하지 않은 이유
        // tableData[row] 자체에서 undefined가 나면 [cell - 1]와 같이 접근하려고 하면 Cannot Property 에러가 뜬다.
        // 하지만 tableData[row]는 탐색이 되지만 [cell - 1]와 같이 접근할 때 없는 경우 undefined가 나온다.
        // undefined를 push해도 아래 구문해서 filter를 이용해서 undefined는 걸러주기 때문에 별도로 if문으로 좌우 방향을 검사하지 않았다.
        const count = around.filter(function (v) { // 주변의 지뢰 개수 파악
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;
        console.log(around, count);
        if (count === 0) { // 주변에 지뢰 개수가 하나도 없을 때 재귀로 빈 칸 연달아 열기
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            })
          }
        }
        if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount)
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리 조건
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true, // 지뢰 터지면 게임 멈추게 하는 변수
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  // Context API를 사용해서 자식으로 넘기는 데이터들은 useMemo로 반드시 캐싱해줘야 함
  // 랜더링 될 때마다 value 객체가 새로 생성되지 않도록 useMemo로 캐싱을 해줘야 한다. => Context API에서 성능 최적화
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]); // dispatch는 값이 어차피 바뀌지 않으므로 두 번째 인자에 넣을 필요 X

  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    }
  }, [halted]);

  return (
    // Provider로 묶어줘야 그 안에 있는 컴포넌트들이 Context API에 접근할 수 있다.
    // 그러면 value에 작성한 데이터들을 자식 컴포넌트에서 접근할 수 있다.
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;