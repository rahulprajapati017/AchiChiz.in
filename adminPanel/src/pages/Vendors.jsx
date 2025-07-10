
import React from "react";

const mockVendors = [
  { id: 1, name: "Craft Villa", email: "craftvilla@vendor.com", products: 120, rating: 4.8, joined: "2022-10-01" },
  { id: 2, name: "Rural Roots", email: "ruralroots@vendor.com", products: 87, rating: 4.5, joined: "2023-03-12" },
  { id: 3, name: "HandArt Studio", email: "handart@vendor.com", products: 58, rating: 4.2, joined: "2023-07-25" },
];

const Vendors = ({ searchTerm = "" }) => {
  const filteredVendors = mockVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.joined.includes(searchTerm)
  );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Vendors Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.products}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500 font-bold">{vendor.rating} ★</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;
