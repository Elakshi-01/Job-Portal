import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-black">
              Job<span  className="text-red-600" >Hunt</span> 
            </h2>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              A modern job portal designed to connect talent with
              meaningful career opportunities across industries.
            </p>
          </div>

          {/* WHAT WE OFFER */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              What We Offer
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>✔ Verified job listings</li>
              <li>✔ Role-based hiring system</li>
              <li>✔ Simple & fast applications</li>
              <li>✔ Career-focused platform</li>
            </ul>
          </div>

          {/* POPULAR ROLES */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Popular Roles
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>💻 Frontend Developer</li>
              <li>🖥 Backend Developer</li>
              <li>📊 Data Scientist</li>
              <li>🎨 UI / UX Designer</li>
              <li>⚙ Full Stack Developer</li>
            </ul>
          </div>

          {/* PLATFORM INFO */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Platform Highlights
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>🚀 Fast & responsive UI</li>
              <li>🔐 Secure authentication</li>
              <li>📱 Mobile-first design</li>
              <li>⚡ Built with MERN stack</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © 2024 Job Hunt. All rights reserved.
          </p>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#6A38C2] hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#6A38C2] hover:text-white transition"
            >
              <FaTwitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#6A38C2] hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
