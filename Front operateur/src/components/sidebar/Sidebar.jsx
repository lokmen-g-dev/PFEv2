import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";


import { io } from "socket.io-client";

const Sidebar = () => {
  const socket = io.connect("http://localhost:5000");

  const [operateur, Setoperateur] = useState([]);
  const [notifNumber, setNotifNumber] = useState(null);

  useEffect(() => {
    socket.on("recieve_msg", (data) => {
      setNotifNumber(notifNumber + 1);
      console.log(data);
      console.log(data.message)
    });
  }, [notifNumber]);

  const handleNotifMenu = () => {
    setNotifNumber(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    axios
      .get(`http://localhost:5000/operateur/get`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        Setoperateur(res.data);
      });
    console.log(operateur);
  }, []);

  const Navigate = useNavigate();
  const logout = () => {
    Navigate("/");
    localStorage.clear();
  };
  return (
    <div
      className="sidebar"
      style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      <div className="top">
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
            <li
              onClick={() => {
                handleNotifMenu();
              }}
             >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                className="icon"
              >
                
                <Badge badgeContent={notifNumber} color="secondary">
                <NotificationsNoneOutlinedIcon />  
                </Badge>
               
              </IconButton>
              <span>Recalamations</span>
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
            <ExitToAppIcon className="icon" />
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
