import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from "react";

const handleg=(id)=>{
  axios.get(`http://localhost:5000/alert/get/${id}`, ).then((res) => {
    console.log(res.data)
    window.location.reload(true);
  })
  .catch((err) => {
    console.log(err);
  });
}



const handleDelete=(id)=>{
  axios.delete(`http://localhost:5000/Alert/delete/${id}`, ).then((res) => {
    console.log(res.data)
    window.location.reload(true);
  })
  .catch((err) => {
    console.log(err);
  });
}



const columns = [
  
  {

    
    
    field: 'Objet',
    headerName: 'Objet',
    width: 190,
    
   
  },
  {
    field: 'discription',
    headerName: 'discription',
    width: 190,
    
  },
  {
    field: 'email',
    headerName: 'Email ',
    width: 190,

  },

  {
    field: 'Détail',
    headerName: 'Détail',

    type: 'actions',

    width: 210,
    
    
    renderCell: (params) => {
      const onClick = () => {
        const id = params.getValue(params.id, "id");
        handleg(id);
      }
      return (    
        <Link to="/Repance">
        <Button onClick={()=>{onClick()}} style={{ width: "90%", height: "90%", color: "#76abec" }}>
           < EmailIcon style={{ marginRight:"5%"}}></ EmailIcon>        
        </Button>
        </Link>
       )  
      }
      
   
  
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
           < DeleteIcon style={{ marginRight:"5%"}}></ DeleteIcon>        
        </Button>
       )  
      }
      
      

      
  },
 
];



function Alert() {


  const [tableData, setTableData] = useState([]);
  const Navigate=useNavigate();
  




useEffect(async () => {
    await axios.get("http://localhost:5000/alert/send").then((res) => {
      setTableData(res.data);
       
       console.log(res.data)
   
 
     Navigate("/alert",{
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
export default Alert



