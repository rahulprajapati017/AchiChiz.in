import React, { useState, useEffect, useContext } from "react";
import {
  User,
  Home,
  MapPin,
  ShoppingBag,
  Heart,
  Menu,
  X as CloseIcon,
  LogOut,
} from "lucide-react";

import AddressBook from "../components/addressbook";
import Wishlist from "../pages/Favpage";
import MyOrders from "../components/myOrder";
import AccountInformation from "../components/accountInfo";
import AccountDashboard from "../components/accountdashboard";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../data/allapi";

const Dashboard = () => {
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [userdata, setUserdata] = useState(null);
  const { usertoken } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!usertoken) return;

      try {
        const response = await fetch(auth.GET_USER_PROFILE, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${usertoken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserdata(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [usertoken]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "info", label: "Account Info", icon: User },
    { key: "address", label: "Address Book", icon: MapPin },
    { key: "orders", label: "My Orders", icon: ShoppingBag },
    { key: "wishlist", label: "Wishlist", icon: Heart },
  ];

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  if (!userdata) {
    return <div className="text-center py-10">Loading user data...</div>;
  }

  return (
    <div className="min-h-screen mt-27 bg-white dark:from-[#1a1a1a] dark:to-[#2a2a2a] transition-all overflow-x-hidden">
      {isMobile && (
        <div className="flex justify-between items-center p-4 shadow-md bg-white/70 dark:bg-black/30 backdrop-blur-md sticky top-0 z-40">
          <h1 className="text-xl font-bold text-[#0f2c5c] dark:text-white">
            My Dashboard
          </h1>
          <button
            className="bg-indigo-600 text-white p-2 rounded"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        <aside
          className={`${
            sidebarOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
          } fixed mt-8 md:relative z-30 top-0 left-0 h-full md:h-screen w-64 bg-white/30 dark:bg-black/30 backdrop-blur-xl shadow border-r border-white/20 p-6 transition-transform duration-300 flex flex-col justify-between md:sticky md:top-0`}
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img
                src={userdata.image}
                alt="User"
                className="w-12 h-12 rounded-full shadow-lg border-2 border-white/70"
              />
              <div>
                <p className="text-sm font-semibold text-[#0f2c5c] dark:text-white">
                  {userdata.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {userdata.email}
                </p>
              </div>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="ml-auto"
                >
                  <CloseIcon className="text-gray-600 dark:text-white" />
                </button>
              )}
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setSection(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium transition-all group ${
                    section === item.key
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-[1.02]"
                      : "bg-white/40 text-[#0f2c5c] dark:text-white hover:bg-yellow-300/60 hover:text-indigo-700"
                  }`}
                >
                  <item.icon
                    size={18}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-6 px-4 py-2 w-full text-sm font-medium text-red-600 bg-red-100 hover:bg-red-500 hover:text-white rounded-xl transition"
          >
            <LogOut
              size={18}
              className="group-hover:rotate-[-10deg] transition"
            />
            Logout
          </button>
        </aside>

        <main className="flex-1 p-4 md:p-8 transition-all">
          <div className="bg-white/40 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/30 transition-all">
            {section === "info" && <AccountInformation />}
            {section === "dashboard" && <AccountDashboard />}
            {section === "address" && (
              <>
                <h2 className="text-2xl font-bold text-[#0f2c5c] mb-4">
                  Address Book
                </h2>
                <AddressBook />
              </>
            )}
            {section === "orders" && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="text-[#0f2c5c]" />
                  <h2 className="text-2xl font-bold text-[#0f2c5c]">
                    My Orders
                  </h2>
                </div>
                <MyOrders />
              </>
            )}
            {section === "wishlist" && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="text-[#0f2c5c]" />
                  <h2 className="text-2xl font-bold text-[#0f2c5c]">
                    My Wishlist
                  </h2>
                </div>
                <Wishlist />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
