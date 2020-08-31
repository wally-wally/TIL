import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => (
        <Tr rowIndex={i} rowData={tableData[i]} dispatch={dispatch} key={i} />
      ))}
    </table>
  );
};

export default Table;