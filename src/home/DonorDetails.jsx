import React, { useState } from 'react';
import axios from 'axios';
import { MdEmail } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import server_url from "../config/url";

const DonorDetails = () => {
  const [contactError, setContactError] = useState('');
  const [contact, setContact] = useState('');
  const userEmail = localStorage.getItem("userEmail");

  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const [formData, setFormData] = useState({
    names: "",
    age: "",
    curraddress: "",
    currcity: "",
    contact: "",
    gender: "",
    qualification: "",
    occupation: "",
    adharpic: null,
    profilepic: null,
  });

  const handleContactChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setContact(digitsOnly);
    setFormData(prev => ({ ...prev, contact: digitsOnly }));
    setContactError(digitsOnly.length !== 10 ? 'Contact number must be exactly 10 digits.' : '');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'adharpic' && files?.[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, adharpic: file }));
      setAadhaarPreview(URL.createObjectURL(file));
    } else if (name === 'profilepic' && files?.[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, profilepic: file }));
      setProfilePreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    
    e.preventDefault();
    formData.emailid = userEmail;
    const fd = new FormData();
    for (let key in formData) {
      const value = formData[key];
      if ((key === "adharpic" || key === "profilepic") && value) {
        fd.append(key, value, value.name);
      } else {
        fd.append(key, value);
      }
    } 
      let token=localStorage.getItem("token");   
      const resp = await axios.post(server_url+"/donor/donordetails/save", fd, 
      {
        headers: { 'authorization' : `Bearer ${token}` },
      });
      alert(resp.data.msg);
      toast[resp.data.status ? 'success' : 'error'](resp.data.msg);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(server_url+"/donor/donordetails/update", formData,);
      // alert(resp.data.msg);
      toast[resp.data.status ? 'success' : 'error'](resp.data.msg);
    } catch {
      toast.error("Update failed.");
    }
  };

  const handleFind = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(server_url+"/donor/donordetails/find", { emailid: userEmail });
      if (resp.data.status) {
        const data = resp.data.obj;
        setFormData({ ...data, adharpic: null, profilepic: null });
        setContact(data.contact);
        setAadhaarPreview(data.adharpic && data.adharpic !== "none.jpg" ? data.adharpic : null);
        setProfilePreview(data.profilepic && data.profilepic !== "none.jpg" ? data.profilepic : null);
        toast.success("Record found");
      } else {
        toast.error(resp.data.msg);
      }
    } catch {
      toast.error("Error fetching data.");
    }
  };

  return (
    <div className="max-w-4xl border mx-auto p-8 bg-white shadow-2xl rounded-lg mt-8">
      <ToastContainer />
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Donor Details Form</h2>

      <form className="space-y-6">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded shadow">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <MdEmail />
            {userEmail}
          </div>
          <button
  onClick={handleFind}
  type="button"
  className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-green-700"
>
  🔍 Fetch
</button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-bold block mb-1">Full Name</label>
            <input name="names" value={formData.names} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="font-bold block mb-1">Age</label>
            <input name="age" type="number" value={formData.age} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="font-bold block mb-1">City</label>
            <input name="currcity" value={formData.currcity} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="font-bold block mb-1">Address</label>
            <input name="curraddress" value={formData.curraddress} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="font-bold block mb-1">Contact Number</label>
            <input name="contact" value={contact} onChange={handleContactChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {contactError && <p className="text-sm text-red-600 mt-1">{contactError}</p>}
          </div>
          <div>
            <label className="font-bold block mb-1">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="font-bold block mb-1">Qualification</label>
            <select name="qualification" value={formData.qualification} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Qualification</option>
              <option>High School</option>
              <option>Bachelor's</option>
              <option>Master's</option>
              <option>PhD</option>
            </select>
          </div>
          <div>
            <label className="font-bold block mb-1">Occupation</label>
            <select name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Occupation</option>
              <option>Student</option>
              <option>Employee</option>
              <option>Self-Employed</option>
              <option>Unemployed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-bold block mb-1">Aadhaar Upload</label>
            <input type="file" name="adharpic" onChange={handleChange} className="mt-2 block" />
            {aadhaarPreview && <img src={aadhaarPreview} alt="Aadhaar" className="w-32 h-32 mt-2 rounded shadow" />}
          </div>
          <div>
            <label className="font-bold block mb-1">Profile Picture</label>
            <input type="file" name="profilepic" onChange={handleChange} className="mt-2 block" />
            {profilePreview && <img src={profilePreview} alt="Profile" className="w-32 h-32 mt-2 rounded shadow" />}
          </div>
        </div>

        <center>
          {/* <div className="flex gap-4 mt-6"> */}
          <div className="flex gap-4 mt-6">
        <button
         onClick={handleSave}
       className="flex items-center gap-2 px-6 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-blue-700"
     >
        💾 Save
         </button>
   <button
    onClick={handleUpdate}
    className="flex items-center gap-2 px-6 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-fuchsia-500 to-purple-600 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:from-fuchsia-600 hover:to-purple-700"
  >
    🔄 Update
  </button>
</div>

        {/* </div> */}
        </center>
      </form>
    </div>
  );
};

export default DonorDetails;
