import React from 'react';
import { User, MapPin, ShoppingBag, Heart, TrendingUp, Award } from 'lucide-react';

const AccountDashboard = () => {
  const stats = [
    { icon: ShoppingBag, label: 'Total Orders', value: '24', color: 'bg-blue-500' },
    { icon: Heart, label: 'Wishlist Items', value: '12', color: 'bg-pink-500' },
    { icon: MapPin, label: 'Addresses', value: '3', color: 'bg-green-500' },
    { icon: Award, label: 'Loyalty Points', value: '1,250', color: 'bg-purple-500' },
  ];

  const recentOrders = [
    { id: '#ORD-001', date: '2024-06-15', status: 'Delivered', amount: '$125.99' },
    { id: '#ORD-002', date: '2024-06-10', status: 'Processing', amount: '$89.50' },
    { id: '#ORD-003', date: '2024-06-05', status: 'Shipped', amount: '$234.75' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-gray-200 shadow-sm">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <User className="h-10 w-10 text-red" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Raj!</h2>
        <p className="text-gray-700">Manage your account and track your activities from here.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
          Recent Orders
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-gray-700">{order.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;