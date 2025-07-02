// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import Overview from "../pages/admin/Overview";
import Orders from "../pages/admin/Orders";
import Products from "../pages/admin/Products";
import Customers from "../pages/admin/Customers";
import Settings from "../pages/admin/Settings";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
