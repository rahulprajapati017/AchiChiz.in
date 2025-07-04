import React, { useState } from 'react';

const OrderDetailsPage = () => {
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use react-router-dom
  };
  const [activeTab, setActiveTab] = useState('overview');
  
  const order = {
    id: 'ORD12345',
    date: '2025-07-01',
    status: 'Shipped',
    total: '₹1,499',
    subtotal: '₹1,299',
    shipping: '₹100',
    tax: '₹100',
    discount: '₹0',
    payment: 'UPI',
    paymentId: 'UPI123456789',
    items: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        price: '₹899',
        quantity: 1,
        sku: 'WH-001'
      },
      {
        id: 2,
        name: 'Phone Case - Clear',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop',
        price: '₹400',
        quantity: 1,
        sku: 'PC-002'
      }
    ],
    shippingInfo: {
      name: 'Pravesh Singh',
      phone: '+91-9876543210',
      address: '123 Bamboo Street, Delhi, India, 110001',
      email: 'pravesh.singh@email.com'
    },
    delivery: 'Expected by July 7, 2025',
    tracking: 'TRK987654321',
    orderProgress: [
      { step: 'Order Placed', date: '2025-07-01', time: '10:30 AM', completed: true },
      { step: 'Payment Confirmed', date: '2025-07-01', time: '10:32 AM', completed: true },
      { step: 'Order Processed', date: '2025-07-02', time: '09:15 AM', completed: true },
      { step: 'Shipped', date: '2025-07-03', time: '02:20 PM', completed: true },
      { step: 'Out for Delivery', date: '2025-07-07', time: 'Pending', completed: false },
      { step: 'Delivered', date: '2025-07-07', time: 'Pending', completed: false }
    ]
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-lg transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Order #{order.id}</h2>
            <p className="text-gray-600">Placed on {order.date}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Payment Information</h3>
            <p className="text-sm text-gray-600">Method: {order.payment}</p>
            <p className="text-sm text-gray-600">Transaction ID: {order.paymentId}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Delivery Information</h3>
            <p className="text-sm text-gray-600">{order.delivery}</p>
            <p className="text-sm text-gray-600">Tracking: {order.tracking}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Items Ordered</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">{order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-800">{order.shipping}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-800">{order.tax}</span>
          </div>
          {order.discount !== '₹0' && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{order.discount}</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TrackingTab = () => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Tracking</h3>
      <div className="space-y-4">
        {order.orderProgress.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className={`w-4 h-4 rounded-full ${
                step.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className={`font-medium ${
                  step.completed ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {step.step}
                </h4>
                <span className={`text-sm ${
                  step.completed ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.date} {step.time !== 'Pending' && `• ${step.time}`}
                </span>
              </div>
              {index < order.orderProgress.length - 1 && (
                <div className={`w-0.5 h-8 ml-2 mt-2 ${
                  step.completed ? 'bg-green-200' : 'bg-gray-200'
                }`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ShippingTab = () => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Delivery Address</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-800">{order.shippingInfo.name}</p>
            <p className="text-gray-600">{order.shippingInfo.address}</p>
            <p className="text-gray-600">{order.shippingInfo.phone}</p>
            <p className="text-gray-600">{order.shippingInfo.email}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Delivery Details</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Estimated Delivery: <span className="font-medium">{order.delivery}</span></p>
            <p className="text-gray-600">Tracking Number: <span className="font-medium">{order.tracking}</span></p>
            <p className="text-gray-600">Carrier: <span className="font-medium">Express Delivery</span></p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Orders</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
          <TabButton
            id="overview"
            label="Overview"
            active={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="tracking"
            label="Tracking"
            active={activeTab === 'tracking'}
            onClick={setActiveTab}
          />
          <TabButton
            id="shipping"
            label="Shipping"
            active={activeTab === 'shipping'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'tracking' && <TrackingTab />}
          {activeTab === 'shipping' && <ShippingTab />}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/track-order')}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Track Package</span>
            </button>
            
            <button
              onClick={() => navigate('/return-refund')}
              className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span>Return/Refund</span>
            </button>
            
            <button
              onClick={() => navigate('/reorder')}
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reorder Items</span>
            </button>
          </div>
        </div>

        {/* Customer Support */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">Our customer support team is here to help with any questions about your order.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Live Chat</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;