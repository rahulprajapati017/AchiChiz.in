import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../data/allapi";

const AuthPage = ({ onSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "",
    });
    // Reset password visibility on mode change
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [isSignup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }

        response = await fetch(auth.SIGNUP_BY_EMAIL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Signup failed");

        const result = await response.json();

        login(result.name || "John Doe");
        console.log(result)

        alert("Signup successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          accountType: "",
        });

        if (onSuccess) onSuccess();
      } else {
        response = await fetch(auth.LOGIN_BY_EMAIL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) throw new Error("Login failed");

        const result = await response.json();
        console.log("login result ",result)
        login(result.name || "John Doe");

        alert("Login successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          accountType: "",
        });

        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error(error.message);
      alert("Error: " + error.message);
    }
  };

  const handleGoogleLogin = () => {
    // Replace with actual Google OAuth logic
    login("Google User");
    if (onSuccess) onSuccess();
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        {isSignup ? "SIGN UP" : "SIGN IN"}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
       

        {isSignup && (
          <input
            type="text"
            placeholder="Name*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        )}

        <input
          type="email"
          placeholder="Email*"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password*"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Confirm Password Input */}
        {isSignup && (
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password*"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        )}

        {isSignup && (
          <div className="relative">
            <select
              value={formData.accountType}
              name="accountType"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Account Type*</option>
              <option value="Seller">Seller</option>
              <option value="User">User</option>
            </select>
            
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
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 font-semibold"
        >
          {isSignup ? "SIGN UP" : "SIGN IN"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold"
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
              type="button"
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
              type="button"
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
    </div>
  );
};

export default AuthPage;
