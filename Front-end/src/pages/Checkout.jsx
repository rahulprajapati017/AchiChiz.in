import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { FiChevronLeft, FiMail, FiTruck, FiUser, FiPlus, FiMinus } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { auth, product } from '../data/allapi';

const Checkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usertoken, quantity, setQuantity } = useContext(AuthContext);

  const [userdata, setUserdata] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);
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
  const [loading, setLoading] = useState(false);

  // Redirect or show message if no token
  useEffect(() => {
    if (!usertoken) {
      alert('Please login to proceed to checkout.');
      navigate('/login');
    }
  }, [usertoken, navigate]);

  useEffect(() => {
    if (!usertoken) return;
    (async () => {
      try {
        const res = await fetch(auth.GET_USER_PROFILE, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${usertoken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const { data: u } = await res.json();
        const [fn, ...rest] = (u.name || '').trim().split(' ');
        const ln = rest.length ? rest.join(' ') : '';
        setUserdata(u);
        setForm(prev => ({
          ...prev,
          email: u.email || '',
          firstName: fn,
          lastName: ln,
          country: u.country || 'India',
          address1: u.address1 || '',
          address2: u.address2 || '',
          city: u.city || '',
          state: u.state || '',
          postalCode: u.postalCode || '',
          phone: u.phone || '',
        }));
      } catch (err) {
        console.error(err);
        alert('Failed to load user data. Please try again.');
      }
    })();
  }, [usertoken]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`${product.GET_SINGLE_PRODUCT}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const { data } = await res.json();
        setSingleProduct(data);
      } catch (err) {
        console.error(err);
        alert('Failed to load product data.');
      }
    })();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = singleProduct ? singleProduct.price * (quantity || 1) : 0;
  const shippingCost = form.deliveryMethod === 'express' ? 15 : 5;
  const total = subtotal + shippingCost;

  const isFormValid = () => {
    const required = [
      'firstName',
      'lastName',
      'country',
      'address1',
      'city',
      'state',
      'postalCode',
      'phone',
    ];
    return required.every(f => form[f]?.trim());
  };

  const incrementQuantity = () => setQuantity(prev => (prev ? prev + 1 : 1));
  const decrementQuantity = () => setQuantity(prev => (prev && prev > 1 ? prev - 1 : 1));

  const handleContinueToPayment = async () => {
    if (!singleProduct || !userdata) return;

    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    const address1 = form.address1.trim();
    const address2 = form.address2.trim();
    const streetAddress = address1 + (address2 ? ', ' + address2 : '');

    if (!address1) {
      alert('Street Address is required');
      return;
    }

    setLoading(true);

    const shippingInfo = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      streetAddress,
      city: form.city.trim(),
      state: form.state.trim(),
      postalCode: form.postalCode.trim(),
      country: form.country.trim(),
      phone: form.phone.trim(),
    };

    // Ensure quantity is at least 1
    const finalQuantity = quantity && quantity > 0 ? quantity : 1;

    const payload = {
      user: userdata._id,
      shippingInfo,
      orderItems: [
        {
          product: singleProduct._id,
          quantity: finalQuantity,
          price: singleProduct.price,
        },
      ],
      totalAmount: total,
      shippingPrice: shippingCost,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
    };

    try {
      const res = await fetch(product.CREATE_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${usertoken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error('Order API error:', result);
        throw new Error(result.message || 'Order failed');
      }

      alert('Order submitted successfully!');
      navigate('/category');
    } catch (err) {
      console.error(err);
      alert('Order creation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!userdata || !singleProduct) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <NavLink to="/cartpage" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <FiChevronLeft />
            <span>Back to Cart</span>
          </NavLink>
          <div className="text-center mt-4">
            <h1 className="text-4xl font-bold">Secure Checkout</h1>
            <p className="text-gray-600">Complete your purchase safely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-white p-6 rounded-xl shadow border">
              <div className="flex items-center mb-4">
                <FiMail className="text-blue-600 w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Contact Information</h2>
              </div>
              <input
                name="email"
                type="email"
                value={form.email}
                disabled
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Delivery */}
            <div className="bg-white p-6 rounded-xl shadow border">
              <div className="flex items-center mb-4">
                <FiTruck className="text-green-600 w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Delivery Address</h2>
              </div>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 mb-4"
              >
                <option>India</option>
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3"
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3"
                />
              </div>
              <input
                name="address1"
                placeholder="Street Address"
                value={form.address1}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 w-full mb-4"
              />
              <input
                name="address2"
                placeholder="Apt, suite (optional)"
                value={form.address2}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 w-full mb-4"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3"
                />
                <input
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  name="postalCode"
                  placeholder="Postal Code"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
              {['standard', 'express'].map(m => (
                <label
                  key={m}
                  className="flex items-center mb-2 border rounded-lg p-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={m}
                    checked={form.deliveryMethod === m}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span className="flex-1">
                    {m === 'standard' ? 'Standard Shipping' : 'Express Shipping'}
                  </span>
                  <span className="text-green-600 font-semibold">
                    ₹{m === 'standard' ? '5.00' : '15.00'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow border sticky top-6 space-y-6">
              <div className="flex items-center mb-4">
                <FiUser className="text-purple-600 w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              <div className="border-b pb-4 mb-4 space-y-4">
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                  <img
                    src={singleProduct.images?.[0]?.url}
                    alt={singleProduct.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{singleProduct.name}</p>
                    {/* Quantity with increment/decrement buttons */}
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        type="button"
                        onClick={decrementQuantity}
                        className="p-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-3 py-1 border rounded select-none">{quantity || 1}</span>
                      <button
                        type="button"
                        onClick={incrementQuantity}
                        className="p-1 border rounded hover:bg-gray-200"
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold">₹{singleProduct.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-bold">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                disabled={!isFormValid() || loading}
                onClick={handleContinueToPayment}
                className={`w-full py-3 rounded-lg font-semibold ${
                  isFormValid() && !loading
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Processing...' : 'Continue to BUY'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
