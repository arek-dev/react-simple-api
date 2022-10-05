import React from 'react';

const TableBody = ({ tableData, columns }) => {
    return (
     <tbody>
      {tableData.map((data) => {
       return (
        <tr key={data.Id}>
         {columns.map(({ accessor }) => {
          const tData = data[accessor];
          return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
   };

export default TableBody;