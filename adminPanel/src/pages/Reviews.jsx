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
