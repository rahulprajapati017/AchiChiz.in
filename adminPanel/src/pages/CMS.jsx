// src/pages/CMS.jsx
import { useState } from "react";
import Layout from "../components/Layout";
// Optional: Uncomment if using toast
// import { toast } from "react-hot-toast";

const CMS = () => {
  const [homepageBanner, setHomepageBanner] = useState(
    "Welcome to our Handicraft Store!"
  );
  const [aboutUs, setAboutUs] = useState(
    "We provide handmade wooden, brass, and bamboo products crafted by local artisans."
  );
  const [contactUs, setContactUs] = useState("Email: support@handicraft.com");

  const handleSave = () => {
    // toast.success("Content saved successfully ✅");
    alert("✅ Content updated locally (simulate backend)");

    // Sample for backend POST
    // axios.post("/api/cms", { homepageBanner, aboutUs, contactUs })
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-[#0f2c5c]">CMS Management</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-6 bg-white p-6 rounded shadow"
        >
          {/* Homepage Banner */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Homepage Banner Text
            </label>
            <input
              type="text"
              value={homepageBanner}
              onChange={(e) => setHomepageBanner(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-blue-500"
              placeholder="Welcome message..."
              required
            />
          </div>

          {/* About Us */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              About Us Section
            </label>
            <textarea
              rows={4}
              value={aboutUs}
              onChange={(e) => setAboutUs(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-blue-500"
              placeholder="Describe your business..."
              required
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Contact Info
            </label>
            <textarea
              rows={2}
              value={contactUs}
              onChange={(e) => setContactUs(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-blue-500"
              placeholder="Email, phone, address..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Save Content
          </button>
        </form>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Live Preview</h3>

          <div>
            <p className="text-sm text-gray-500 mb-1">📢 Homepage Banner:</p>
            <div className="bg-gray-100 p-3 rounded">{homepageBanner}</div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">ℹ️ About Us:</p>
            <div className="bg-gray-100 p-3 rounded whitespace-pre-line">
              {aboutUs}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">📞 Contact Info:</p>
            <div className="bg-gray-100 p-3 rounded">{contactUs}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CMS;
