import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";  
import { useEffect, useState } from "react";

export default function DataTable() {

  const [tableData, setTableData] = useState([]);
  useEffect(async () => {
    await axios.get("http://localhost:5000/operateur/overview").then((res) => {
      setTableData(res.data);
    });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 201 },
    { field: 'name', headerName: 'name', width: 200 },
    { field: 'password', headerName: 'password', width: 130 },
    { field: 'email',headerName: 'email',width: 200,},
    { field: 'tel' , headerName: 'tel' , width:150},
  ];
  
  return (
    <div style={{ height: 400, width: '60%',marginLeft:250 }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
