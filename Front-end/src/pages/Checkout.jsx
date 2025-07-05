import React, { useState } from 'react';
import { useNavigate, useLocation,NavLink } from 'react-router-dom';
import {
  FiChevronLeft, FiMail, FiTruck, FiUser, FiLock, FiCheck, FiShield, FiCreditCard
} from 'react-icons/fi';

const Checkout = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: 'India',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    deliveryMethod: 'standard',
  });

 const location = useLocation();
const { products: cartItems = [] } = location.state || {};

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 5;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContinueToPayment = () => {
    navigate('/payment', {
      state: {
        formData: form,
        cartItems: cartItems,
        total: total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">
              <FiChevronLeft className="w-5 h-5" />
              <NavLink
                to="/cartpage">
              Back to Shopping Cart
                  </NavLink>         
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your purchase safely and securely</p>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <FiCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Cart</span>
            </div>
            <div className="w-12 h-0.5 bg-blue-600"></div>
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">2</span>
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">3</span>
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PANEL - Takes 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* CONTACT SECTION */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiMail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                  <p className="text-sm text-gray-500">We'll use this to send you updates</p>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
                <FiMail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              
              <label className="inline-flex items-center mt-4 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span>Email me with news and exclusive offers</span>
              </label>
            </div>

            {/* DELIVERY SECTION */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiTruck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
                  <p className="text-sm text-gray-500">Where should we send your order?</p>
                </div>
              </div>

              <div className="space-y-4">
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option>India</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>UK</option>
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                <input
                  type="text"
                  name="address1"
                  placeholder="Street address"
                  value={form.address1}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
                
                <input
                  type="text"
                  name="address2"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={form.address2}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <FiTruck className="w-4 h-4" />
                    Free shipping on orders over ₹100
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <input type="radio" name="shipping" value="standard" className="mr-3" defaultChecked />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Standard Shipping</span>
                      <span className="text-green-600 font-semibold">₹5.00</span>
                    </div>
                    <p className="text-sm text-gray-500">5-7 business days</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <input type="radio" name="shipping" value="express" className="mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Express Shipping</span>
                      <span className="text-green-600 font-semibold">₹15.00</span>
                    </div>
                    <p className="text-sm text-gray-500">2-3 business days</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Takes 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* ORDER SUMMARY */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                    <p className="text-sm text-gray-500">{cartItems.length} items</p>
                  </div>
                </div>

                <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.color}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-xs line-through text-gray-400">
                            ₹{item.originalPrice}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">₹{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTINUE TO PAYMENT */}
              <button
                onClick={handleContinueToPayment}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <FiCreditCard className="w-5 h-5" />
                Continue to Payment
              </button>

              {/* SECURITY FEATURES */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FiShield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Secure Checkout</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-3 h-3" />
                    SSL encrypted payment
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-3 h-3" />
                    Money-back guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-3 h-3" />
                    Secure data protection
                  </li>
                </ul>
              </div>

              {/* SUPPORT */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Need help?</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;