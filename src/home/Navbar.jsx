import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Footer from "./Footer";

export default function Navbar() {
  const [mode, setMode] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    setMode("signup");
    setMenuOpen(false);
    navigate("/signup");
  };

  const handleLogin = () => {
    setMode("login");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeForm = () => setMode(null);

  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-4 shadow-md relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="medicine.png"
              alt="MedConnect Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-semibold tracking-wide">CareConnect</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4">
            <a href="#services" className="px-4 py-2 hover:text-pink-400">Services</a>
            <a href="#team" className="px-4 py-2 hover:text-pink-400">Our Team</a>
            <a href="#contact" className="px-4 py-2 hover:text-pink-400">Contact Us</a>
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

          {/* Hamburger Icon */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 bg-gray-800 p-4 rounded-lg">
            <a href="#services" onClick={() => setMenuOpen(false)} className="text-white hover:text-pink-400">Services</a>
            <a href="#team" onClick={() => setMenuOpen(false)} className="text-white hover:text-pink-400">Our Team</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-white hover:text-pink-400">Contact Us</a>
            <button
              onClick={handleSignup}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
            >
              Log In
            </button>
          </div>
        )}
      </nav>

      {/* Content */}
      <Home />
      <Footer />

      {/* Overlay Form */}
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
