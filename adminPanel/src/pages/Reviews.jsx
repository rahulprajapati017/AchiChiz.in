<<<<<<< HEAD
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
=======
import { useState } from "react";
import { demoReviews } from "../data/demo";
import Layout from "../components/Layout";

const Reviews = () => {
  const [reviews, setReviews] = useState(
    demoReviews.map((r) => ({ ...r, approved: false }))
  );

  const toggleApproval = (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, approved: !r.approved } : r
    );
    setReviews(updated);
  };

  const deleteReview = (id) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#0f2c5c]">📝 Product Reviews</h2>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Review</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <tr
                    key={review.id}
                    className={`border-t ${
                      review.approved ? "bg-green-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-4">{review.product}</td>
                    <td className="p-4">{review.user}</td>
                    <td className="p-4">{review.text}</td>
                    <td className="p-4 font-medium">
                      {review.approved ? (
                        <span className="text-green-600">Approved</span>
                      ) : (
                        <span className="text-gray-500">Pending</span>
                      )}
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => toggleApproval(review.id)}
                        className={`px-3 py-1 rounded text-white transition ${
                          review.approved
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {review.approved ? "Unapprove" : "Approve"}
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    No reviews available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;
>>>>>>> a7cee864a0040b35f73a5d6d8a7b9e8c80880776
