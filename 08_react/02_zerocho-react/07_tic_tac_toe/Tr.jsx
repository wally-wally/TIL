import React, { useRef, useEffect, memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
  console.log('tr rendered');

  // 성능 최적화 방법
  const ref = useRef([]);
  useEffect(() => {
    // 이 중 false가 나오면 그 값 때문에 re-rendering 되는 것을 알 수 있다.
    console.log(rowData === ref.current[0], dispatch === ref.current[1], rowIndex === ref.current[2])
    ref.current = [rowData, dispatch, rowIndex]
  }, [rowData, dispatch, rowIndex]);


  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        <Td rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch} key={i}>{''}</Td>
        // 만약 React.memo를 했는데도 최적화가 안되면 useMemo로 해결할 수 있다.(최후의 수단)
        // useMemo로 컴포넌트 자체를 기억할 수 있다.
        // 두 번째 인자로 언제 컴포넌트를 갱신할 지 결정할 수 있다.(칸의 내용물이 바뀌었을 때만 새로 rendering 하게 설정함)
        // useMemo(
        //   () => <Td rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch} key={i}>{''}</Td>,
        //   [rowData[i]],
        // )
      ))}
    </tr>
  );
});

export default Tr;