import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDetailsPage = () => {
  const navigate = useNavigate();

  const order = {
    id: 'ORD12345',
    date: '2025-07-01',
    status: 'Shipped',
    total: '₹1,499',
    payment: 'UPI',
    shipping: {
      name: 'Pravesh Singh',
      phone: '+91-9876543210',
      address: '123 Bamboo Street, Delhi, India, 110001',
    },
    delivery: 'Expected by July 7, 2025',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Details</h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h2>
        <p className="text-sm text-gray-600">Order ID: <strong>{order.id}</strong></p>
        <p className="text-sm text-gray-600">Order Date: {order.date}</p>
        <p className="text-sm text-gray-600">Status: {order.status}</p>
        <p className="text-sm text-gray-600">Payment Method: {order.payment}</p>
        <p className="text-sm text-gray-600">Total: {order.total}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Shipping Information</h2>
        <p className="text-sm text-gray-600">Name: {order.shipping.name}</p>
        <p className="text-sm text-gray-600">Phone: {order.shipping.phone}</p>
        <p className="text-sm text-gray-600">Address: {order.shipping.address}</p>
        <p className="text-sm text-gray-600">Delivery: {order.delivery}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/track-order')}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
        >
          📦 Track Order
        </button>
        <button
          onClick={() => navigate('/return-refund')}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
        >
          🔁 Return / Refund
        </button>
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition"
        >
          ⬅ Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
