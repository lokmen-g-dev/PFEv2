import "./widget.scss";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import RouterIcon from '@mui/icons-material/Router';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const Widget = ({ type }) => {
  let data;
  let dataa;






  const Navigate=useNavigate();

  useEffect(async () => {
    await axios.get("http://localhost:5000/Client/list").then((res) => {
     
     Navigate("/home",{
        state:res.data.length
      })
     
    });
  }, []);
  //temporary
  
  const { state } = useLocation();


  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Nomber totale de fortiGate",
       
        icon: (
          <RouterIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Nomber totale de fortiManager",
        isMoney: false,
        
        icon: (
          <RouterIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "Nombre des déclaration de client",
        
        
        icon: (
          <GppMaybeIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data && ""} {state}
          

        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
         
          
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
