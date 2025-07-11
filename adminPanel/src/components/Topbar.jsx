// src/components/Topbar.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

const Topbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date/time
  const formatDateTime = (date) =>
    date.toLocaleString("en-IN", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  // Generate breadcrumb from path
  const getBreadcrumb = () => {
    const parts = location.pathname.split("/").filter(Boolean);
    return parts.length === 0 ? (
      <span>Dashboard</span>
    ) : (
      parts.map((part, index) => (
        <span key={index} className="capitalize">
          {index > 0 && <span className="mx-1">/</span>}
          {part.replace("-", " ")}
        </span>
      ))
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6 fixed top-0 w-[calc(100%-16rem)] z-50">
      {/* Left: Breadcrumb + Greeting */}
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">{getBreadcrumb()}</div>
        <div className="text-base font-medium text-gray-800">
          Welcome, <span className="text-blue-700">{admin?.email}</span>
        </div>
      </div>

      {/* Right: Time, Notification, Avatar, Logout */}
      <div className="flex items-center space-x-4">
        {/* Date Time */}
        <div className="text-sm text-gray-500">{formatDateTime(time)}</div>

        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-600 hover:text-blue-600"
          >
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50">
              <div className="p-4 border-b font-semibold text-gray-700">
                Notifications
              </div>
              <ul className="text-sm text-gray-600 divide-y max-h-48 overflow-y-auto">
                <li className="p-3 hover:bg-gray-50">🔔 New order received</li>
                <li className="p-3 hover:bg-gray-50">🧾 Product stock low</li>
                <li className="p-3 hover:bg-gray-50">✅ Review approved</li>
              </ul>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold">
          {admin?.email?.[0]?.toUpperCase() || "A"}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
