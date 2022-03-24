import React from 'react'
import {Route,Routes} from "react-router-dom"
import SignIn from './components/login/login';
import PrivateRoute from './components/privateroute/privateroute';
import Overview from './pages/overview';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route element={<PrivateRoute/>}>
            <Route exact path='/overview' element={<Overview />}/>
        </Route>      
      </Routes>
    </div>
 
      
  

  );
}

export default App;
