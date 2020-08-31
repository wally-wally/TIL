import React, { useContext, memo } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {/* tableData[0]가 undefined일 수 있기 때문에 && 연산자로 보호해줌 */}
      {tableData[0] && Array(tableData[0].length).fill().map((td, i) =>
        <Td rowIndex={rowIndex} cellIndex={i} />
      )}
    </tr>
  );
});

export default Tr;