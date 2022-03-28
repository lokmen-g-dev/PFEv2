import "./widget.scss";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import RouterIcon from '@mui/icons-material/Router';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
 

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
        isMoney: false,
        
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
          {data.isMoney && "$"} {amount}
          

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
