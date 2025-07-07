import React, { useContext, useState, useEffect } from 'react';
import { Edit3, Save, X, Upload } from 'lucide-react';
import profile from '../assets/profile.jpg';
import { AuthContext } from "../context/AuthContext";
import { auth } from '../data/allapi';


const AccountInformation = () => {
  const { userdata, usertoken, setuserdata } = useContext(AuthContext);

  const defaultState = {
    name: userdata?.name || "",
    email: userdata?.email || "",
    mobileNumber: userdata?.mobileNumber || "",
    gender: userdata?.gender || "",
    dateOfBirth: userdata?.dateOfBirth?.slice(0, 10) || "",
    location: userdata?.location || "",
    alternativeMobileNumber: userdata?.alternativeMobileNumber || "",
    hintName: userdata?.hintName || "",
  };

  const [formData, setFormData] = useState(defaultState);
  const [initialData, setInitialData] = useState(defaultState);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    setFormData(defaultState);
    setInitialData(defaultState);
  }, [userdata]);

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

  const handleSave = async () => {
    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      if (profileImage) {
        form.append("image", profileImage);
      }

      const response = await fetch(auth.UPDATE_USER_DATA, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        body: form
      });
      console.log(response)

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setuserdata(data.data);
      setInitialData(formData);
      setIsEditing(false);
      setProfilePreview(null);
      setProfileImage(null);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setProfilePreview(null);
    setProfileImage(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
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
            src={profilePreview || userdata?.image || profile}
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

      {/* Form Fields */}
      <div className="bg-white/30 backdrop-blur-lg rounded-xl p-8 border border-white/40 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Mobile Number" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Email ID" name="email" type="email" value={formData.email} onChange={handleInputChange} isEditing={isEditing} disabled={true} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-sm"
              >
                <option value="">--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="px-4 py-3 bg-white/20 rounded-xl border border-white/30">
                {formData.gender || '- not added -'}
              </div>
            )}
          </div>

          <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Location" name="location" value={formData.location} onChange={handleInputChange} isEditing={isEditing} />
          <InputField label="Alternate Mobile" name="alternativeMobileNumber" value={formData.alternativeMobileNumber} onChange={handleInputChange} isEditing={isEditing} />
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


// InputField Component
const InputField = ({ label, name, value, onChange, isEditing, disabled = false, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none backdrop-blur-sm ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2 focus:ring-indigo-500'
        }`}
      />
    ) : (
      <div className="px-4 py-3 bg-white/20 rounded-xl border border-white/30">
        {value || '- not added -'}
      </div>
    )}
  </div>
);


export default AccountInformation;
