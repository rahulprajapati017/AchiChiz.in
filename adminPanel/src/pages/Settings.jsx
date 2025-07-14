<<<<<<< HEAD

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
=======
import { useState } from "react";
import Layout from "../components/Layout";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteTitle: "Handicraft Bazaar",
    supportEmail: "support@handicraft.com",
    contactPhone: "+91 9876543210",
    facebook: "https://facebook.com/handicraft",
    instagram: "https://instagram.com/handicraft",
    footerText: "© 2025 Handicraft Bazaar. All rights reserved.",
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("✅ Settings saved (currently only in local state)");
    // TODO: Send data to backend via API
  };

  return (
    <Layout>
      <div className="max-w-3xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-[#0f2c5c]">⚙️ Site Settings</h2>

        <form onSubmit={(e) => e.preventDefault()} className="grid gap-5">
          <div>
            <label className="block font-medium mb-1">Site Title</label>
            <input
              name="siteTitle"
              value={settings.siteTitle}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Support Email</label>
            <input
              name="supportEmail"
              value={settings.supportEmail}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Contact Number</label>
            <input
              name="contactPhone"
              value={settings.contactPhone}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Facebook Link</label>
            <input
              name="facebook"
              value={settings.facebook}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Instagram Link</label>
            <input
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Footer Text</label>
            <textarea
              name="footerText"
              rows={3}
              value={settings.footerText}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </Layout>
>>>>>>> a7cee864a0040b35f73a5d6d8a7b9e8c80880776
  );
};

export default Settings;
