// src/layouts/AdminLayout.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar"; // 👈 Import Topbar

const AdminLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#1a1a1a] text-gray-800 dark:text-white">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Right side (Content + Topbar) */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        {/* Topbar added here */}
        <Topbar 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          adminName="AchiChiz Admin"
          adminEmail="admin@achichiz.in"
          notificationCount={3}
          onSearch={setSearchTerm}
        />

        {/* Main Page Content */}
        <main className="p-4">
          {React.isValidElement(children)
            ? React.cloneElement(children, { searchTerm })
            : children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
