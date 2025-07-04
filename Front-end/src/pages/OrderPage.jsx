import React from 'react';
import { useNavigate } from 'react-router-dom';


const ordersData = {
  current: [
    {
      id: 'ORD12345',
      date: '2025-07-01',
      items: 3,
      status: 'Shipped',
      total: '₹1,499',
      delivery: 'Expected by July 7, 2025',
    },
    {
      id: 'ORD12346',
      date: '2025-07-02',
      items: 1,
      status: 'Processing',
      total: '₹799',
      delivery: 'Expected by July 6, 2025',
    },
  ],
  previous: [
    {
      id: 'ORD12222',
      date: '2025-06-20',
      items: 2,
      status: 'Delivered',
      total: '₹1,299',
      delivery: 'Delivered on June 25, 2025',
    },
    {
      id: 'ORD12111',
      date: '2025-06-10',
      items: 1,
      status: 'Cancelled',
      total: '₹599',
      delivery: 'Cancelled',
    },
  ],
};

const OrderCard = ({ order }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      case 'Shipped':
        return 'bg-blue-500 text-white';
      case 'Processing':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return '✅';
      case 'Cancelled':
        return '❌';
      case 'Shipped':
        return '🚚';
      case 'Processing':
        return '⏳';
      default:
        return '📦';
    }
  };
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path, {
      state: {
        orderId: order.id,}})
  };

  return (
    <div className="group bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 p-6 mb-6 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              Order #{order.id}
            </h3>
            <div className="w-2 h-2 bg-gray-400 animate-pulse"></div>
          </div>
          <p className="text-sm text-gray-600 font-medium bg-gray-50 px-3 py-1 inline-block">
            📅 {order.date}
          </p>
        </div>
        <span className={`text-sm font-bold px-4 py-2 ${getStatusStyle(order.status)} transform transition-transform duration-300 hover:scale-105`}>
          {getStatusIcon(order.status)} {order.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <div>
              <p className="text-sm font-semibold text-gray-700">Items</p>
              <p className="text-lg font-bold text-gray-900">{order.items}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-sm font-semibold text-gray-700">Total</p>
              <p className="text-lg font-bold text-gray-900">{order.total}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 border border-gray-200 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚚</span>
          <p className="text-sm font-medium text-gray-800">{order.delivery}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleNavigation(`/order-detail/${order.id}`)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span>👁️</span>
          View Details
        </button>
        
        <button
          onClick={() => handleNavigation('/track-order')}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span>📦</span>
          Track Order
        </button>
      </div>
    </div>
  );
};

const OrderSection = ({ title, orders, icon, titleColor }) => (
  <div className="mb-12">
    <div className={`bg-white p-6 shadow-lg mb-6 border-l-4 ${titleColor}`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
    </div>
    
    {orders.length > 0 ? (
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div 
            key={order.id} 
            className="animate-fade-in"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12 bg-white border-2 border-dashed border-gray-300">
        <span className="text-6xl mb-4 block">📭</span>
        <p className="text-gray-500 text-lg font-medium">No orders found.</p>
      </div>
    )}
  </div>
);

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white shadow-xl border border-gray-200 px-8 py-6 mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
              <span className="text-4xl">🛍️</span>
              Your Orders
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Track and manage all your orders in one place</p>
        </div>

        {/* Order Sections */}
        <OrderSection 
          title="Current Orders" 
          orders={ordersData.current}
          icon="🔥"
          titleColor="border-orange-500"
        />
        
        <div className="my-12">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="bg-white px-6 py-3 shadow-lg border border-gray-200">
              <span className="text-gray-500 font-medium">📋 Order History</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>
        
        <OrderSection 
          title="Previous Orders" 
          orders={ordersData.previous}
          icon="📚"
          titleColor="border-blue-500"
        />
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderPage;