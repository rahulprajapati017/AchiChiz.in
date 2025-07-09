import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setToast("Message Sent Successfully! We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      });
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white pt-[80px] text-black">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're here to help with any questions about our products, orders, or services.
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Choose the method that works best for you. Our team is ready to assist.
            </p>
          </div>

          {[{
              icon: <Phone className="h-5 w-5" />,
              title: "Phone Support",
              value: "+1 (555) 123-4567",
              desc: "Mon-Fri, 9 AM - 6 PM EST"
            },
            {
              icon: <Mail className="h-5 w-5" />,
              title: "Email Support",
              value: "support@yourstore.com",
              desc: "Response within 24 hours"
            },
            {
              icon: <MessageSquare className="h-5 w-5" />,
              title: "Live Chat",
              value: "Available on our website",
              desc: "Mon-Fri, 9 AM - 6 PM EST"
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Visit Our Store",
              value: "123 Commerce St, New York, NY",
              desc: "Mon-Sat, 10 AM - 8 PM"
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 border rounded hover:bg-gray-50">
              <div className="bg-black text-white p-2 rounded">{item.icon}</div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.value}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}

          {/* Business Hours */}
          <div className="p-6 border rounded bg-gray-50">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-black" />
              <h3 className="font-semibold">Business Hours</h3>
            </div>
            <div className="text-sm space-y-1">
              <p className="flex justify-between"><span>Mon - Fri</span><span>9:00 AM - 6:00 PM</span></p>
              <p className="flex justify-between"><span>Saturday</span><span>10:00 AM - 4:00 PM</span></p>
              <p className="flex justify-between"><span>Sunday</span><span>Closed</span></p>
            </div>
          </div>

          {/* Emergency */}
          <div className="p-6 border border-red-200 bg-red-50">
            <h3 className="font-semibold text-red-900 mb-2">Emergency Support</h3>
            <p className="text-sm text-red-700 mb-1">For urgent order/account issues:</p>
            <p className="font-medium text-red-900">+1 (555) 999-0000</p>
            <p className="text-xs text-red-600">24/7 for critical issues only</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input type="text" name="name" required value={formData.name}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address *</label>
              <input type="email" name="email" required value={formData.email}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded" placeholder="you@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded" placeholder="Optional" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select name="category" required value={formData.category}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded bg-white">
                <option value="">Select a category</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Support</option>
                <option value="product">Product Question</option>
                <option value="shipping">Shipping & Returns</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing & Payment</option>
                <option value="complaint">Complaint</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject *</label>
            <input type="text" name="subject" required value={formData.subject}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded" placeholder="Brief subject" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message *</label>
            <textarea name="message" rows="6" required value={formData.message}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded resize-none" placeholder="Details about your inquiry..." />
          </div>

          <div className="bg-gray-50 border p-4 text-sm text-gray-600 rounded">
            <strong>Note:</strong> For order-related inquiries, please include your order number.
          </div>

          <button type="submit" disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600">Quick answers to common questions</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["What are your shipping options?", "We offer standard (5-7 days), express (2-3 days), and overnight shipping options."],
            ["How can I track my order?", "You'll receive a tracking number via email after shipping."],
            ["What is your return policy?", "Returns accepted within 30 days for unused items."],
            ["Do you offer customer support?", "Yes, Mon-Fri 9 AM - 6 PM EST via phone, email, or chat."],
          ].map(([q, a], i) => (
            <div key={i} className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">{q}</h3>
              <p className="text-gray-600">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
