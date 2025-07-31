import React, { useState } from 'react';
import NeedyProfile from './NeedyProfile';
import FindMed from './FindMed';
import FindEquip from './FindEquip';
import { useNavigate } from 'react-router-dom';

const NeedyDashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  const handleShowProfile = () => {
    setActiveComponent('profile');
    navigate("/profile");
  };

  const handleFindMedicines = () => {
    setActiveComponent('medicines');
    navigate("/findmed");
  };

  const handleEquip = () => {
    setActiveComponent('find');
    navigate("/findequip");
  };

  const handleLogout = () => {
    setActiveComponent('logout');
    navigate("/");
  };

  if (activeComponent === 'profile') return <NeedyProfile />;
  if (activeComponent === 'medicines') return <FindMed />;
  if (activeComponent === 'find') return <FindEquip />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Needy Dashboard</h2>
        {userEmail && (
          <p className="text-center text-gray-600 mb-8 text-sm">Welcome, <span className="font-medium text-teal-600">{userEmail}</span></p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
            <img src="/download.jpeg" alt="Needy Profile" className="rounded-xl w-full h-40 object-cover mb-4" />
            <center><h2 className='font-bold text-2xl'>Needy Profile</h2></center>
            <p>details of the needy person</p>
            <button
              onClick={handleShowProfile}
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Go to profile
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
            <img src="/mediciine.jpg" alt="Find Medicines" className="rounded-xl w-full h-40 object-cover mb-4" />
            <center><h2 className='font-bold text-2xl'>Search Medicnes </h2></center>
            <p>needy search for medicnes</p>
            <button
              onClick={handleFindMedicines}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Find Medicines
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
            <img src="/downloadss.jpeg" alt="Find Equipments" className="rounded-xl w-full h-40 object-cover mb-4"/>
            <center><h2 className='font-bold text-2xl'>Search Equipments</h2></center>
            <p>needy searches equipment</p>
            <button
              onClick={handleEquip}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Find Equipments
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
            <img src="/log.jpeg" alt="Logout" className="rounded-xl w-full h-40 object-cover mb-4" />
            <center><h1 className='font-bold text-2xl'>Log Out</h1></center>
            <p>Go out from profile</p>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Go to Home 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedyDashboard;
