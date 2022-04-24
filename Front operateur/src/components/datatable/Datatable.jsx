

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from "@material-ui/core";

import { useNavigate } from 'react-router-dom';
const handleDelete=(id)=>{
  axios.delete(`http://localhost:5000/ajouter/user/${id}`, ).then((res) => {
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
    field: 'email',
    headerName: 'Email',
    width: 190,
    
  },
  {
    field: 'tel',
    headerName: 'Tel ',
    width: 190,

  },
  {
    field: 'password',
    headerName: 'Mot de passe',
    width: 210,
   
  
  },
  {
    field: 'Etat',
    headerName: 'Etat',
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
        <Button onClick={()=>{onClick()}} style={{ width: "90%", height: "90%", color: "#76abec" }}>
           < DoDisturbIcon style={{ marginRight:"5%"}}></ DoDisturbIcon>        
        </Button>
       )  
      }
      
      

      
  },
 
];



export default function Datatable() {

  const [tableData, setTableData] = useState([]);
  const Navigate=useNavigate();

  useEffect(async () => { 
    const token= await localStorage.getItem("access_token")
    console.log(token)
    await axios.get("http://localhost:5000/Client/list", { headers: {"Authorization" : `${token}`} } ).then((res) => {
      setTableData(res.data);
       
       console.log(res.data)
      
     Navigate("/users",{
        state:res.data.length
      })
     
    });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}




