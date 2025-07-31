import React, { useState } from 'react';
import axios from "axios";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserTag } from "react-icons/fa";
import server_url from "../config/url";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ uid: "", pwd: "", ut: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function doSave() {
      let url = server_url+"/user/signup";
      let resp = await axios.post(url, formData);
      alert(resp.data.msg);
      if (resp.data.status) 
      {
        localStorage.setItem("token", resp.data.token);
        alert(resp.data.token);
      }
  }

  return (
    <div>
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Create Account</h2>
        <form onSubmit={(e) => { e.preventDefault(); doSave(); }} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <MdEmail className="mr-2 text-teal-600" /> Email Address
            </label>
            <input
              type="email"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <RiLockPasswordLine className="mr-2 text-teal-600" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="pwd"
                value={formData.pwd}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
            </div>
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaUserTag className="mr-2 text-teal-600" /> User Type
            </label>
            <select
              name="ut"
              value={formData.ut}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">-- Select User Type --</option>
              <option value="needy">Needy</option>
              <option value="donor">Donor</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
  type="submit"
  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
>
  🚀 Sign Up
</button>

        </form>
      </div>
    </div>
  );
};

export default Signup;
