// src/pages/admin/Orders.jsx
import React, { useState } from "react";

const initialOrders = [
  {
    id: "ORD001",
    customer: "Ravi Sharma",
    date: "2025-06-28",
    status: "Pending",
    total: "₹1,200",
  },
  {
    id: "ORD002",
    customer: "Priya Mehta",
    date: "2025-06-27",
    status: "Shipped",
    total: "₹980",
  },
  {
    id: "ORD003",
    customer: "Amit Gupta",
    date: "2025-06-26",
    status: "Delivered",
    total: "₹1,750",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-600 border-b">
            <tr>
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-2 font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.total}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}