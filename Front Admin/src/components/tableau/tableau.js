import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";  
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddButton from './Put';
import { Button } from "@material-ui/core";

export default function DataTable() {

  const [tableData, setTableData] = useState([]);
  useEffect(async () => {
    await axios.get("http://localhost:5000/operateur/overview").then((res) => {
      setTableData(res.data);
    });
  }, []);

  const handleDelete=(id)=>{
    axios.delete(`http://localhost:5000/operateur/delete/${id}`, ).then((res) => {
      console.log(res.data)
      window.location.reload(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'password', headerName: 'Password', width: 110 },
    { field: 'email',headerName: 'Email',width: 200,},
    { field: 'tel' , headerName: 'Tel' , width:140},
  
    {
      field: 'actions',
      headerName: 'Actions' ,
      type: 'actions',
      width: 100,
     

      renderCell: (params) => {
        const onClick = () => {
          const id = params.getValue(params.id, "id");
          handleDelete(id);
        }
        return (
          <Button onClick={()=>{onClick()}} style={{ width: "100%", height: "100%", color: "#76abec" }}>
             <DeleteIcon  ></DeleteIcon>
             
          </Button>
   
         )
        
       // <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
    
        }
        

        
    },
    {
      field: 'actionss',
      headerName: 'Actions' ,
      type: 'actions',
      width: 100,
     

      renderCell: (params) => {
        const id = params.getValue(params.id, "id");
        return (
          <Button onClick={()=>{}} style={{ width: "100%", height: "100%", color: "#76abec" }}>
             <AddButton id={id} / >
             
          </Button>
   
         )
        
       // <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
    
        }
        

        
    },
  
    
    
    
    
  ];
  
 
  
  return (
    
    <div style={{ backgroundColor:"transparent",border:'0px', borderRadius:'10px', height: 450, width: '60%',marginLeft:300 ,marginTop:70,}}>
     
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[5]}
        checkboxSelection
        
      />
      
    </div>
  );
}
