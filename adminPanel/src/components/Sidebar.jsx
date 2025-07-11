// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaPlus,
  FaStar,
  FaFileAlt,
  FaTags,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const { admin } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const commonLinks = [
    { label: "Dashboard", to: "/", icon: <FaTachometerAlt /> },
    { label: "Products", to: "/products", icon: <FaBox /> },
    { label: "Orders", to: "/orders", icon: <FaClipboardList /> },
  ];

  const adminLinks = [
    { label: "Users", to: "/users", icon: <FaUsers /> },
    { label: "Add Product", to: "/add-product", icon: <FaPlus /> },
    { label: "Reviews", to: "/reviews", icon: <FaStar /> },
    { label: "CMS", to: "/cms", icon: <FaFileAlt /> },
    { label: "Coupons", to: "/coupons", icon: <FaTags /> },
    { label: "Settings", to: "/settings", icon: <FaCog /> },
  ];

  const fullLinks =
    admin?.role === "admin" ? [...commonLinks, ...adminLinks] : commonLinks;

  return (
    <aside className="bg-[#0f2c5c] text-white w-64 min-h-screen p-4 space-y-4 fixed">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      {fullLinks.map(({ label, to, icon }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${
            isActive(to)
              ? "bg-blue-700 text-white"
              : "hover:bg-blue-600 text-gray-200"
          }`}
        >
          {icon}
          <span>{label}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
