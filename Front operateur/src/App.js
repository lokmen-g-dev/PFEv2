import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Mise from "./components/Update/Mise";  
import Forgot from "./pages/login/Forgot";
import Alert from "./components/Update/Alert";
import Not from "./pages/natification/not";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        
          <Route path="/">
           
            
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="Update" element={<Mise />}/>
            <Route path="Alert" element={<Not />}/>
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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
