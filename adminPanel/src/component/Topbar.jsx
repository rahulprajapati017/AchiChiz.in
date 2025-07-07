// src/components/Topbar.jsx
import React, { useState, useRef } from "react";
import { Bell, UserCircle2 } from "lucide-react";

const Topbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Delay to allow user to reach dropdown
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // or use useNavigate()
  };

  return (
    <div className="backdrop-blur-md bg-white/30 dark:bg-[#1a1a1a]/30 border border-white/10 shadow-inner shadow-gray-300 dark:shadow-black p-4 rounded-xl mx-4 mt-4 flex justify-between items-center neumorphic transition-all duration-300">
      {/* Left: Title */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white drop-shadow-md">
        Admin Dashboard
      </h1>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">
        {/* Notification Bell with Badge */}
        <div className="relative">
          <Bell
            className="text-gray-700 dark:text-white cursor-pointer hover:scale-105 transition-transform"
            size={24}
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 shadow-md">
            3
          </span>
        </div>

        {/* Admin Profile Dropdown with Delayed Hover */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <UserCircle2
            className="text-gray-700 dark:text-white cursor-pointer hover:scale-105 transition-transform"
            size={28}
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 w-48 z-10">
              <p className="font-semibold text-gray-800 dark:text-white">
                Admin Name
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                admin@example.com
              </p>
              <hr className="my-2 border-gray-200 dark:border-gray-600" />
              <button
                onClick={handleLogout}
                className="w-full py-1 px-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Admin Label */}
        <span className="font-medium text-gray-700 dark:text-white drop-shadow-md">
          Admin
        </span>
      </div>
    </div>
  );
};

export default Topbar;
