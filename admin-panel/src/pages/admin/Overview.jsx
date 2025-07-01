// src/pages/admin/Overview.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 21000 },
  { month: "Mar", revenue: 8000 },
  { month: "Apr", revenue: 16000 },
  { month: "May", revenue: 19000 },
  { month: "Jun", revenue: 24000 },
];

const orderTrendData = [
  { month: "Jan", orders: 320 },
  { month: "Feb", orders: 410 },
  { month: "Mar", orders: 290 },
  { month: "Apr", orders: 390 },
  { month: "May", orders: 520 },
  { month: "Jun", orders: 610 },
];

const categorySalesData = [
  { name: "Pottery", value: 400 },
  { name: "Textiles", value: 300 },
  { name: "Woodcraft", value: 300 },
  { name: "Jewelry", value: 200 },
];

const COLORS = ["#fb923c", "#fbbf24", "#34d399", "#60a5fa"];

export default function Overview() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <h3 className="text-sm text-gray-500">Total Orders</h3>
          <p className="text-2xl font-semibold text-orange-600">1,245</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <h3 className="text-sm text-gray-500">Total Products</h3>
          <p className="text-2xl font-semibold text-orange-600">320</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <h3 className="text-sm text-gray-500">Customers</h3>
          <p className="text-2xl font-semibold text-orange-600">860</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <h3 className="text-sm text-gray-500">Monthly Revenue</h3>
          <p className="text-2xl font-semibold text-orange-600">₹98,000</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#fb923c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Order Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Category-wise Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categorySalesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categorySalesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
