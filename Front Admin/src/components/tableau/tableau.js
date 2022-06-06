import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddButton from "./Put";
import { Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function DataTable() {
  const [tableData, setTableData] = useState([]);
  useEffect(async () => {
    await axios.get("http://localhost:5000/operateur/overview").then((res) => {
      setTableData(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/operateur/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "tel", headerName: "Tel", width: 140 },
    {
      field: "actionss",
      headerName: "Modifier",
      type: "actions",
      width: 100,

      renderCell: (params) => {
        const id = params.getValue(params.id, "id");
        return (
          <Button
            onClick={() => {}}
            style={{ width: "100%", height: "100%", color: "orange" }}
          >
            <AddButton id={id} />
          </Button>
        );

        // <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      },
    },
    {
      field: "actions",
      headerName: "Supprimer",
      type: "actions",
      width: 100,

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
            style={{ width: "100%", height: "100%", color: "red" }}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
        );

        // <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      },
    },
    
  ];

  return (
    <ThemeProvider theme={theme}>
    <div
      style={{
        backgroundColor: "transparent",
        height: 450,
        marginTop: 50,
         width:"100%"
      }}
    >
      <DataGrid
      sx={{
        boxShadow: 2,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
        width:"100%"
      }}
      
        rows={tableData}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[5]}
      />
    </div>
    
    </ThemeProvider>
  );
}
