// src/components/Topbar.jsx
import React, { useState, useRef } from "react";
import { Bell, UserCircle2, Sun, Moon, Search } from "lucide-react";

const Topbar = ({
  adminName = "Admin Name",
  adminEmail = "admin@example.com",
  notificationCount = 3,
  darkMode = false,
  setDarkMode = () => {},
  onSearch = () => {},
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="backdrop-blur-md bg-white/30 dark:bg-[#1a1a1a]/30 border border-white/10 shadow-inner shadow-gray-300 dark:shadow-black p-4 rounded-xl mx-4 mt-4 flex justify-between items-center neumorphic transition-all duration-300">
      {/* Left: Title & Search */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white drop-shadow-md">
          Admin Dashboard
        </h1>
        {/* Search Bar */}
        <div className="relative ml-4">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-4 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow"
          />
          <Search className="absolute right-2 top-2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">
        {/* Theme Switcher */}
        <button
          className="text-gray-700 dark:text-white hover:text-indigo-500"
          onClick={handleThemeToggle}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Admin Profile Dropdown with Delayed Hover */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <UserCircle2
            className="text-gray-700 dark:text-white cursor-pointer hover:scale-105 transition-transform"
            size={28}
            title="Profile"
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 w-52 z-10">
              <p className="font-semibold text-gray-800 dark:text-white">
                {adminName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 break-all">
                {adminEmail}
              </p>
              <hr className="my-2 border-gray-200 dark:border-gray-600" />
              <button
                className="w-full py-1 px-2 text-sm text-left rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-1"
                onClick={() => window.location.href = '/my-account'}
              >
                My Account
              </button>
              <button
                className="w-full py-1 px-2 text-sm text-left rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-1"
                onClick={() => window.location.href = '/settings'}
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-1 px-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition mt-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Notification Dropdown */}
        <div className="relative group">
          <Bell
            className="text-gray-700 dark:text-white cursor-pointer hover:scale-105 transition-transform"
            size={24}
            title="Notifications"
          />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 shadow-md">
              {notificationCount}
            </span>
          )}
          {/* Dropdown */}
          <div className="absolute right-0 top-8 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 z-20 hidden group-hover:block">
            <p className="font-semibold text-gray-800 dark:text-white mb-2">Notifications</p>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-700 dark:text-gray-200">New order received</li>
              <li className="text-gray-700 dark:text-gray-200">Product stock low</li>
              <li className="text-gray-700 dark:text-gray-200">New customer registered</li>
            </ul>
            <hr className="my-2 border-gray-200 dark:border-gray-600" />
            <button className="w-full text-xs text-indigo-600 hover:underline">View all notifications</button>
          </div>
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
