import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
  


const Home = () => {
  const { state } = useLocation();
  console.log(state)
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className="widgets" > 
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart title="Nombre de client en 6 derniers mois" aspect={2 / 1} />
      </div>
      <div className="listContainer">

      </div>
    </div>
  </div>
  
  );
};

export default Home;
