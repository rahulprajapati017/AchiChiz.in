// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FiBox,
  FiHome,
  FiUsers,
  FiSettings,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-xl p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orange-600 mb-8">AchiChiz Admin</h1>
          <nav className="flex flex-col gap-4">
            <Link to="/admin" className="flex items-center gap-3 text-gray-700 hover:text-orange-600">
              <FiHome /> Dashboard
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 text-gray-700 hover:text-orange-600">
              <FiShoppingBag /> Orders
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 text-gray-700 hover:text-orange-600">
              <FiBox /> Products
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3 text-gray-700 hover:text-orange-600">
              <FiUsers /> Customers
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 text-gray-700 hover:text-orange-600">
              <FiSettings /> Settings
            </Link>
          </nav>
        </div>
        <button className="flex items-center gap-3 text-red-600 hover:text-red-800">
          <FiLogOut /> Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
