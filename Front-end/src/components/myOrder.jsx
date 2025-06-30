import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, Download } from 'lucide-react';

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const orders = [
    {
      id: '#ORD-001',
      date: '2024-06-15',
      status: 'delivered',
      items: [
        { name: 'Sabai roti Box', price: 89.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Sabai roti Box', price: 15.99, quantity: 2, image: '/api/placeholder/60/60' }
      ],
      total: 121.97,
      deliveryDate: '2024-06-18'
    },
    {
      id: '#ORD-002',
      date: '2024-06-10',
      status: 'processing',
      items: [
        { name: 'Sabai roti Box', price: 45.99, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      total: 45.99,
      estimatedDelivery: '2024-06-22'
    },
    {
      id: '#ORD-003',
      date: '2024-06-05',
      status: 'Sabai roti Box',
      items: [
        { name: 'Sabai roti Box', price: 75.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Sabai roti Box', price: 12.99, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      total: 88.98,
      estimatedDelivery: '2024-06-20'
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'delivered':
        return { icon: CheckCircle, color: 'bg-green-500', text: 'Delivered', textColor: 'text-green-800' };
      case 'shipped':
        return { icon: Truck, color: 'bg-blue-500', text: 'Shipped', textColor: 'text-blue-800' };
      case 'processing':
        return { icon: Clock, color: 'bg-yellow-500', text: 'Processing', textColor: 'text-yellow-800' };
      case 'pending':
        return { icon: Package, color: 'bg-gray-500', text: 'Pending', textColor: 'text-gray-800' };
      default:
        return { icon: Package, color: 'bg-gray-500', text: 'Unknown', textColor: 'text-gray-800' };
    }
  };

  const filteredOrders = selectedTab === 'all' ? orders : orders.filter(order => order.status === selectedTab);

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
        <div className="text-sm text-gray-600">
          Total Orders: <span className="font-semibold">{orders.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/20 p-1 rounded-xl backdrop-blur-lg border border-white/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedTab === tab.id
                ? 'bg-white/40 text-indigo-700 shadow-lg'
                : 'text-gray-700 hover:bg-white/20'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <div key={order.id} className="bg-white/30 backdrop-blur-lg rounded-xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${statusInfo.color} shadow-md`}>
                    <StatusIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{order.id}</h3>
                    <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusInfo.color.split('-')[1]}-100 ${statusInfo.textColor}`}>
                    {statusInfo.text}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white/30 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white/30 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-white/20 rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-white/30 space-y-2 md:space-y-0">
                <div className="text-sm text-gray-600">
                  {order.status === 'delivered' ? (
                    <span>Delivered on {order.deliveryDate}</span>
                  ) : (
                    <span>Estimated delivery: {order.estimatedDelivery}</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">Total: ${order.total}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No orders found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
