import React, { useState } from "react";
import { Search, Eye, Trash2, X } from "lucide-react";

const dummyCustomers = [
  {
    id: 1,
    name: "Riya Sharma",
    email: "riya.sharma@gmail.com",
    phone: "9876543210",
    status: "Active",
    joined: "2024-11-03",
    avatar: "https://i.pravatar.cc/150?img=47",
    address: "Delhi, India",
  },
  {
    id: 2,
    name: "Amit Verma",
    email: "amit.v@gmail.com",
    phone: "9851247771",
    status: "Inactive",
    joined: "2023-09-12",
    avatar: "https://i.pravatar.cc/150?img=32",
    address: "Pune, India",
  },
  {
    id: 3,
    name: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    phone: "9991234567",
    status: "Active",
    joined: "2025-01-15",
    avatar: "https://i.pravatar.cc/150?img=12",
    address: "Mumbai, India",
  },
];

export default function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filtered = dummyCustomers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (customer) => setSelectedCustomer(customer);
  const closeModal = () => setSelectedCustomer(null);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Export CSV
          </button>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-4 py-2 rounded text-sm"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex items-center border px-3 py-2 rounded-md">
            <Search className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Avatar</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((c, i) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={c.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        c.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{c.joined}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openModal(c)}
                    >
                      <Eye size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <img
                src={selectedCustomer.avatar}
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">
                {selectedCustomer.name}
              </h3>
              <p className="text-gray-500 text-sm">{selectedCustomer.email}</p>
              <p className="text-gray-500 text-sm">{selectedCustomer.phone}</p>
              <p className="text-sm mt-3">
                Status:{" "}
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    selectedCustomer.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {selectedCustomer.status}
                </span>
              </p>
              <p className="text-sm">Address: {selectedCustomer.address}</p>
              <p className="text-sm">Joined: {selectedCustomer.joined}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
