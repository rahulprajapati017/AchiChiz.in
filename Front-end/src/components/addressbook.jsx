import React, { useState } from 'react';
import { Plus, Edit3, Trash2, MapPin, Home, Briefcase } from 'lucide-react';

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'Home Address',
      fullName: 'Raj Jangam',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '8949952520',
      isDefault: true,
    },
    {
      id: 2,
      type: 'work',
      name: 'Office Address',
      fullName: 'Raj Jangam',
      address: '456 Business Park, Floor 3',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      phone: '8949952520',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home': return Home;
      case 'work': return Briefcase;
      default: return MapPin;
    }
  };

  const getAddressColor = (type) => {
    switch (type) {
      case 'home': return 'bg-blue-500';
      case 'work': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
     
      <div className="flex justify-between items-center">
        
        <button
          onClick={() => {
            setEditAddress(null);
            setShowAddForm(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white  hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Address</span>
        </button>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => {
          const Icon = getAddressIcon(address.type);
          return (
            <div key={address.id} className="bg-white/30 backdrop-blur-lg  p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Address Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getAddressColor(address.type)} shadow-md`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditAddress(address);
                      setShowAddForm(true);
                    }}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      setAddresses((prev) => prev.filter((a) => a.id !== address.id))
                    }
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">{address.fullName}</p>
                <p>{address.address}</p>
                <p>{address.city}, {address.state} - {address.pincode}</p>
                <p className="font-medium">Phone: {address.phone}</p>
              </div>
            </div>
          );
        })}
      </div>

      
      {showAddForm && (
        <div className="fixed mt-40 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {editAddress ? "Edit Address" : "Add New Address"}
            </h3>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updated = {
                  id: editAddress?.id || Date.now(),
                  type: formData.get("type"),
                  name:
                    formData.get("type") === "home"
                      ? "Home Address"
                      : formData.get("type") === "work"
                      ? "Office Address"
                      : "Other Address",
                  fullName: formData.get("fullName"),
                  address: formData.get("address"),
                  city: formData.get("city"),
                  state: formData.get("state"),
                  pincode: formData.get("pincode"),
                  phone: formData.get("phone"),
                  isDefault: formData.get("default") === "on",
                };

                if (editAddress) {
                  setAddresses((prev) =>
                    prev.map((a) => (a.id === editAddress.id ? updated : a))
                  );
                } else {
                  setAddresses((prev) => [...prev, updated]);
                }

                setShowAddForm(false);
                setEditAddress(null);
              }}
            >
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                <select
                  name="type"
                  defaultValue={editAddress?.type || "home"}
                  className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  name="fullName"
                  defaultValue={editAddress?.fullName || ""}
                  type="text"
                  className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  defaultValue={editAddress?.address || ""}
                  className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  rows="3"
                ></textarea>
              </div>

             
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    name="city"
                    defaultValue={editAddress?.city || ""}
                    type="text"
                    className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    name="state"
                    defaultValue={editAddress?.state || ""}
                    type="text"
                    className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

             
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    name="pincode"
                    defaultValue={editAddress?.pincode || ""}
                    type="text"
                    className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    name="phone"
                    defaultValue={editAddress?.phone || ""}
                    type="tel"
                    className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="default"
                  defaultChecked={editAddress?.isDefault || false}
                  id="default"
                  className="rounded"
                />
                <label htmlFor="default" className="text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

             
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditAddress(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white  hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
                >
                  {editAddress ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
