import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import './login.css'
import { useNavigate } from "react-router-dom";
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

export default function SignIn() {
  const [admin, setadmin] = useState("");
const [error,seterror]= useState("")
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setadmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submitted");
    axios
      .post("http://localhost:5000/admin/login", admin)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          console.log(res.data);
          console.log(res.data.token);
        if (localStorage.getItem("access_token")) {
          Navigate("/overview");
        }

        //  window.location.href = "/overview";
      })
      .catch((err) => {
      seterror(err)
      });

  };
  console.log(error);


  const classes = useStyles();

  return (

    <Container style={{backgroundColor:"transparent", borderRadius:'10px',marginTop:'100px',padding:"0px 20px 20px 20px"}} component="main" maxWidth="xs">
      <CssBaseline />
      <div id="center">
        <div className={classes.paper} >
          <div id="padd">
            <form className={classes.form}  onChange={handleChange}>
              
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
           
            id="email"
            label="Email "
            name="email"
            autoComplete="email"
            autoFocus
           />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            />

           <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
           >
            S'identifier
           </Button>
           </form>
        
           </div>
        </div>  
      </div> 
      
    </Container>
  );
}