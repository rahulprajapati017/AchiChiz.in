
import React from "react";

const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", orders: 5, joined: "2023-12-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9123456780", orders: 2, joined: "2024-01-15" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", phone: "9988776655", orders: 7, joined: "2023-11-20" },
];

const Customers = ({ searchTerm = "" }) => {
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Customers Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.orders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;