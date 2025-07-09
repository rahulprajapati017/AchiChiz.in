// Imports remain the same
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import {
  FiChevronLeft, FiMail, FiTruck, FiUser,
} from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { auth, product } from '../data/allapi';

const Checkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usertoken } = useContext(AuthContext);

  const [userdata, setUserdata] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    deliveryMethod: 'standard',
  });

  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (!usertoken) return;
    async function fetchUserData() {
      try {
        const response = await fetch(auth.GET_USER_PROFILE, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${usertoken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        const res = await response.json();
        const u = res.data;

        const nameParts = (u.name || '').trim().split(' ');
        const firstName = nameParts.slice(0, -1).join(' ');
        const lastName = nameParts.slice(-1).join('');

        setUserdata(u);
        setForm(prev => ({
          ...prev,
          email: u.email || '',
          firstName,
          lastName,
          country: u.country || "India",
          address1: u.address1 || '',
          address2: u.address2 || '',
          city: u.city || '',
          state: u.state || '',
          postalCode: u.postalCode || '',
          phone: u.phone || '',
        }));
      } catch (error) {
        console.log('Error in checkout', error);
      }
    }

    fetchUserData();
  }, [usertoken]);

  useEffect(() => {
    if (!id) return;
    async function fetchSingleProduct() {
      try {
        const res = await fetch(`${product.GET_SINGLE_PRODUCT}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setSingleProduct(data.data);
      } catch (error) {
        console.log('Error in checkout', error);
      }
    }

    fetchSingleProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'country', 'address1', 'city', 'state', 'postalCode', 'phone'];
    return requiredFields.every(field => form[field]?.trim() !== '');
  };

  const handleContinueToPayment = () => {
    navigate('/payment', {
      state: { formData: form, orderItems, total },
    });
  };

  if (!userdata) {
    return <div className="text-center py-10">Loading user data...</div>;
  }

  const quantity = 1;
  const subtotal = singleProduct ? singleProduct.price * quantity : 0;
  const shippingCost = form.deliveryMethod === 'express' ? 15 : 5;
  const total = subtotal + shippingCost;

  const orderItems = singleProduct
    ? [{
        id: singleProduct.id,
        name: singleProduct.name,
        color: singleProduct.color || '',
        quantity,
        price: singleProduct.price,
        originalPrice: singleProduct.originalPrice || null,
        image: singleProduct.images?.[0]?.url || '',
      }]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">
              <FiChevronLeft className="w-5 h-5" />
              <NavLink to="/cartpage">Back to Shopping Cart</NavLink>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your purchase safely and securely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                  value={form.email}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Email"
                />
                <FiMail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                >
                  {/* <option value="">Select Country</option> */}
                  <option>India</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>UK</option>
                </select>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400" />
                  <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400" />
                </div>
                <input name="address1" placeholder="Street address" value={form.address1} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 w-full placeholder-gray-400" />
                <input name="address2" placeholder="Apt, suite (optional)" value={form.address2} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 w-full py-3 placeholder-gray-400" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input
    name="city"
    placeholder="City"
    value={form.city}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 w-full"
  />
  <input
    name="state"
    placeholder="State"
    value={form.state}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 w-full"
  />
  <input
    name="postalCode"
    placeholder="Postal Code"
    value={form.postalCode}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 w-full"
  />
  <input
    name="phone"
    placeholder="Phone"
    value={form.phone}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 w-full"
  />
</div>

                </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
              <div className="space-y-3">
                {['standard', 'express'].map((method) => (
                  <label key={method} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={method}
                      checked={form.deliveryMethod === method}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="font-medium">{method === 'standard' ? 'Standard Shipping' : 'Express Shipping'}</span>
                      <span className="text-green-600 font-semibold">₹{method === 'standard' ? '5.00' : '15.00'}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                    <p className="text-sm text-gray-500">{orderItems.length} item{orderItems.length > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.color}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-xs line-through text-gray-400">₹{item.originalPrice}</p>
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
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinueToPayment}
                disabled={!isFormValid()}
                className={`w-full py-4 rounded-lg font-semibold transition-colors duration-200 ${
                  isFormValid()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to BUY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
