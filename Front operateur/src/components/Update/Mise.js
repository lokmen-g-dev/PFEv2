//import Sidebar from "Dash/src/components/sidebar/Sidebar"
//import Sidebar from "Dash/src/components/sidebar/Sidebar"
import Sidebar from "../sidebar/Sidebar";
//import Navbar from "Dash/src/components/navbar/Navbar"
import NavBar from "../navbar/Navbar";
//import Datatable from "../../components/datatable/Datatable"
//import Datatable from "Dash/src/components/datatable/Datatable"
import Updat from "./Updat";
const Mise = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <NavBar/>
        <Updat/>
      </div>
    </div>
  )
}

export default Mise