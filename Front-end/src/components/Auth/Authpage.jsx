import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";

const AuthPage = ({ onSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
    window.dispatchEvent(new Event("storage")); // Force sync for all tabs/components
    toast.success("Login successful!");
    if (onSuccess) onSuccess();
  };

  return (
    <div className="p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
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

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 font-semibold"
        >
          {isSignup ? "SIGN UP" : "SIGN IN"}
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
    </div>
  );
};

export default AuthPage;
