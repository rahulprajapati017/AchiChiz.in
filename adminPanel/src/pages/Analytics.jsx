// src/pages/Analytics.jsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

const rawBarData = {
  Week: [
    { month: "Mon", revenue: 3200 },
    { month: "Tue", revenue: 4800 },
    { month: "Wed", revenue: 3600 },
    { month: "Thu", revenue: 5200 },
    { month: "Fri", revenue: 4300 },
  ],
  Month: [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 14500 },
    { month: "Apr", revenue: 20000 },
    { month: "May", revenue: 17500 },
  ],
  Year: [
    { month: "2020", revenue: 80000 },
    { month: "2021", revenue: 95000 },
    { month: "2022", revenue: 103000 },
    { month: "2023", revenue: 112000 },
    { month: "2024", revenue: 125000 },
  ]
};

const pieData = [
  { name: "Online", value: 65 },
  { name: "In-store", value: 25 },
  { name: "Reseller", value: 10 },
];

const vendorProductData = [
  { name: "Craft Villa", products: 120 },
  { name: "Rural Roots", products: 87 },
  { name: "HandArt Studio", products: 58 },
];

const COLORS = ["#34d399", "#60a5fa", "#fbbf24"];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("Month");

  const barData = rawBarData[timeRange];

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold text-gray-800">Analytics Dashboard</h2>
        <select
          className="px-3 py-1 border rounded shadow"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="Week">This Week</option>
          <option value="Month">This Month</option>
          <option value="Year">This Year</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue by {timeRange}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Vendors by Product Count</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={vendorProductData} margin={{ left: 50 }}>
            <XAxis type="number" stroke="#888" />
            <YAxis type="category" dataKey="name" stroke="#888" />
            <Tooltip />
            <Bar dataKey="products" fill="#60a5fa" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Channels</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;