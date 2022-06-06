import Sidebar from "Dashbord/Sidebar";
import NavBar from "Dashbord/NavBar";
import Datasdwa from "./sdwandata";
const Sdwan = () => {

        

  
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <NavBar/>
        <Datasdwa />
       

  
      </div>
    </div>
  )
}

export default Sdwan