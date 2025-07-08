// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Package,
  BarChart2,
  ShoppingCart,
  Eye,
  UserCheck,
  Menu,
  Sun,
  Moon,
  X,
  Star, // Added Star icon for Reviews
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Overview", path: "/overview", icon: Eye },
  { name: "Orders", path: "/orders", icon: ShoppingCart },
  { name: "Products", path: "/products", icon: Package },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Vendors", path: "/vendors", icon: UserCheck },
  { name: "Analytics", path: "/analytics", icon: BarChart2 },
  { name: "Reviews", path: "/reviews", icon: Star }, // Added Reviews section
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar") === "collapsed"
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/30 backdrop-blur-lg p-2 rounded-lg"
        onClick={toggleMobile}
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        fixed z-40 top-0 left-0 h-full bg-white/20 dark:bg-black/20 backdrop-blur-xl border-r border-white/10 shadow-xl p-4 md:p-6 flex flex-col justify-between transition-all duration-300 ease-in-out neumorphic-sidebar`}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-8">
            {!collapsed && (
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white drop-shadow">
                AchiChiz
              </h1>
            )}
            <div className="flex gap-2 items-center">
              <button
                className="text-gray-600 dark:text-white hover:text-indigo-500"
                onClick={toggleTheme}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                className="hidden md:block text-gray-600 dark:text-white hover:text-indigo-500"
                onClick={toggleSidebar}
              >
                <Menu size={18} />
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-2">
            {menuItems.map(({ name, path, icon: Icon }, index) => (
              <NavLink
                key={index}
                to={path}
                className={({ isActive }) =>
                  `group flex items-center ${
                    collapsed ? "justify-center" : "justify-start"
                  } gap-4 px-4 py-2 rounded-xl transition-all duration-300 transform relative ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md scale-[1.02]"
                      : "text-gray-800 dark:text-white hover:bg-white/30 hover:text-purple-600 hover:scale-[1.01]"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />
                {!collapsed && (
                  <span className="text-sm font-semibold">{name}</span>
                )}
                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span className="absolute left-full ml-2 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all">
                    {name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="pt-6 mt-6 border-t border-white/10 text-center text-xs text-gray-600 dark:text-gray-400">
            <p>© 2025 AchiChiz</p>
            <p className="opacity-75">Admin Panel</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
