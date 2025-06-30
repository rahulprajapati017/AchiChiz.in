import React, { useState } from "react";
import AddressBook from "../components/addressbook";
import Wishlist from "../pages/Favpage";
import MyOrders from "../components/myOrder";
import AccountInformation from "../components/accountInfo";
import AccountDashboard from "../components/accountdashboard";
const Dashboard = () => {
  const [section, setSection] = useState("dashboard");
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "raj",
    phone: "8949952520",
    email: "rajjangam51@gmail.com",
    gender: "MALE",
    dob: "- not added -",
    location: "- not added -",
    altMobile: "- not added -",
    hintName: "- not added -",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const [addressInfo, setAddressInfo] = useState({
    contactName: "Alex Driver",
    contactEmail: "ExampleAddress@gmail.com",
    billingAddress: "",
    shippingAddress: "",
  });

  const [editingAddressField, setEditingAddressField] = useState(null);

  const handleAddressChange = (e) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-gray-500 mb-2">Home / My Dashboard</p>
        <h1 className="text-3xl font-bold mb-8 text-[#0f2c5c]">My Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className=" shadow-[8px_8px_0px_#d1cdc7,-8px_-8px_0px_#fff] bg-[#f0eae0] p-2">
              {[
                { key: "dashboard", label: "Account Dashboard" },
                { key: "info", label: "Account Information" },
                { key: "address", label: "Address Book" },
                { key: "orders", label: "My Orders" },
                { key: "wishlist", label: "My Wishlist" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSection(item.key)}
                  className={`block w-full text-left px-4 py-3  my-1 transition font-medium text-sm ${
                    section === item.key
                      ? "bg-[#0f2c5c] text-white shadow-md"
                      : "bg-white/60 text-[#0f2c5c] hover:bg-gradient-to-r from-amber-700 to-orange-500 hover:scale-105"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="backdrop-blur-xl bg-white  p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] border border-white/30 transition-all">
              {section === "dashboard" && (
                <>
                  <AccountDashboard/>
                  </>)}

              {section === "info" && (
                <>
                <AccountInformation/>
                </>
              )}

              {section === "address" && (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#0f2c5c]">My Address</h1>
                  </div>
                  <AddressBook
                    addressInfo={addressInfo}
                    editingField={editingAddressField}
                    setEditingField={setEditingAddressField}
                    handleChange={handleAddressChange}
                  />
                </>
              )}

              {section === "orders" && (
                <>
                <MyOrders/>
                </>
              )}

              {section === "wishlist" && (
                <>
                  <h1 className="text-3xl font-extrabold mb-6 text-[#0f2c5c]">My Wishlist</h1>
                  <Wishlist />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
