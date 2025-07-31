import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import server_url from "../config/url";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ uid: "", pwd: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function doLogin() {
    let url = server_url+"/user/login";
    let token=localStorage.getItem("token");
    let resp = await axios.post(url, formData , {
        headers: { 'authorization' : `Bearer ${token}`  },
      });
    if (resp.data.status === true) {
      setSuccess(`Welcome, ${resp.data.obj.uid}`);
      localStorage.setItem("userEmail", formData.uid);

      if (resp.data.obj.ut === "donor") {
        navigate("/donor");
      } else if (resp.data.obj.ut === "needy") {
        navigate("/needy");
      } else {
        alert("Unknown user type: " + resp.data.ut);
      }
    } else {
      alert(resp.data.msg);
    }
  }

  return (
    <div>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Login to CareConnect</h2>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center text-sm border border-green-300 mb-4">
            {success}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); doLogin(); }} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <MdEmail className="mr-2 text-lg" /> Email
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
              <RiLockPasswordLine className="mr-2 text-lg" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="pwd"
                value={formData.pwd}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            🔐 Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
