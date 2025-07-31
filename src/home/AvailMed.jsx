// AvailMed.jsx
import React, { useState } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import server_url from "../config/url";

const AvailMed = () => {
  const userEmail = localStorage.getItem("userEmail");
  const location = useLocation();

  const medToEdit = location.state?.med || null;
  const isEdit = !!medToEdit;

  const [form, setForm] = useState({
    emailid: medToEdit?.emailid || userEmail,
    medicine: medToEdit?.medicine || "",
    company: medToEdit?.company || "",
    expirydate: medToEdit?.expirydate || "",
    quantity: medToEdit?.quantity || "",
    info: medToEdit?.info || "",
    packing: medToEdit?.packing || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAvailableClick = async (e) => {
    e.preventDefault();
    form.emailid = userEmail;
    try {
      const url = server_url+"/medicine/save";
      const resp = await axios.post(url, form);
      toast[resp.data.status ? 'success' : 'error'](resp.data.msg);
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleUpdateClick = async () => {
    try {
      const url = server_url+"/medicine/update";
      const resp = await axios.post(url, form);
      toast[resp.data.status ? 'success' : 'error'](resp.data.msg);
    } catch {
      toast.error("Update failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 border p-6 bg-white shadow-lg rounded-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6 text-shadow-green-700">Medicine Availability Form</h2>
      
      <div className="flex items-center gap-2 mb-6 text-gray-700">
        <MdEmail size={20} />
        <span className="font-medium">{userEmail}</span>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Medicine Name</label>
            <input
              type="text"
              name="medicine"
              value={form.medicine}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Company</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Expiry Date</label>
            <input
              type="date"
              name="expirydate"
              value={form.expirydate}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Packing</label>
          <select
            name="packing"
            value={form.packing}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Blister Pack">Blister Pack</option>
            <option value="Bottle">Bottle</option>
            <option value="Sachet">Sachet</option>
            <option value="Strip">Strip</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Other Info</label>
          <textarea
            name="info"
            value={form.info}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-6 mt-10 justify-center">
  <button
    type="button"
    onClick={handleAvailableClick}
    disabled={isEdit}
    className={`relative px-8 py-3 text-lg font-bold rounded-full transition duration-300 ease-in-out
      ${isEdit
        ? "bg-gray-400 cursor-not-allowed text-white shadow-inner"
        : "bg-gradient-to-r from-lime-500 to-green-600 text-white shadow-lg hover:shadow-2xl hover:from-lime-600 hover:to-green-700 hover:scale-105 active:scale-95"}
    `}
  >
    <span className="z-10 relative">🚀 Available to Public</span>
  </button>

  <button
    type="button"
    onClick={handleUpdateClick}
    disabled={!isEdit}
    className={`relative px-8 py-3 text-lg font-bold rounded-full transition duration-300 ease-in-out
      ${!isEdit
        ? "bg-gray-400 cursor-not-allowed text-white shadow-inner"
        : "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:from-indigo-600 hover:via-purple-700 hover:to-pink-700 hover:scale-105 active:scale-95"}
    `}
  >
    <span className="z-10 relative">💾 Update</span>
  </button>
</div>


      </form>
    </div>
  );
};

export default AvailMed;
