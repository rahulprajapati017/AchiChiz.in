import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { formData, cartItem } = location.state || {};

  return (
    <div className="pt-[300px] max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Product Detail Page</h1>
      <p className="text-lg mb-6">
        You are viewing product with ID: <span className="font-semibold">{id}</span>
      </p>

      {/* Buyer Information */}
      {formData ? (
        <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Buyer Information</h2>
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p>
            <strong>Address:</strong>{' '}
            {formData.address1}, {formData.address2 && formData.address2 + ','} {formData.city},{' '}
            {formData.state}, {formData.postalCode}, {formData.country}
          </p>
          <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
          {formData.orderNotes && (
            <p><strong>Order Notes:</strong> {formData.orderNotes}</p>
          )}
        </div>
      ) : (
        <p className="text-red-600">No buyer data found. Please complete checkout again.</p>
      )}

      {/* Product Info */}
      {cartItem ? (
        <div className="bg-white p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Product Purchased</h2>
          <div className="flex gap-6 items-start">
            <img
              src={cartItem.image}
              alt={cartItem.name}
              className="w-32 h-32 object-cover rounded border"
            />
            <div>
              <p><strong>Name:</strong> {cartItem.name}</p>
              <p><strong>Price:</strong> ${cartItem.price}</p>
              <p><strong>Quantity:</strong> {cartItem.quantity}</p>
              <p><strong>Total:</strong> ${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-600 mt-6">No product data found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
