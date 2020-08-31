import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  console.log('getTdText');
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X'; // 디버깅을 위해 'X'를 표시해둠
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || ''; // 주변 지뢰 개수가 0인 경우 빈 값으로
  }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  // useContext를 사용하면 어쩔 수 없이 전체가 한 번 rendering 되는 단점이 있다.
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return ;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);
  
  const onRightClickTd = useCallback((e) => {
    e.preventDefault();
    if (halted) {
      return ;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  console.log('td rendered');

  // useMemo를 사용하면 실제로 DOM에 그려지는 부분(re-rendering)은 딱 한 번만 수행된다.
  // return useMemo(() => (
  //   <td
  //     style={getTdStyle(tableData[rowIndex][cellIndex])}
  //     onClick={onClickTd}
  //     onContextMenu={onRightClickTd}
  //   >{getTdText(tableData[rowIndex][cellIndex])}</td>
  // ), [tableData[rowIndex][cellIndex]]);

  // 또는 컴포넌트 부분을 별도의 함수로 구성해서 가능
  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
});

const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
  console.log('real td rendered'); // 함수는 여러 번 호출되도 실제 컴포넌트는 한 번만 렌더링 된다.

  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
});

export default Td;