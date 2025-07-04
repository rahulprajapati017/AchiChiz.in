import React, { useState } from 'react';
import { Edit3, Save, X, Upload } from 'lucide-react';
import profile from '../assets/profile.jpg'; // Update this if needed

const AccountInformation = () => {
  const initialState = {
    fullName: 'raj',
    mobileNumber: '8949952520',
    emailId: 'rajjangam51@gmail.com',
    gender: 'MALE',
    dateOfBirth: '',
    location: '',
    alternateMobile: '',
    hintName: ''
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [initialData, setInitialData] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setInitialData(formData);
    // You can add API saving logic here
  };

  const handleCancel = () => {
    setFormData(initialData);
    setProfilePreview(null);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">👤 Account Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-xl transition-all shadow-md"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative group">
          <img
            src={profilePreview || profile}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
              <Upload className="w-4 h-4 text-indigo-600" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </div>
        <p className="text-sm text-gray-600">Tap icon to change photo</p>
      </div>

      {/* Form */}
      <div className="bg-[#F6F5F5] backdrop-blur-xl  border border-white/40 shadow-2xl p-10 transition-all">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Mobile Number" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Email ID" name="emailId" type="email" value={formData.emailId} onChange={handleInputChange} isEditing={isEditing} />

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            ) : (
              <div className="px-4 py-3 bg-[#F6F5F5] border border-white/40 rounded-xl">
                {formData.gender}
              </div>
            )}
          </div>

          <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Location" name="location" value={formData.location} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Alternate Mobile" name="alternateMobile" type="tel" value={formData.alternateMobile} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Hint Name" name="hintName" value={formData.hintName} onChange={handleInputChange} isEditing={isEditing} />
        </div>

        {/* Buttons */}
        {isEditing && (
          <div className="flex justify-end mt-10 gap-4">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 shadow"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const InputField = ({ label, name, value, onChange, isEditing, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    ) : (
      <div className="px-4 py-3 bg-white/30 border border-white/40 rounded-xl text-gray-700">
        {value || '- not added -'}
      </div>
    )}
  </div>
);

export default AccountInformation;
