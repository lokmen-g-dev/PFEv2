import Sidebar from "Dashbord/Sidebar";
import NavBar from "Dashbord/NavBar";
import Envoyer from "./Env";
const Set = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <NavBar/>
        <Envoyer />
  
      </div>
    </div>
  )
}

export default Set