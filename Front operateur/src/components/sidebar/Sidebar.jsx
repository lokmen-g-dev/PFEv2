import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState , useEffect } from "react";


const Sidebar = () => {


  const [operateur, Setoperateur] = useState([]);

  useEffect(() => {
    const token=   localStorage.getItem("access_token")
           console.log(token)
    axios.get(`http://localhost:5000/operateur/get`,{ headers: {"Authorization" : `${token}`} }).then((res) => {
      Setoperateur(res.data);
    });
    console.log(operateur);
  }, []);


  const Navigate=useNavigate();
const logout =()=>{
  Navigate("/");
  localStorage.clear()}
  return (
    <div className="sidebar" style={{ backgroundSize: 'cover',backgroundImage: 'url(https://i.pinimg.com/236x/08/5b/e0/085be041c1e433b67beda536fbb84a80.jpg)',  backgroundRepeat:'no-repeat',}}>
            
      <div className="top" >
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Admin {operateur.name} </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/attent" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>pending users</span>
            </li>
          </Link>
       
          <p className="title">USEFUL</p>
        
          <Link to="/alert" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/update" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
         
          <li>
            <ExitToAppIcon className="icon"  />
            <span onClick={logout}>Logout</span>
          </li>
          
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
