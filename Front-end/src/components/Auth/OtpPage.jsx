import React, { useState, useRef, useEffect } from "react";

const OTPPage = ({ onVerify, onResend }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setOtp(["", "", "", "", "", ""]);
      setTimer(60);
      onResend && onResend();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      onVerify && onVerify(enteredOtp);
    } else {
      alert("Please enter a complete 6-digit OTP.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">Verify OTP</h2>
      <p className="text-center text-sm text-gray-600 mb-4">
        Enter the 6-digit code sent to your phone/email.
      </p>

      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 border border-gray-300 text-center text-xl rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 font-semibold rounded"
      >
        Verify OTP
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        {timer > 0 ? (
          <>Resend OTP in <span className="font-semibold">{timer}s</span></>
        ) : (
          <button
            onClick={handleResend}
            className="text-orange-600 hover:underline font-medium"
          >
            Resend OTP
          </button>
        )}
      </p>
    </div>
  );
};

export default OTPPage;
