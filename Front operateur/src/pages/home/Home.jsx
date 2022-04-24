import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Wid from "../../components/widget/Widget copy";
import { useState,useEffect } from "react";
import axios from "axios";
import Widgt from "../../components/widget/Widget copy";

const Home = () => {
const params = useParams()
  console.log(params)
  //nb alert
 const [datale,setDataLe]=useState()
  

    //nb userss
    
    const [datalen,setDataLen]=useState()
    useEffect(async () => {
      axios.get("http://localhost:5000/alert/send").then((res) => {
     
        setDataLe(res.data.length)
        console.log(res.data.length)
       
      })
      const token= await localStorage.getItem("access_token")
      console.log(token)
      axios.get("http://localhost:5000/Client/list", { headers: {"Authorization" : `${token}`} } ).then((res) => {
     
       setDataLen(res.data.length)
        console.log(res.data.length)
       
      });
     
    }, [])
  

    
  

  console.log(datalen)
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className="widgets" > 
        <Widget title="users" len={datalen} />
        <Widget title="Reclamation" len={datale} />

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
