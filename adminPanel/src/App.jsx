<<<<<<< HEAD

import React from "react";
import { Routes, Route } from "react-router-dom"; 
import AdminLayout from "./Layout/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";
import Overview from "./pages/Overview";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Reviews from "./pages/Reviews";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="overview"
        element={
          <AdminLayout>
            <Overview />
          </AdminLayout>
        }
      />
      <Route
        path="orders"
        element={
          <AdminLayout>
            <Orders />
          </AdminLayout>
        }
      />
      <Route
        path="products"
        element={
          <AdminLayout>
            <Products />
          </AdminLayout>
        }
      />
      <Route
        path="customers"
        element={
          <AdminLayout>
            <Customers />
          </AdminLayout>
        }
      />
      <Route
        path="vendors"
        element={
          <AdminLayout>
            <Vendors />
          </AdminLayout>
        }
      />
      <Route
        path="analytics"
        element={
          <AdminLayout>
            <Analytics />
          </AdminLayout>
        }
      />
      <Route
        path="settings"
        element={
          <AdminLayout>
            <Settings />
          </AdminLayout>
        }
      />
      <Route
        path="reviews"
        element={
          <AdminLayout>
            <Reviews />
          </AdminLayout>
        }
      />
    </Routes>
  );
};
=======
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Reviews from "./pages/Reviews";
import CMS from "./pages/CMS";
import Coupons from "./pages/Coupons";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const { admin } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={!admin ? <Login /> : <Navigate to="/" />}
        />

        {/* Admin-Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/adminpanel" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product/:id?" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to={admin ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
>>>>>>> a7cee864a0040b35f73a5d6d8a7b9e8c80880776

export default App;
