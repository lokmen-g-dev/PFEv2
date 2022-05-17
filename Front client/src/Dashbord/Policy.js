import "./list.scss"
//import Sidebar from "Dash/src/components/sidebar/Sidebar"
//import Sidebar from "Dash/src/components/sidebar/Sidebar"
import Sidebar from "./Sidebar"
//import Navbar from "Dash/src/components/navbar/Navbar"
import NavBar from "./NavBar";
//import Datatable from "../../components/datatable/Datatable"
//import Datatable from "Dash/src/components/datatable/Datatable"
import Datatable from "./Datatable_Policy";
import AddButto from "./Ajoute";
const Policy = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <NavBar/>
        <div style={{marginLeft:1200,marginTop:10, marginBottom:7, }} ><AddButto/></div>

        <Datatable/>
      </div>
    </div>
  )
}

export default Policy