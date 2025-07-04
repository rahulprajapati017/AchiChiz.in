import React, { useState } from "react";

const ReturnRefundPage = () => {
  const [returnReason, setReturnReason] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [customReturnReason, setCustomReturnReason] = useState("");
  const [customRefundReason, setCustomRefundReason] = useState("");
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      returnReason: returnReason === "Other" ? customReturnReason : returnReason,
      refundReason: refundReason === "Other" ? customRefundReason : refundReason,
      feedback,
      file,
    };

    console.log("Submitted form data:", formData);
    alert("Return/Refund request submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Return & Refund Request</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Return Reason */}
        <div>
          <label className="block font-medium mb-1">Select Return Reason:</label>
          <select
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Choose a reason --</option>
            <option value="Wrong Item Received">Wrong Item Received</option>
            <option value="Item Damaged">Item Damaged</option>
            <option value="Not as Described">Not as Described</option>
            <option value="Other">Other</option>
          </select>
          {returnReason === "Other" && (
            <input
              type="text"
              placeholder="Enter your custom return reason"
              value={customReturnReason}
              onChange={(e) => setCustomReturnReason(e.target.value)}
              className="mt-2 w-full border rounded px-3 py-2"
            />
          )}
        </div>

        {/* Refund Reason */}
        <div>
          <label className="block font-medium mb-1">Select Refund Reason:</label>
          <select
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Choose a reason --</option>
            <option value="Amount Not Received">Amount Not Received</option>
            <option value="Refund Delay">Refund Delay</option>
            <option value="Other">Other</option>
          </select>
          {refundReason === "Other" && (
            <input
              type="text"
              placeholder="Enter your custom refund reason"
              value={customRefundReason}
              onChange={(e) => setCustomRefundReason(e.target.value)}
              className="mt-2 w-full border rounded px-3 py-2"
            />
          )}
        </div>

        {/* Upload Photo */}
        <div>
          <label className="block font-medium mb-1">Upload Photo (Optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Feedback */}
        <div>
          <label className="block font-medium mb-1">Feedback (Optional):</label>
          <textarea
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us more about your experience..."
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Policy Link */}
        <div className="text-sm text-gray-600">
          By submitting this form, you agree to our{" "}
          <a
            href="/return-refund-policy"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Return & Refund Policy
          </a>.
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ReturnRefundPage;
