import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";

export default function Navbar() {
  const [mode, setMode] = useState(null);
  const navigate = useNavigate();

  function handleSignup() {
    setMode("signup");
    navigate("/signup");
  }

  function handleLogin() {
    setMode("login");
    navigate("/login");
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

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-gradient-to-r  text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            <a href="#services">Services</a>
          </button>
          <button
            className="bg-gradient-to-r  text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            <a href="#team">Our Team</a>
          </button>
          <button
            className="bg-gradient-to-r  text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            <a href="#contact">Contact Us</a>
          </button>

          <button
            onClick={handleSignup}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Content */}
      <Home />
      <Footer />

      {/* Optional Overlay Form */}
      {mode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={closeForm}
        >
          <div
            className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {mode === "signup" ? <Signup minimal={true} /> : <Login minimal={true} />}
          </div>
        </div>
      )}
    </>
  );
}
