import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ErrorIcon from '@mui/icons-material/Error';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import { Link } from "react-router-dom";
import PolicyIcon from '@mui/icons-material/Policy';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


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
            <Link to="/home" style={{ textDecoration: "nano" }}>
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <ManageAccountsIcon className="icon" />
              <span>FortiManager</span>
            </li>
          </Link>

          <Link to="/listefg" style={{ textDecoration: "none" }}>
            <li>
              <BorderOuterIcon className="icon" />
              <span>FortiGate</span>
            </li>
          </Link>
         
          <p className="title">USEFUL</p>
          <Link to="/Add" style={{ textDecoration: "nano" }}>
            
          <li>
            < LocalPostOfficeIcon className="icon" />
            <span>Message</span>
          </li>
          </Link>
          <Link to="/set" style={{ textDecoration: "nano" }}>

          <li>
            < ErrorIcon className="icon" />
            <span>Reclamation</span>
          </li>
          </Link>

          <p className="title">Configuration</p>
         
          
          <Link to="/Policy" style={{ textDecoration: "none" }}> 
          <li>
            <PolicyIcon className="icon" />
            <span>Policy</span>
          </li>
          </Link>
          <li>
            <AcUnitIcon className="icon" />
            <span>SD-WAN</span>
          </li>
          <p className="title">USER</p>
          <Link to="/info" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <Link to="/log" style={{ textDecoration: "nano" }}>
          <li>
            <DocumentScannerIcon className="icon" />
            <span>Log File</span>
          </li>
          </Link>
        
          
          <Link to="/" style={{ textDecoration: "nano" }}>
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
