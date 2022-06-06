import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";
import EmailIcon from "@mui/icons-material/Email";
import AddButton from "./Repance";
import { useNavigate } from "react-router-dom";


import { useEffect, useState } from "react";
import { MailOutlined } from "@mui/icons-material";
import { render } from "react-dom";

const handleDelete = (id) => {
  axios
    .delete(`http://localhost:5000/Alert/delete/${id}`)
    .then((res) => {
      console.log(res.data);
      window.location.reload(true);
    })
    .catch((err) => {
      console.log(err);
    });
};

const columns = [
  {
    field: "Objet",
    headerName: "Objet",
    width: 190,
  },
  {
    field: "description",
    headerName: "description",
    width: 190,
  },
  {
    field: "email",
    headerName: "Email ",
    width: 190,
  },

  {
    field: "Détail",
    headerName: "Détail",

    type: "actions",

    width: 210,

    renderCell: (params) => {
      
      const onClick = () => {
        const id = params.getValue(params.id, "id");
        console.log(id)
        localStorage.setItem("id",id)
      
      };
      return (
        <Button
          onClick={() => {
            onClick() 
          }}
          style={{ width: "90%", height: "90%", color: "#76abec" }}
        >

        <AddButton/>
        </Button>
      );
    },
  },

  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    width: 190,

    renderCell: (params) => {
      const onClick = () => {
        const id = params.getValue(params.id, "id");
        handleDelete(id);
      };
      return (
        <Button
          onClick={() => {
            onClick();
          }}
          style={{ width: "90%", height: "90%", color: "#76abec" }}
        >
          <DeleteIcon style={{ marginRight: "5%" }}></DeleteIcon>
        </Button>
      );
    },
  },
];

function Alert() {
  const [tableData, setTableData] = useState([]);
  const Navigate = useNavigate();

  useEffect(async () => {
    const token = localStorage.getItem("access_token");
    await axios
      .get("http://localhost:5000/alert/getalerts", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setTableData(res.data);
        console.log(tableData);
        Navigate("/alert", {
          state: res.data.length,
        });
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
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
export default Alert;
