// AvailEquip.jsx
import React, { useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail } from "react-icons/md";
import server_url from "../config/url";

export default function AvailEquip() {
  const userEmail = localStorage.getItem("userEmail");
  const [formData, setFormData] = useState({
    emailid: userEmail,
    equipmentName: "",
    purpose: "",
    condition: "",
    issues: "",
    batteryCondition: "",
    expiryDate: "",
    profilepic: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilepic" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
      setProfilePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const url = server_url+"/medicine/save/equip";
    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "profilepic" && formData[key]) {
        fd.append(key, formData[key], formData[key].name);
      } else {
        fd.append(key, formData[key]);
      }
    });

    try {
      const resp = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(resp.data.msg || "Equipment submitted!");
    } catch {
      toast.error("❌ Error submitting equipment.");
    }
  };

  const handleUpdate = async () => {
    const url = server_url+"/medicine/update/equip";
    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "profilepic" && formData[key]) {
        fd.append(key, formData[key], formData[key].name);
      } else {
        fd.append(key, formData[key]);
      }
    });

    try {
      const resp = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(resp.data.msg || "Updated successfully!");
    } catch {
      toast.error("❌ Error updating equipment.");
    }
  };

  const handleFind = async () => {
    try {
      const url = server_url+"/medicine/find";
      const resp = await axios.post(url, { emailid: userEmail });

      if (resp.data.status) {
        const data = resp.data.obj;
        setFormData({
          emailid: userEmail,
          equipmentName: data.equipmentName || "",
          purpose: data.purpose || "",
          condition: data.condition || "",
          issues: data.issues || "",
          batteryCondition: data.batteryCondition || "",
          expiryDate: data.expiryDate ? data.expiryDate.slice(0, 10) : "",
          profilepic: null,
        });
        setProfilePreview(data.profilepic && data.profilepic !== "none.jpg" ? data.profilepic : null);
        toast.success("Equipment data loaded ✅");
      } else {
        toast.warn(resp.data.msg || "No equipment found.");
      }
    } catch{
      toast.error("❌ Failed to fetch equipment.");
    }
  };

  return (
    <div className="border max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <ToastContainer position="top-right" />

      <h2 className="text-2xl font-bold mb-4 text-center">🛠️Equipment Details</h2>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-gray-700 font-medium">
          <MdEmail className="text-xl" />
          <span>{userEmail}</span>
        </div>
        <button
    type="button"
    onClick={handleFind}
    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition duration-300 ease-in-out"
  >
    🔍 Fetch
  </button>
      </div>

      <div className="mb-4">
        <label className="font-semibold">Equipment Picture:</label>
        <input
          type="file"
          name="profilepic"
          accept="image/*"
          onChange={handleChange}
          className="w-full mt-1 border border-gray-300 rounded p-2"
        />
        {profilePreview && (
          <img
            src={profilePreview}
            alt="Preview"
            className="w-full mt-3 rounded"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">Equipment Name:</label>
          <input
            type="text"
            name="equipmentName"
            value={formData.equipmentName}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="font-semibold">Battery Condition:</label>
          <input
            type="text"
            name="batteryCondition"
            value={formData.batteryCondition}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded p-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="font-semibold">Purpose:</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full mt-1 border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mt-4">
        <label className="font-semibold">Condition:</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full mt-1 border border-gray-300 rounded p-2"
        >
          <option value="">-- Select Condition --</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Need Repair">Need Repair</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="font-semibold">Issues or Damage:</label>
        <textarea
          name="issues"
          value={formData.issues}
          onChange={handleChange}
          className="w-full mt-1 border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mt-4">
        <label className="font-semibold">Expiry Date:</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="w-full mt-1 border border-gray-300 rounded p-2"
        />
      </div>

      <div className="flex space-x-4 mt-6 justify-center">
  <button
    type="button"
    onClick={handleSubmit}
    className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 hover:scale-105 transition duration-300 ease-in-out"
  >
    📢 Make Public
  </button>

  <button
    type="button"
    onClick={handleUpdate}
    className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:from-purple-600 hover:to-purple-800 hover:scale-105 transition duration-300 ease-in-out"
  >
    🔁 Update
  </button>

  
</div>

    </div>
  );
}
