import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Link to="/users"  style={{ textDecoration: "none" }}>
        <div className="widgets">
          <Widget type="user" />
        </div>
          </Link>
          
        </div>
      </div>
  
  );
};

export default Home;
