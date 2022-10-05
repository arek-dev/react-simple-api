import { useState } from "react";

const TableHead = ({ columns, handleSorting }) => {
 const [sortField, setSortField] = useState("Name");
 const [order, setOrder] = useState("asc");
 const handleSortingChange = (accessor) => {
    const sortOrder =
     accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
   };

 
 return (
    <thead>
    <tr>
     {columns.map(({ label, accessor }) => {
      return (
       <th key={accessor} onClick={() => handleSortingChange(accessor)} className="head">
        {label} {accessor === sortField ? ( order==='asc' ? '▲' : '▼' ) : null } 
       </th>
      );
     })}
    </tr>
   </thead>
 );
};

export default TableHead;