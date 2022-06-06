import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@material-ui/core";



const handleDelete=(id)=>{
  axios.delete(`http://localhost:5000/Ajouter/delete/${id}`, ).then((res) => {
    console.log(res.data)
    window.location.reload(true);
  })
  .catch((err) => {
    console.log(err);
  });
}


const columns = [
  {
    field: 'name',
    headerName: 'Nom',
    width: 190,
   
  },
  {
    field: 'ip',
    headerName: 'IP address',
    width: 190,
    
  },
  {
    field: 'user',
    headerName: 'Nom utilisateur ',
    width: 190,

  },
  {
    field: 'password',
    headerName: 'Mot de passe',
    width: 210,
   
  
  },

  {
    field: 'actions',
    headerName: 'Actions' ,
    type: 'actions',
    width: 190,
    
   

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

];



export default function DataGridDemo() {

  const [tableData, setTableData] = useState([]);
  useEffect(async () => {
    await axios.get("http://localhost:5000/ajouter/user").then((res) => {
      setTableData(res.data);
    });
  }, []);
 

  return (
    <div style={{ marginTop:'5%', height: 400, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        
        disableSelectionOnClick
      />
    </div>
  );
}