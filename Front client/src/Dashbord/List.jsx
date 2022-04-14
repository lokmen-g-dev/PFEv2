import "./list.scss"
//import Sidebar from "Dash/src/components/sidebar/Sidebar"
//import Sidebar from "Dash/src/components/sidebar/Sidebar"
import Sidebar from "./Sidebar"
//import Navbar from "Dash/src/components/navbar/Navbar"
import NavBar from "./NavBar";
//import Datatable from "../../components/datatable/Datatable"
//import Datatable from "Dash/src/components/datatable/Datatable"
import Datatable from "./Datatable";
const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <NavBar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List