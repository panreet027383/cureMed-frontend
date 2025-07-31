import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function NavbarLg() {

  const [mode, setMode] = useState(null);
  const navigate = useNavigate();

  function handleLogout() {
    setMode("logout");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    alert("Logged Out");
    navigate("/");
  }

  const closeForm = () => setMode(null);

  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/medicine.png"
            alt="MedConnect Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-semibold tracking-wide">CareConnect</span>
        </div>

        {/* Right Side - Logout Button */}
        <div className="flex items-center gap-4">
  
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Optional Overlay if needed later */}
      {mode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={closeForm}
        >
          <div
            className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* You can place Home/Logout forms if needed here */}
            {mode === "logout" && <p>Logging out...</p>}
          </div>
        </div>
      )}

      {/* Render routed content */}
      <Outlet />
    </>
  );
}
