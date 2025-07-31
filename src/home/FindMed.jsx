import React, { useState , useEffect} from 'react';
import axios from 'axios';
import server_url from "../config/url";

const FindMed = () => {
  const [currcity, setCity] = useState('');
  const [medicine, setMedName] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState('');
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [cityOptions, setCityOptions] = useState([]);

  // 🔁 Fetch cities from backend on mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const resp = await axios.post(server_url+"/needy/all-cities");
        setCityOptions(resp.data.sort());
      } catch (err) {
        console.error("Failed to load cities", err);
      }
    };
    fetchCities();
  }, []);
  const handleFind = async () => {
    if (!currcity || !medicine) {
      setError('⚠️ Please select a city and enter a medicine name.');
      return;
    }

    try {
      const resp = await axios.post(server_url+"/needy/find-med", { currcity, medicine });

      if (resp.data && resp.data.length > 0) {
        setMedicines(resp.data);
        setError('');
      } else {
        setMedicines([]);
        setError('❌ No matching medicines found.');
      }
    } catch {
      setError('🚨 Server error. Please try again later.');
    }
  };

  const handleDetails = async (emailid) => {
    try {
      const resp = await axios.post(server_url+"/needy/don-det", { emailid });
      setSelectedDonor(resp.data);
      setShowModal(true);
    } catch {
      alert("Unable to fetch donor info.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">🔍 Find Medicine</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <select
          value={currcity}
          onChange={(e) => setCity(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select City</option>
          {cityOptions.map((c , idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Medicine Name"
          value={medicine}
          onChange={(e) => setMedName(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleFind}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition duration-300"
        >
          🔍 Find Now
        </button>
      </div>

      {error && <p className="text-red-600 font-medium text-center mb-4">{error}</p>}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {medicines.map((med, index) => (
          <div
  key={index}
  className="bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-5 flex flex-col justify-between"
>
  <div>
    <h3 className="text-lg font-bold text-indigo-700 mb-2 flex items-center gap-2">
      💊 {med.medicine}
    </h3>

    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
      <p><span className="font-medium">🏢 Company:</span> {med.company}</p>
      <p><span className="font-medium">📦 Packing:</span> {med.packing}</p>
      <p><span className="font-medium">📆 Expiry:</span> {med.expirydate}</p>
      <p><span className="font-medium">🔢 Quantity:</span> {med.quantity}</p>
      <p className="col-span-2"><span className="font-medium">📝 Info:</span> {med.info}</p>
    </div>
  </div>

  <button
    onClick={() => handleDetails(med.emailid)}
    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full transition-all"
  >
    👤 View Donor Details
  </button>
</div>

        ))}
      </div>

     {showModal && selectedDonor && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
      
      <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        🙋 Donor Details
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-4">
        {selectedDonor.profilepic && (
          <img
            src={selectedDonor.profilepic}
            alt="Donor"
            className="w-28 h-28 rounded-full border-4 border-purple-300 shadow-md object-cover"
          />
        )}

        <div className="text-sm text-gray-800 space-y-1">
          <p><span className="font-semibold">👤 Name:</span> {selectedDonor.names}</p>
          <p><span className="font-semibold">📧 Email:</span> {selectedDonor.emailid}</p>
          <p><span className="font-semibold">📱 Contact:</span> <a href={`tel:${selectedDonor.contact}`} className="text-blue-600 hover:underline">{selectedDonor.contact}</a></p>
          <p><span className="font-semibold">📍 Address:</span> {selectedDonor.curraddress}</p>
          <p><span className="font-semibold">🏙️ City:</span> {selectedDonor.currcity}</p>
          {selectedDonor.phone && (
            <p>
              <a
                href={`https://wa.me/${selectedDonor.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-600 font-medium hover:underline"
              >
                💬 WhatsApp Chat
              </a>
            </p>
          )}
        </div>
      </div>

      <button
        onClick={(e) =>  {
          e.stopPropagation();
          setShowModal(false);}}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-all"
      >
        ❌ Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default FindMed;
