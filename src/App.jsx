import React from "react";
import { Routes , Route } from "react-router-dom"
import Navbar from "./home/Navbar";
import DonorDashboard from "./home/DonorDashboard";
import NeedyDashboard from "./home/NeedyDashboard";
import NeedyProfile from "./home/NeedyProfile";
import ListedMed from "./home/ListedMed";
import DonorDetails from "./home/DonorDetails";
import AvailMed from "./home/AvailMed";
import FindMed from "./home/FindMed";
import Signup from "./home/Signup";
import Login from "./home/Login";
import NavbarLg from "./home/NavbarLg";
import NavbarPrf from "./home/NavbarPrf";
import AvailEquip from "./home/AvailEquip";
import FindEquip from "./home/FindEquip";

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element = { <Navbar> </Navbar> }  >

        <Route path="signup" element = { <Signup></Signup> } ></Route>
      </Route>
      <Route path="/" element = { <Navbar> </Navbar> }  >
        <Route path="login" element = { <Login></Login> } ></Route>
      
      </Route>
{/* **************************************************************** */}
      <Route path="/donor" element = { <NavbarLg> </NavbarLg> }  >
        <Route index element = { <DonorDashboard /> }></Route> 
      </Route> 
      {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
      <Route path="/details" element = { <NavbarPrf> </NavbarPrf> }  >
        <Route index element = { <DonorDetails></DonorDetails> } ></Route>
      </Route>
      <Route path="/availmed" element = { <NavbarPrf> </NavbarPrf> }  >
        <Route index element = { <AvailMed></AvailMed> } ></Route>
      </Route>
      <Route path="/listmed" element = { <NavbarPrf></NavbarPrf> } >
        <Route index element = { <ListedMed></ListedMed> }></Route>
      </Route> 
      <Route path="/availequip" element = { <NavbarPrf></NavbarPrf> } >
        <Route index element = { <AvailEquip></AvailEquip> }></Route>
      </Route> 
      {/* **************************************************************************** */}
      <Route path="/needy" element = { <NavbarLg> </NavbarLg> }  >
        <Route index element = { <NeedyDashboard> </NeedyDashboard> }  />
      </Route>
      <Route path="profile" element = { <NavbarPrf></NavbarPrf> } >
        <Route index element = { <NeedyProfile></NeedyProfile> }></Route>  
      </Route>
      <Route path="findmed" element = { <NavbarPrf></NavbarPrf> } >
        <Route index element = { <FindMed></FindMed> }></Route>
      </Route>
      <Route path="findequip" element = { <NavbarPrf></NavbarPrf> } >
        <Route index element = { <FindEquip></FindEquip> }></Route>
      </Route>
      {/* ************************************************* */}
      <Route path="/services"></Route>
    </Routes>
    
    </div>
  );
}

export default App;
