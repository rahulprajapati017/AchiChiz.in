import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'India',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    email: '',
    createAccount: false,
    shipToDifferentAddress: false,
    orderNotes: '',
    paymentMethod: 'bank',
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 101,
      name: 'Clove And Orange Candle',
      price: 40,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const shippingCost = 5;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handlePlaceOrder = () => {
    const productId = cartItems[0]?.id;
    navigate(`/product/${productId}`, {
      state: {
        formData: form,
        cartItem: cartItems[0],
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-[120px] pb-10">
      {/* Coupon Section */}
      <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
        <p className="text-sm font-medium">
          Have a coupon?{' '}
          <button className="underline text-blue-600 hover:text-blue-800">
            Click here to enter your code
          </button>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Billing Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First name *" value={form.firstName} onChange={handleChange} className="border p-2 rounded" />
            <input type="text" name="lastName" placeholder="Last name *" value={form.lastName} onChange={handleChange} className="border p-2 rounded" />
          </div>
          <input type="text" name="company" placeholder="Company name (optional)" value={form.company} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
          <select name="country" value={form.country} onChange={handleChange} className="border p-2 rounded w-full mt-4">
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
          <input type="text" name="address1" placeholder="Street address *" value={form.address1} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
          <input type="text" name="address2" placeholder="Apartment, suite, unit (optional)" value={form.address2} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
          <input type="text" name="city" placeholder="Town / City *" value={form.city} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
          <input type="text" name="state" placeholder="State *" value={form.state} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
          <input type="text" name="postalCode" placeholder="PIN Code *" value={form.postalCode} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
          <input type="text" name="phone" placeholder="Phone *" value={form.phone} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
          <input type="email" name="email" placeholder="Email address *" value={form.email} onChange={handleChange} className="border p-2 rounded w-full mt-4" />

          <label className="flex items-center gap-2 mt-4">
            <input type="checkbox" name="createAccount" checked={form.createAccount} onChange={handleChange} />
            Create an account?
          </label>

          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="shipToDifferentAddress" checked={form.shipToDifferentAddress} onChange={handleChange} />
            Ship to a different address?
          </label>

          <textarea name="orderNotes" placeholder="Order notes (optional)" value={form.orderNotes} onChange={handleChange} className="border p-2 rounded w-full mt-4" />
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
          <div className="space-y-4 border-b pb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="flex justify-between font-medium mt-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Shipping</span>
              <span>Flat rate: ${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-4 space-y-4">
            {['bank', 'check', 'cod', 'paypal'].map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={form.paymentMethod === method}
                  onChange={handleChange}
                />
                {method === 'bank' && 'Direct bank transfer'}
                {method === 'check' && 'Check payments'}
                {method === 'cod' && 'Cash on delivery'}
                {method === 'paypal' && 'PayPal'}
              </label>
            ))}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
