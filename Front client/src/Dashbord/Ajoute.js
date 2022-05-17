import React, { useState , useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { makeStyles } from "@material-ui/core/styles";
import "./Fortigate.css"


import TextField from '@mui/material/TextField';
import axios from "axios";

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1300,
  height:800 ,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddButto() {
    const [formData, setFormData] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log("submitted");
        axios
          .post("http://localhost:5000/ajouter/Add", formData)
          .then((res) => {
            console.log(res.data)
            window.location.reload(true);
        
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function Changer() {
    document.getElementById('demo1')
    console.log("11")
  }
  return (
    <div>
      <Button  variant="contained" onClick={handleOpen}>Configurer </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{borderRadius:'10px',Color:'read', height:'500px'}} sx={style}>
        <div className={classes.paper}>
      
      <div id="id">
   
        <ol >
        <li onClick={Changer} > Static</li>
        <li>Policy</li>
        <li>SDWAN</li>
<center>
</center>


        </ol>
<h1 id="demo1"  style={{ width: "100%", height: "100%", color: "#76abec" }}>hhhhhhhhhhhhh</h1>

      </div>
      </div>
        </Box>
      </Modal>
    </div>
  );
}
