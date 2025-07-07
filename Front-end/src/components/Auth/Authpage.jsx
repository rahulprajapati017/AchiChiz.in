import React, { useState, useEffect, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext, AuthProvider, useAuth } from "../../context/AuthContext";
import { auth } from "../../data/allapi";
import OTPPage from "./OtpPage";
// import { useAuth } from "../../context/AuthContext";


const AuthPage = ({ onSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpEmail, setOtpEmail] = useState(""); // ✅ new state to track email for OTP
  // const {usertoken}=useAuth()
  const {userdata,setuserdata,settoken}=useContext(AuthContext)
  

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "User",
  });

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "User",
    });
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

    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      return;
    }

    if (isSignup) {
      if (!formData.name || !formData.confirmPassword) {
        alert("Please fill all required fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await fetch(auth.SIGNUP_BY_EMAIL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            accountType: "User",
          }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          console.log("Signup successful:", data);
          setOtpEmail(formData.email); // ✅ store email
          setShowOtp(true);            // ✅ show OTP modal
        } else {
          alert(data.message || "Signup failed");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred during signup");
      }
    } else {
      try {
        const response = await fetch(auth.LOGIN_BY_EMAIL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const {data} = await response.json();
        const {user,token}=data
        
        // setuserdata({...user})
        settoken(token)
        console.log(token)
        console.log(user)

        if (response.ok) {
          login(data.name || "User");
          if (onSuccess) onSuccess();
        } else {
          alert(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
      }
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
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
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
              email={otpEmail} // ✅ pass email as prop
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
