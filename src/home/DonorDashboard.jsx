import React, { useState } from 'react';
import ListedMed from './ListedMed';
import DonorDetails from './DonorDetails';
import AvailMed from './AvailMed';
import AvailEquip from './AvailEquip';
import { useNavigate } from 'react-router-dom';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(null);

  function handleShowProfile() {
    setActiveComponent('details');
    navigate("/details");
  }

  function handleFindMedicines() {
    setActiveComponent('medicines');
    navigate("/availmed");
  }

  function handleListedMed() {
    setActiveComponent('listed');
    navigate("/listmed");
  }

  function handleEquipment() {
    setActiveComponent('equip');
    navigate("/availequip");
  }

  // Conditional routing
  if (activeComponent === 'details') return <DonorDetails />;
  if (activeComponent === 'medicines') return <AvailMed />;
  if (activeComponent === 'listed') return <ListedMed />;
  if (activeComponent === 'equip') return <AvailEquip />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Donor Dashboard</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
            <img src="/download1.png" alt="Donor Profile" className="rounded-xl w-full h-40 object-cover mb-4" />
            <center><h2 className='font-bold'>Donor Details</h2></center>
            <p>taking donor details for medicines</p>
            <button
              onClick={handleShowProfile}
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Go to profile
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
            <img src="/med.jpeg" alt="Donate Medicine" className="rounded-xl w-full h-40 object-cover mb-4" />
            <center><h2 className='font-bold'>Medicines to Donate</h2></center>
            <p>form for medicines which donor donates</p>
            <button
              onClick={handleFindMedicines}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Available Medicines
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
            <img src="/list.jpeg" alt="Listed Medicines" className="rounded-xl w-full h-40 object-cover mb-4" />
            <center><h2 className='font-bold'>Listed Medicines</h2></center>
            <p>details of medicines which donor wants to donate</p>
            <button
              onClick={handleListedMed}
              className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Details of Medicines
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow">
            <img src="/equp.jpeg" alt="Manage Equipment" className="rounded-xl w-full h-40 object-cover mb-4" />
            <center><h2 className='font-bold'>Equipments to Donate</h2></center>
            <p>form for equipments which donor donates</p>
            <button
              onClick={handleEquipment}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Manage Equipments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
