import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import OTPPage from "./OtpPage";

const PasswordInput = ({ name, value, onChange, placeholder, show, setShow }) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300"
      required
    />
    <div
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      onClick={() => setShow(!show)}
    >
      {show ? <FiEyeOff /> : <FiEye />}
    </div>
  </div>
);

const AuthPage = ({ onSuccess }) => {
  const [mode, setMode] = useState("login"); // login | signup | forgot
  const [step, setStep] = useState("form"); // form | otp | reset
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendOtp = async () => {
    if (!form.email) return toast.error("Please enter your email");
    try {
      // Replace with real OTP API
      await fetch("https://reqres.in/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ email: form.email }),
        headers: { "Content-Type": "application/json" },
      });
      toast.success("OTP sent to your email!");
      setStep("otp");
      setShowOtpModal(true);
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpVerify = async (otpCode) => {
    try {
      // Replace with real OTP verify API
      await fetch("https://reqres.in/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otp: otpCode }),
        headers: { "Content-Type": "application/json" },
      });

      toast.success("OTP verified!");
      setShowOtpModal(false);

      if (mode === "forgot") {
        setStep("reset");
      } else if (mode === "signup") {
        localStorage.setItem("user", JSON.stringify({ name: form.name || "User" }));
        login(form.name || "User");
        onSuccess?.();
        resetAll();
      }
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  const handleLogin = () => {
    if (!form.email || !form.password) return toast.error("Enter credentials");
    localStorage.setItem("user", JSON.stringify({ name: form.name || "User" }));
    login(form.name || "User");
    toast.success("Login successful!");
    onSuccess?.();
    resetAll();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signup") {
      if (form.password !== form.confirmPassword) {
        return toast.error("Passwords do not match");
      }
      sendOtp();
    } else if (mode === "forgot") {
      sendOtp();
    } else {
      handleLogin();
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!form.password || !form.confirmPassword) return toast.error("Fill both fields");
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match");
    toast.success("Password reset successful!");
    resetAll();
  };

  const resetAll = () => {
    setMode("login");
    setStep("form");
    setShowOtpModal(false);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleGoogleLogin = () => {
    login("Google User");
    localStorage.setItem("user", JSON.stringify({ name: "Google User" }));
    toast.success("Google login successful!");
    onSuccess?.();
  };

  const title =
    mode === "signup"
      ? "SIGN UP"
      : mode === "forgot" && step === "reset"
      ? "RESET PASSWORD"
      : mode === "forgot"
      ? "FORGOT PASSWORD"
      : "SIGN IN";

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">{title}</h2>

      {mode === "forgot" && step === "reset" ? (
        <form className="space-y-4" onSubmit={handleResetPassword}>
          <PasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password*"
            show={showPassword}
            setShow={setShowPassword}
          />
          <PasswordInput
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password*"
            show={showConfirmPassword}
            setShow={setShowConfirmPassword}
          />
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 font-semibold rounded"
          >
            RESET PASSWORD
          </button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300"
              required
            />
          )}

          {(mode === "signup" || mode === "forgot" || mode === "login") && (
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300"
              required
            />
          )}

          {(mode === "signup" || mode === "login") && (
            <PasswordInput
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password*"
              show={showPassword}
              setShow={setShowPassword}
            />
          )}

          {mode === "signup" && (
            <PasswordInput
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password*"
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 font-semibold rounded"
          >
            {mode === "signup"
              ? "SIGN UP"
              : mode === "forgot"
              ? "SEND OTP"
              : "SIGN IN"}
          </button>

          {mode !== "forgot" && (
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold rounded"
            >
              {mode === "signup" ? "Sign up with Google" : "Sign in with Google"}
            </button>
          )}
        </form>
      )}

      {mode === "login" && (
        <div className="text-center mt-3">
          <button
            onClick={() => {
              setMode("forgot");
              setStep("form");
              setForm({ name: "", email: "", password: "", confirmPassword: "" });
            }}
            className="text-sm text-orange-700 underline"
          >
            Forgot Password?
          </button>
        </div>
      )}

      {mode !== "forgot" && (
        <p className="text-center text-sm mt-4 text-gray-700">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setStep("form");
                }}
                className="text-orange-700 underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  setStep("form");
                }}
                className="text-orange-700 underline"
              >
                Sign up
              </button>
            </>
          )}
        </p>
      )}

      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-4">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>
            <OTPPage
              onVerify={handleOtpVerify}
              onResend={sendOtp}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
