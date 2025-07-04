// src/App.jsx
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
    </Routes>
  );
};

export default App;
