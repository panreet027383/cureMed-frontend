import React, { useState } from 'react';
import axios from "axios";
import { MdEmail, MdPhone } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import server_url from "../config/url";

const NeedyProfile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [contact, setContact] = useState('');
  const [aadharFrontFile, setAadharFrontFile] = useState(null);
  const [aadharBackFile, setAadharBackFile] = useState(null);
  const [previewFront, setPreviewFront] = useState('');
  const [previewBack, setPreviewBack] = useState('');
  const [profileData, setProfileData] = useState({});
  const [showFrontFields, setShowFrontFields] = useState(false);
  const [showBackFields, setShowBackFields] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleContactChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setContact(digitsOnly);
    if (digitsOnly.length !== 10) {
      setContactError('📛 Contact number must be exactly 10 digits.');
    } else {
      setContactError('');
    }
  };

  const uploadForExtraction = async (file, type) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    const resp = await fetch(server_url+'/needy/extract', {
      method: 'POST',
      body: formData,
    });
    return await resp.json();
  };

  const handleFrontUpload = async (e) => {
    const file = e.target.files[0];
    setAadharFrontFile(file);
    setPreviewFront(URL.createObjectURL(file));

    const resp = await uploadForExtraction(file, 'front');
    if (resp.status) {
      setProfileData(prev => ({
        ...prev,
        name: resp.name,
        dob: resp.dob,
        gender: resp.gender,
      }));
      setShowFrontFields(true);
      toast.success("✅ Front Aadhaar processed");
    } else {
      toast.error("❌ Front extract failed");
    }
  };

  const handleBackUpload = async (e) => {
    const file = e.target.files[0];
    setAadharBackFile(file);
    setPreviewBack(URL.createObjectURL(file));

    const resp = await uploadForExtraction(file, 'back');
    if (resp.status) {
      setProfileData(prev => ({
        ...prev,
        address: resp.address,
      }));
      setShowBackFields(true);
      toast.success("✅ Back Aadhaar processed");
    } else {
      toast.error("❌ Back extract failed");
    }
  };

  const handleSendToServer = async () => {
    if (contactError) {
      toast.error("❗ Fix contact error");
      return;
    }

    if (contact.length !== 10) {
      toast.error("❗ Enter valid contact");
      return;
    }

    const formData = new FormData();
    formData.append('emailid', userEmail);
    formData.append('contact', contact);
    if (aadharFrontFile) formData.append('frontadhar', aadharFrontFile);
    if (aadharBackFile) formData.append('backadhar', aadharBackFile);
    Object.entries(profileData).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });
    let token=localStorage.getItem("token");
    const resp = await fetch(server_url+'/needy/profile', 
    {
      method: 'POST',
      body: formData,
      headers: { 'authorization' : `Bearer ${token}` },
    });

    const result = await resp.json();
    result.status
      ? toast.success("📤 Saved successfully!")
      : toast.error(`❌ ${result.msg}`);
  };

  const handleToFetch = async () => {
    try {
      const resp = await axios.post(server_url+"/needy/fetch", { emailid: userEmail });
      if (resp.data.status === true) {
        const data = resp.data.obj;
        setContact(data.contact || "");
        setProfileData({
          name: data.name || "",
          dob: data.dob || "",
          gender: data.gender || "",
          address: data.address || "",
        });
        setPreviewFront(data.frontadhar);
        setPreviewBack(data.backadhar);
        setShowFrontFields(true);
        setShowBackFields(true);
        toast.info("📦 Profile fetched");
      } else {
        toast.warning("⚠️ " + resp.data.msg);
      }
    } catch {
      toast.error("❌ Error fetching data");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">🧍 Needy Profile</h2>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <MdEmail className="text-xl" />
          <span>{userEmail}</span>
        </div>
        <button
          onClick={handleToFetch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition font-semibold"
        >
          📥 Fetch
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">📞 Contact</label>
        <div className="flex items-center gap-2">
          <MdPhone className="text-xl text-gray-500" />
          <input
            type="text"
            value={contact}
            onChange={handleContactChange}
            placeholder="Enter 10-digit number"
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {contactError && <p className="text-red-500 text-sm mt-1">{contactError}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">🪪 Aadhar Front</label>
          <input type="file" accept="image/*" onChange={handleFrontUpload} />
          {previewFront && <img src={previewFront} alt="Front" className="mt-2 rounded shadow-md" />}
          {showFrontFields && (
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>DOB:</strong> {profileData.dob}</p>
              <p><strong>Gender:</strong> {profileData.gender}</p>
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">📮 Aadhar Back</label>
          <input type="file" accept="image/*" onChange={handleBackUpload} />
          {previewBack && <img src={previewBack} alt="Back" className="mt-2 rounded shadow-md" />}
          {showBackFields && (
            <div className="mt-2 text-sm text-gray-700">
              <p><strong>Address:</strong> {profileData.address}</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleSendToServer}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold transition"
        >
          🚀 Send to Server
        </button>
      </div>
    </div>
  );
};

export default NeedyProfile;
