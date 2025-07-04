import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
<<<<<<< HEAD
import { toast } from "react-hot-toast";
=======
import { useAuth } from "../../context/AuthContext";
import OTPPage from "./OtpPage"; // ✅ adjust path if needed
>>>>>>> refs/remotes/origin/main

const AuthPage = ({ onSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
    window.dispatchEvent(new Event("storage")); // Force sync for all tabs/components
    toast.success("Login successful!");
=======
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // ✅ Signup flow → go to OTP page
      setShowOtp(true);
    } else {
      // ✅ Login flow → directly login
      login("John Doe");
      if (onSuccess) onSuccess();
    }
  };

  const handleOtpVerify = (otpCode) => {
    console.log("OTP Verified:", otpCode);
    login("John Doe");
    setShowOtp(false);
    if (onSuccess) onSuccess();
  };

  const handleGoogleLogin = () => {
    login("Google User");
>>>>>>> refs/remotes/origin/main
    if (onSuccess) onSuccess();
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        {isSignup ? "SIGN UP" : "SIGN IN"}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name*"
          className="w-full px-4 py-2 border border-gray-300"
          required
        />

        {isSignup && (
          <input
            type="email"
            placeholder="Email*"
            className="w-full px-4 py-2 border border-gray-300"
            required
          />
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password*"
            className="w-full px-4 py-2 border border-gray-300"
            required
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {isSignup && (
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password*"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 font-semibold rounded"
        >
          {isSignup ? "SIGN UP" : "SIGN IN"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold rounded"
        >
          {isSignup ? "Sign up with Google" : "Sign in with Google"}
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-gray-700">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setIsSignup(false)}
              className="text-orange-700 underline"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <button
              onClick={() => setIsSignup(true)}
              className="text-orange-700 underline"
            >
              Sign up
            </button>
          </>
        )}
      </p>

      <p className="text-center text-sm mt-2 text-gray-700">
        Want to sell on ACHICHIZ?{" "}
        <button
          onClick={() => alert("Switch to Seller Login")}
          className="text-orange-700 underline"
        >
          Switch to Seller Login
        </button>
      </p>

      {/* ✅ OTP MODAL shown only after signup */}
      {showOtp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-4">
            <button
              onClick={() => setShowOtp(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>
            <OTPPage
              onVerify={handleOtpVerify}
              onResend={() => console.log("Resend OTP clicked")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
