import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Signup from './home/Signup.jsx'
import Login from './home/Login.jsx'
import DonorDetails from './home/DonorDetails.jsx'
import AvailMed from './home/AvailMed.jsx'
import ListedMed from './home/ListedMed.jsx'
import NeedyProfile from './home/NeedyProfile.jsx'
import FindMed from './home/FindMed.jsx'
import Navbar from './home/Navbar.jsx'
import NeedyDashboard from './home/NeedyDashboard.jsx'
import DonorDashboard from './home/DonorDashboard.jsx'
import AvailEquip from './home/AvailEquip.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
        <App />
    </BrowserRouter> 
    {/* <Navbar></Navbar> */}
    {/* <NeedyDashboard></NeedyDashboard> */}
    {/* <DonorDashboard></DonorDashboard> */}
    {/* <Signup></Signup> */}
    {/* <DonorDetails></DonorDetails> */}
    {/* <NeedyProfile></NeedyProfile> */}
    {/* <FindMed></FindMed> */}


  </StrictMode>,
)
