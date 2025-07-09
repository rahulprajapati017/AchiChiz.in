// src/pages/Reviews.jsx
import React from "react";

const mockReviews = [
  {
    id: 1,
    reviewer: "John Doe",
    product: "Handmade Vase",
    rating: 5,
    comment: "Beautiful craftsmanship!",
    date: "2024-06-01",
  },
  {
    id: 2,
    reviewer: "Jane Smith",
    product: "Bamboo Basket",
    rating: 4,
    comment: "Very sturdy and useful.",
    date: "2024-05-28",
  },
  {
    id: 3,
    reviewer: "Amit Kumar",
    product: "Clay Pot",
    rating: 3,
    comment: "Good, but a bit small.",
    date: "2024-05-20",
  },
];

const Reviews = ({ searchTerm = "" }) => {
  const filteredReviews = mockReviews.filter(
    (review) =>
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.date.includes(searchTerm)
  );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.reviewer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500 font-bold">{"★".repeat(review.rating)}<span className="text-gray-400">{"★".repeat(5 - review.rating)}</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews; 