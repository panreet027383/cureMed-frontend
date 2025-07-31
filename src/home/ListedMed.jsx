import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import server_url from "../config/url";

const ListedMed = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchMedicines = async () => {
    let url = server_url+"/medicine/fetch";
    let resp = await axios.post(url, { emailid: userEmail });

    if (resp.data.status && resp.data.obj.length > 0) {
      setMedicines(resp.data.obj);
      setError("");
    } else {
      setMedicines([]);
      setError("No medicines found for this email.");
    }
  };

  const handleEdit = (med) => {
    navigate("/availmed", { state: { med } });
  };

  const handleDelete = async (id) => {
    let url = server_url+"/medicine/delete";
    let resp = await axios.post(url, { emailid: userEmail, id });

    if (resp.data.status === true) {
      setMedicines(prev => prev.filter(m => m._id !== id));
      alert(resp.data.msg);
    } else {
      alert(resp.data.msg || "Delete failed.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white via-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">📦 Medicines Posted By You</h2>

        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="text-gray-700 text-md font-medium">
            Logged in as: <span className="text-blue-600 font-semibold">{userEmail}</span>
          </div>
          <button
            onClick={fetchMedicines}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:scale-105 transition-transform"
          >
            🔍 Fetch Medicines
          </button>
        </div>

        {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

        {medicines.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="px-4 py-2 text-left font-semibold">Medicine</th>
                  <th className="px-4 py-2 text-left font-semibold">Company</th>
                  <th className="px-4 py-2 text-left font-semibold">Expiry</th>
                  <th className="px-4 py-2 text-left font-semibold">Quantity</th>
                  <th className="px-4 py-2 text-left font-semibold">Packing</th>
                  <th className="px-4 py-2 text-left font-semibold">Info</th>
                  <th className="px-4 py-2 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med._id} className="border-t hover:bg-blue-50">
                    <td className="px-4 py-3">{med.medicine}</td>
                    <td className="px-4 py-3">{med.company}</td>
                    <td className="px-4 py-3">{med.expirydate}</td>
                    <td className="px-4 py-3">{med.quantity}</td>
                    <td className="px-4 py-3">{med.packing}</td>
                    <td className="px-4 py-3">{med.info}</td>
                    <td className="px-4 py-3 flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(med)}
                        className="px-4 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(med._id)}
                        className="px-4 py-1 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListedMed;
