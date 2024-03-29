import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@material-ui/core/styles";



import TextField from "@mui/material/TextField";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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

export default function AddButton() {
  const [formData, setFormData] = useState([]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submitted");
    const token = localStorage.getItem("access_token");
    axios
      .post("http://localhost:5000/alert/Add",formData,{ headers: { Authorization: token }})
      .then((res) => {
       
        console.log(res.data);
        console.log("ahahahahahahah");

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

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Envoyer{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            borderRadius: "10px",
            borderColor: "white",
            height: "500px",
          }}
          sx={style}
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Envoyer reclamation
            </Typography>
            <form className={classes.form} onChange={handleChange}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Object"
                name="Objet"
                autoFocus
              />
              <TextField
                id="filled-multiline-static"
                label="Description"
                multiline
                name="description"
                variant="outlined"
                rows={8}
                required
                fullWidth
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e)=>{handleSubmit(e)}}
              >
                Envoyer reclamation
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
