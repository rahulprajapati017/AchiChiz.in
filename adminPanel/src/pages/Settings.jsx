
import React from "react";

const mockSettings = [
  { id: 1, setting: "Site Name", value: "AchiChiz", description: "The name of the website" },
  { id: 2, setting: "Admin Email", value: "admin@achichiz.in", description: "Contact email for admin" },
  { id: 3, setting: "Currency", value: "INR", description: "Default currency for transactions" },
  { id: 4, setting: "Theme", value: "Light", description: "Current theme mode" },
];

const Settings = ({ searchTerm = "" }) => {
  const filteredSettings = mockSettings.filter(
    (item) =>
      item.setting.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSettings.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.setting}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
