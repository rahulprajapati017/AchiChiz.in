// src/pages/Vendors.jsx
import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Pencil, Trash2, CheckCircle, Ban } from "lucide-react";

const initialVendors = [
  {
    id: 1,
    name: "Craft Villa",
    email: "contact@craftvilla.com",
    products: 120,
    status: "Approved",
  },
  {
    id: 2,
    name: "HandArt Studio",
    email: "handart@studio.com",
    products: 58,
    status: "Pending",
  },
  {
    id: 3,
    name: "Rural Roots",
    email: "info@ruralroots.in",
    products: 87,
    status: "Suspended",
  },
];

const Vendors = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [editVendor, setEditVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditVendor((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    setVendors((prev) =>
      prev.map((v) => (v.id === editVendor.id ? editVendor : v))
    );
    setEditVendor(null);
  };

  const deleteVendor = (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      setVendors((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status:
                v.status === "Approved"
                  ? "Suspended"
                  : v.status === "Suspended"
                  ? "Approved"
                  : "Approved",
            }
          : v
      )
    );
  };

  const filteredVendors = vendors.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Vendors Management</h2>

      <div className="flex items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="px-4 py-2 border rounded-lg shadow"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg shadow"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Vendor Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Products</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{vendor.name}</td>
                <td className="px-4 py-2">{vendor.email}</td>
                <td className="px-4 py-2">{vendor.products}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                      vendor.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : vendor.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2 items-center">
                  <button onClick={() => toggleStatus(vendor.id)} title="Toggle Status">
                    {vendor.status === "Approved" ? (
                      <Ban size={16} className="text-red-600" />
                    ) : (
                      <CheckCircle size={16} className="text-green-600" />
                    )}
                  </button>
                  <button onClick={() => setEditVendor(vendor)}>
                    <Pencil size={16} className="text-blue-600" />
                  </button>
                  <button onClick={() => deleteVendor(vendor.id)}>
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Transition appear show={!!editVendor} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setEditVendor(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-bold mb-4">Edit Vendor</Dialog.Title>
                <div className="space-y-3">
                  <input
                    name="name"
                    value={editVendor?.name || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    name="email"
                    value={editVendor?.email || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    name="products"
                    type="number"
                    value={editVendor?.products || 0}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <select
                    name="status"
                    value={editVendor?.status || "Pending"}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                  </select>
                </div>
                <div className="mt-4 text-right space-x-2">
                  <button onClick={() => setEditVendor(null)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                  <button onClick={saveEdit} className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Vendors;
