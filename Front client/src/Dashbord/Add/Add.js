import Sidebar from "Dashbord/Sidebar";
import NavBar from "Dashbord/NavBar";
import Updat from "./Updat";
const Add = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <NavBar/>
        <Updat />
      </div>
    </div>
  )
}

  export default Add