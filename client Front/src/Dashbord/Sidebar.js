import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
//import { DarkModeContext } from "../../context/darkModeContext";
function  Sidebar(){
  return (
    <div className="sidebar">
      <div className="top">
    
          <span className="logo">Client</span>
        
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <Link to="/Home" style={{ textDecoration: "nano" }}>
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
         
          <p className="title">USEFUL</p>
          <Link to="/Home" style={{ textDecoration: "nano" }}>
          <li>
            <InsertChartIcon className="icon" />
           
            <span>Add</span>
          </li>
          </Link>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">Configuration</p>
         
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>SD-WAN</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>MPLS</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Static</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>IPsec</span>
          </li>
          <p className="title">USER</p>
          <Link to="/Update" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
         
          <Link to="/Acceuil" style={{ textDecoration: "nano" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
      </div>
    </div>
  );
};

export default Sidebar;
