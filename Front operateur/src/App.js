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
import Repance from "./components/Update/Repoance";
import Not from "./pages/natification/not";
import Code from "./pages/login/Code";
import News from "./pages/login/New";
import Att from "./pages/user/Attent";
import PrivateRoute from "./pages/home/privateroute/privateroute";
import Oublier from "./pages/login/oublier";
import Accepte from "./pages/user/accepte";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Login  />} />
        <Route path="/new" element={<News />} />

            <Route path="/forgot" element={<Forgot />} />

            <Route path="/code" element={<Code />} />
        <Route element={<PrivateRoute/>}>
         <Route path="/home" exact element={<Home />} />
         <Route path="/attent" element={<Att/>}/>
         <Route path="/users" element={<Accepte/>}/>

          <Route path="Update" element={<Mise />}/>
            <Route path="Repance" element={<Repance/>}/>
            <Route path="Alert" element={<Not />}/>
              <Route path="users">
              <Route index element={<List />} />


        </Route>      

          <Route  path="/">
           
            

            <Route path="/login" element={<Login />} />
         


              
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
