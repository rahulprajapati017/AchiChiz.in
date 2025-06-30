import React, { useState } from 'react';
import { Edit3, Save, X, Upload } from 'lucide-react';
import profile from '../assets/profile.jpg'; // Replace with your profile image path

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    // Save to backend here if needed
  };

  const handleCancel = () => {
    setFormData(initialData);
    setProfilePreview(null); // Optionally reset preview
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Edit3 className="h-4 w-4" />
          <span>{isEditing ? 'Cancel' : 'Edit'}</span>
        </button>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white/40 backdrop-blur-md">
          <img
            src={profilePreview || profile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {isEditing && (
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
            <Upload className="w-4 h-4" />
            <span>Change Photo</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        )}
      </div>

      {/* Form */}
      <div className="bg-white/30 backdrop-blur-lg rounded-xl p-8 border border-white/40 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Mobile Number" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Email ID" name="emailId" type="email" value={formData.emailId} onChange={handleInputChange} isEditing={isEditing} />

          {/* Gender Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-sm"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            ) : (
              <div className="px-4 py-3 bg-white/20 rounded-xl border border-white/30">
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
          <div className="flex justify-end space-x-4 mt-8">
            <button onClick={handleCancel} className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 shadow-lg">
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button onClick={handleSave} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 shadow-lg">
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, name, value, onChange, isEditing, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none backdrop-blur-sm"
      />
    ) : (
      <div className="px-4 py-3 bg-white/20 rounded-xl border border-white/30">
        {value || '- not added -'}
      </div>
    )}
  </div>
);

export default AccountInformation;
