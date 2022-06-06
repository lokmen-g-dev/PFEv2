import * as React from "react";
import DataTable from "../components/tableau/tableau";
import AppHeader from "../components/appbar";
import AddButton from "../components/addoperateur";
import { Grid } from "@material-ui/core";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
const theme = createTheme();
export default function Overview() {
  return (<div>
              <AppHeader />
    <ThemeProvider theme={theme}>
      <Container fluid>
        <Grid md="12">
          <Card
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "10px",
            }}
          >
            
              <div>
                <AddButton />
              </div>

              <DataTable />
            
          </Card>
        </Grid>
      </Container>
    </ThemeProvider>
    </div>
  );
}
