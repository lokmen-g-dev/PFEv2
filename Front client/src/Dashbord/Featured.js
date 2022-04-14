import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total de jour connecter</p>
        <p className="amount">420</p>
        <p className="desc">
          
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Aujourd'hui</div>
            <div className="itemResult positive">
             
              <div className="resultAmount">2H</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
          
              <div className="resultAmount">25H</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              
              <div className="resultAmount">12.4H</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
