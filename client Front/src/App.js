import { useEffect } from "react";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Material Kit 2 React themes
import theme from "assets/theme";
import Acceuil from "layouts/pages/Acceuil";
// Material Kit 2 React routes
import routes from "routes";
/// import interface 

import Home from "./Dashbord/Home";
import Login from "./Dashbord/Login";
import List from "./Dashbord/List"
//import Single from "./pages/single/Single";
import Single from "./Dashbord/Single";
//import New from "./pages/new/New";
import New from "./Dashbord/New";
import { productInputs, userInputs } from "./formSource";
import Mise from "Dashbord/Update/Mise";
export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route exact path="/Acceuil" element={<Acceuil />} />
          <Route path="/Acceuil" element={<Acceuil />} />     
            <Route path="/Home" element={<Home />} />
            <Route path="Update" element={<Mise />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
             <Route path="*" element={<Navigate to="/Acceuil" />} /> 
            </Route>
         
           
      </Routes>
    </ThemeProvider>
  );
}
