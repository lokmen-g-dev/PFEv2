//import Sidebar from "Dash/src/components/sidebar/Sidebar";
import Sidebar from "./Sidebar";
//import Navbar from "Dash/src/components/navbar/Navbar";
import NavBar from "./NavBar";
import "./home.scss";
//import Widget from "Dash/src/components/widget/Widget";
import Widget from "./Widget";
//import Featured from "../../components/featured/Featured";
import Featured from "./Featured";
import List from "./Table";
//import Featured from "Dash/src/components/featured/Featured";
import Chart from "./Chart";
//import Chart from "Dash/src/components/chart/Chart";
//import Table from "Dash/src/components/table/Table";


const Home = () => {//
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="Connecter" />
          <Widget type="earning" />
          
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>

      </div>
    </div>
  );
};

export default Home;
