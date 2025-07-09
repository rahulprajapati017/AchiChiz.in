import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { products } from '../data/products';
import ReviewSummary from '../components/ReviewSummary';
import ReviewCard from '../components/ReviewCard';
import { Input } from '../components/ui/input';

const Reviews = () => {
  const { id } = useParams();
  if (!id) return <Navigate to="/reviews" replace />;

  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="text-center text-red-600 py-20 text-xl font-semibold">
        ❌ Product not found.
      </div>
    );
  }

  const reviewData = {
    averageRating: product.rating || 0,
    totalReviews: product.reviews?.length || 0,
    ratingDistribution: [5, 4, 3, 2, 1].map(
      (star) => product.reviews?.filter((r) => r.rating === star).length || 0
    ),
  };

  const [sortBy, setSortBy] = useState('most-recent');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [form, setForm] = useState({
    author: '',
    title: '',
    content: '',
    rating: '',
  });

  const [showForm, setShowForm] = useState(false); // ✅ controls visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.author || !form.title || !form.content || !form.rating) return;

    const newReview = {
      id: Date.now(),
      ...form,
      rating: parseInt(form.rating),
      date: new Date().toISOString(),
      verified: true,
      helpful: 0,
      notHelpful: 0,
      images: [],
    };

    product.reviews.unshift(newReview); // add at beginning
    setForm({ author: '', title: '', content: '', rating: '' });
    setShowForm(false); // ✅ close form after submission
  };

  const filteredReviews = product.reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      filterRating === 'all' || review.rating.toString() === filterRating;

    return matchesSearch && matchesRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'most-recent':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest-rating':
        return b.rating - a.rating;
      case 'lowest-rating':
        return a.rating - b.rating;
      case 'most-helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-6xl mx-auto mt-20 px-6 py-10">
      <h2 className="text-3xl font-bold mb-2">Customer Reviews</h2>
      <p className="text-gray-600 mb-4">
        Read what customers said about <strong>{product.title}</strong>
      </p>

      {/* ✅ Write Review Button */}
      <div className="mb-6">
       <button
  onClick={() => setShowForm((prev) => !prev)}
  className=" bg-gradient-to-r from-red-500 to-orange-700 relative group overflow-hidden px-5 py-2 text-white font-medium shadow hover:scale-105"
>
  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out z-0 "></span>
  <span className="relative z-10">
    {showForm ? 'Cancel' : 'Write a Review'}
  </span>
</button>
      </div>

      {/* ✅ Review Form (conditionally visible) */}
      {showForm && (
        <div className="bg-white border  shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border  px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full border  px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Rating</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Star</option>
                ))}
              </select>
            </div>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Review Title"
              className="w-full border  px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="4"
              placeholder="Your review..."
              className="w-full border  px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2  shadow"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Summary + Filters */}
      <ReviewSummary {...reviewData} />

      <div className="flex flex-col sm:flex-row items-center gap-4 my-6">
        <Input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-1/2"
        />
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="border p-2 "
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 "
        >
          <option value="most-recent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="highest-rating">Highest Rating</option>
          <option value="lowest-rating">Lowest Rating</option>
          <option value="most-helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            No reviews match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
