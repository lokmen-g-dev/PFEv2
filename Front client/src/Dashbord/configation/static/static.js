import Sidebar from "Dashbord/Sidebar";
import NavBar from "Dashbord/NavBar";
import Datasdwa from "./staticdata";
import DataStatic from "./staticdata";
const Staticc = () => {

        

  
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <NavBar/>
        <DataStatic />
       

  
      </div>
    </div>
  )
}

export default Staticc