import React, { useCallback, useRef, useEffect, memo } from 'react';
import { CLICK_CELL } from './TicTacToc';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  console.log('td rendered');

  // 성능 최적화 방법
  const ref = useRef([]);
  useEffect(() => {
    // 이 중 false가 나오면 그 값 때문에 re-rendering 되는 것을 알 수 있다.
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3])
    console.log(cellData, ref.current[3]);
    ref.current = [rowIndex, cellIndex, dispatch, cellData]
  }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸을 클릭한 후에
  }, [cellData]);

  return (
    <td onClick={onClickTd} >{cellData}</td>
  );
});

export default Td;