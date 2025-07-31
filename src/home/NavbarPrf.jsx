import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function NavbarPrf() {
  const [mode, setMode] = useState(null);
  const navigate = useNavigate();

  function handleBack() {
    setMode("back");
    navigate("/");
  }

  function handleLogout() {
    setMode("logout");
    navigate("/");
    // alert("Logged Out");
  }

  const closeForm = () => setMode(null);

  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="medicine.png"
            alt="MedConnect Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-semibold tracking-wide">CareConnect</span>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Back
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Optional overlay (for future use) */}
      {mode && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={closeForm}>
          <div className="bg-white p-6 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Reserved for future modal use */}
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}
