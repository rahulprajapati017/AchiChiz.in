
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Settings = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("siteSettings");
    return (
      saved
        ? JSON.parse(saved)
        : {
            siteName: "AchiChiz Handicrafts",
            currency: "INR",
            email: "admin@achichiz.com",
            shippingRate: "₹50",
            taxRate: "18%",
            maintenanceMode: false,
            emailNotifications: true,
            logo: null,
            banner: null,
            themeColor: "#3b82f6",
            fontFamily: "Inter"
          }
    );
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  useEffect(() => {
    localStorage.setItem("siteSettings", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      if (name === "logo") setLogoPreview(previewUrl);
      if (name === "banner") setBannerPreview(previewUrl);
      setFormData((prev) => ({ ...prev, [name]: file.name }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("✅ Settings saved successfully!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">🛠️ Site Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
       
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">General</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Currency</label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Contact & Shipping</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contact Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Rate</label>
              <input
                type="text"
                name="shippingRate"
                value={formData.shippingRate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Tax Rate</label>
              <input
                type="text"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Theme</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Primary Color</label>
              <input
                type="color"
                name="themeColor"
                value={formData.themeColor}
                onChange={handleChange}
                className="w-16 h-10 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Font Family</label>
              <select
                name="fontFamily"
                value={formData.fontFamily}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>
          </div>
        </div>

      
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Site Logo</label>
              <input type="file" name="logo" accept="image/*" onChange={handleChange} className="w-full text-sm" />
              {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 h-16 rounded" />}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Home Banner</label>
              <input type="file" name="banner" accept="image/*" onChange={handleChange} className="w-full text-sm" />
              {bannerPreview && <img src={bannerPreview} alt="Banner Preview" className="mt-2 h-16 rounded" />}
            </div>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input type="checkbox" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleChange} className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700">Enable Maintenance Mode</span>
            </label>

            <label className="flex items-center space-x-3">
              <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700">Enable Email Notifications</span>
            </label>
          </div>
        </div>

        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            💾 Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
