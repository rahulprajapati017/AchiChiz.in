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
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-600';
      case 'Cancelled':
        return 'bg-red-100 text-red-600';
      case 'Shipped':
        return 'bg-blue-100 text-blue-600';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white shadow rounded-2xl p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">Order #{order.id}</h3>
          <p className="text-sm text-gray-500">Placed on: {order.date}</p>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}>
          {order.status}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>{order.items} item{order.items > 1 ? 's' : ''}</p>
        <p>Total: <strong>{order.total}</strong></p>
      </div>
      <p className="mt-2 text-xs text-gray-500">{order.delivery}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => navigate(`/order-detail/${order.id}`)}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View Details →
        </button>
        <button
          onClick={() => navigate('/track-order')}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          📦 Track Order
        </button>
        <button
          onClick={() => navigate('/return-refund')}
          className="text-sm text-red-600 hover:underline font-medium"
        >
          🔁 Return / Refund
        </button>
      </div>
    </div>
  );
};

const OrderSection = ({ title, orders }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
    {orders.length > 0 ? (
      orders.map((order) => <OrderCard key={order.id} order={order} />)
    ) : (
      <p className="text-gray-500 text-sm">No orders found.</p>
    )}
  </div>
);

const OrderPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Your Orders</h1>
      <OrderSection title="Current Orders" orders={ordersData.current} />
      <hr className="my-6" />
      <OrderSection title="Previous Orders" orders={ordersData.previous} />
    </div>
  );
};

export default OrderPage;
