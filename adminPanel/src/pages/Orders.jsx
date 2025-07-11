<<<<<<< HEAD

import React from "react";

const mockOrders = [
  { id: 101, customer: "John Doe", product: "Handmade Vase", amount: 1200, status: "Delivered", date: "2024-06-01" },
  { id: 102, customer: "Jane Smith", product: "Bamboo Basket", amount: 800, status: "Pending", date: "2024-06-02" },
  { id: 103, customer: "Amit Kumar", product: "Clay Pot", amount: 500, status: "Shipped", date: "2024-06-03" },
];

const Orders = ({ searchTerm = "" }) => {
  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (₹)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
=======
// src/pages/Orders.jsx
import { useState } from "react";
import { demoOrders } from "../data/demo";
import Layout from "../components/Layout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";

const Orders = () => {
  const [orders, setOrders] = useState(demoOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [viewOrder, setViewOrder] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            status: newStatus,
            statusHistory: [
              ...(order.statusHistory || []),
              { status: newStatus, date: new Date().toISOString().split("T")[0] },
            ],
          }
        : order
    );
    setOrders(updatedOrders);
  };

  const handleCheckbox = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (
      selectedOrders.length &&
      window.confirm(`Delete ${selectedOrders.length} selected orders?`)
    ) {
      setOrders(orders.filter((order) => !selectedOrders.includes(order.id)));
      setSelectedOrders([]);
    }
  };

  const exportToPDF = () => {
    const input = document.getElementById("orders-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("orders.pdf");
    });
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(orders);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    link.click();
  };

  const filteredOrders = orders.filter(
    (order) =>
      (order.user.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter ? order.status === statusFilter : true)
  );

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#0f2c5c]">📦 All Orders</h2>

          <div className="flex gap-2">
            <button onClick={exportToPDF} className="bg-red-600 text-white px-3 py-1 rounded">
              Export PDF
            </button>
            <button onClick={exportToCSV} className="bg-green-600 text-white px-3 py-1 rounded">
              Export CSV
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={selectedOrders.length === 0}
              className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Delete Selected
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search by user or order ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/4"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg" id="orders-table">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length}
                    onChange={(e) =>
                      setSelectedOrders(
                        e.target.checked ? orders.map((o) => o.id) : []
                      )
                    }
                  />
                </th>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">👤 Customer</th>
                <th className="p-3 border">🛍️ Products</th>
                <th className="p-3 border">💳 Total</th>
                <th className="p-3 border">📦 Status</th>
                <th className="p-3 border">💰 Payment</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t text-center hover:bg-gray-50">
                  <td className="p-3 border">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleCheckbox(order.id)}
                    />
                  </td>
                  <td className="p-3 border font-medium text-gray-800">{order.id}</td>
                  <td className="p-3 border">{order.user}</td>
                  <td className="p-3 border">{order.products.join(", ")}</td>
                  <td className="p-3 border font-semibold text-green-700">₹{order.total}</td>
                  <td className="p-3 border">
                    <select
                      className={`border rounded px-2 py-1 ${statusColor(order.status)}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td
                    className={`p-3 border font-medium ${
                      order.paymentStatus === "Paid"
                        ? "text-green-600"
                        : order.paymentStatus === "Refunded"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </td>
                  <td className="p-3 border space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setViewOrder(order)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => {
                        if (window.confirm("Delete this order?"))
                          setOrders(orders.filter((o) => o.id !== order.id));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {viewOrder && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                onClick={() => setViewOrder(null)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <p><strong>Order ID:</strong> {viewOrder.id}</p>
              <p><strong>Customer:</strong> {viewOrder.user}</p>
              <p><strong>Products:</strong> {viewOrder.products.join(", ")}</p>
              <p><strong>Total:</strong> ₹{viewOrder.total}</p>
              <p><strong>Status:</strong> {viewOrder.status}</p>
              <p><strong>Payment:</strong> {viewOrder.paymentStatus}</p>
              {viewOrder.refunded && viewOrder.refund && (
                <p className="text-sm text-yellow-600">
                  Refunded ₹{viewOrder.refund.amount} on {viewOrder.refund.date}
                </p>
              )}
              {viewOrder.statusHistory && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-1">Status History:</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-4">
                    {viewOrder.statusHistory.map((item, i) => (
                      <li key={i}>{item.status} on {item.date}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
>>>>>>> a7cee864a0040b35f73a5d6d8a7b9e8c80880776
  );
};

export default Orders;