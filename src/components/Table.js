import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = (props) => {
    const { repos } = props; 
    const [tableData, setTableData] = useState(repos);
    const columns = [
     { label: "Name", accessor: "Name" },
     { label: "NIP", accessor: "NIP" },
     { label: "Amount", accessor: "Value" },
     { label: "Date", accessor: "Date" },
    ];

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
         const sorted = [...tableData].sort((a, b) => {
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "pl", {
            numeric: true,
           }) * (sortOrder === "asc" ? 1 : -1)
          );
         });
         setTableData(sorted);
        }
       };
          
    return (
     <>
      <table className="table">
       <TableHead columns={columns} handleSorting={handleSorting}/>
       <TableBody columns={columns} tableData={tableData} />
      </table>
     </>
    );
   };
   
export default Table;