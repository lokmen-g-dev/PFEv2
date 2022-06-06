import Sidebar from "Dashbord/Sidebar";
import NavBar from "Dashbord/NavBar";
import Datainterface_01 from "./policydata";
const DataPolicy = () => {

        

  
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <NavBar/>
        <Datainterface_01 />
       

  
      </div>
    </div>
  )
}

export default DataPolicy