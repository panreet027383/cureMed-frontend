import React from "react";
import { FaHandsHelping, FaNotesMedical, FaUserMd } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Home = () => {
  return (
    <div className="w-full text-gray-800 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-teal-700 mb-4">
            Give Unused Medicines. Save Lives.
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We connect medicine donors with those who need them most — fast, free,
            and with care.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700">
              Donate Medicine
            </button>
            <button className="bg-gray-200 text-teal-700 px-6 py-3 rounded-lg shadow hover:bg-gray-300">
              Request Help
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 id="services" className="text-3xl font-bold text-center text-teal-700 mb-10">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <FaNotesMedical className="text-5xl text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Free Medicine Distribution</h3>
            <p>Distribute unused or surplus medicines donated by individuals to the underprivileged.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <FaUserMd className="text-5xl text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">We Verify & Match</h3>
            <p>We connect your donation to someone in need.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <FaHandsHelping className="text-5xl text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Help</h3>
            <p>Helping communities in times of need.</p>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="bg-white py-16 px-6">
        <h2 id="impact" className="text-3xl font-bold text-center text-teal-700 mb-10">
          Our Impact
        </h2>
        <div className="flex flex-wrap justify-center gap-10 max-w-4xl mx-auto text-center">
          <div className="bg-gray-100 p-6 rounded shadow w-64">
            <h3 className="text-4xl font-bold text-teal-600 mb-2">5,000+</h3>
            <p>Medicines Donated</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow w-64">
            <h3 className="text-4xl font-bold text-teal-600 mb-2">2,000+</h3>
            <p>Patients Helped</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow w-64">
            <h3 className="text-4xl font-bold text-teal-600 mb-2">12</h3>
            <p>Cities Reached</p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 id="team" className="text-3xl font-bold text-center text-teal-700 mb-10">
          Meet the Team
        </h2>
        <div className="flex flex-wrap justify-center gap-10 text-center">
          <div className="max-w-xs">
            <img
              src="sir.jpg"
              alt="Rajesh Bansal"
              className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Harmeet Singh & Karan </h3>
            <p className="text-teal-600">Project Manager</p>
            <p>B Tech (CSE)</p>
          </div>
          <div className="max-w-xs">
            <img
              src="prnit.jpg"
              alt="Parneet Kaur"
              className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Parneet Kaur</h3>
            <p className="text-teal-600">Lead Developer</p>
            <p>B.Tech (CSE)</p>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-white py-16 px-6">
        <h2 id="contact" className="text-3xl font-bold text-center text-teal-700 mb-10">
          Contact Us
        </h2>
        <div className="w-full h-96 shadow-md rounded-lg overflow-hidden max-w-6xl mx-auto">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13776.616225353203!2d74.9607548!3d30.2074855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391732d415f47415%3A0xe9f58efb4b06c7c8!2sBangalore%20Computer%20Education!5e0!3m2!1sen!2sin!4v1690059199210!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Home;
