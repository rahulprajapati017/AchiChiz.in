import React, { useState } from "react";

const blog = {
  category: "Handmade",
  image: "https://images.pexels.com/photos/1000493/pexels-photo-1000493.jpeg",
  date: "November 15, 2024",
  title: "Choosing Handcrafted Over Mass-Produced",
  description:
    "Our goal has always been to motivate, encourage and release our fellow creators to do their thing. Sed a libero. Mauris sollicitudin fermentum libero.",
};

const BlogCommentSection = () => {
  const [formData, setFormData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: send to backend
    setFormData({ comment: "", name: "", email: "", website: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-[#222]">
      {/* Blog Image and Description Section */}
      <div className="mb-10 border-b pb-6">
        <div className="relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-80 object-cover rounded-md"
          />
          <div className="absolute top-3 left-3 bg-white text-gray-700 text-xs px-3 py-1 border rounded">
            {blog.category}
          </div>
        </div>
        <div className="mt-5 px-2">
          <p className="text-sm text-gray-500">{blog.date}</p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-1">{blog.title}</h2>
          <p className="text-gray-600 mt-2">{blog.description}</p>
        </div>
      </div>

      {/* Comment Count */}
      <h2 className="text-[1.15rem] font-serif font-semibold tracking-wide text-center mb-8 border-b pb-2">1 COMMENT</h2>
      {/* Single Comment */}
      <div className="flex items-start gap-5 mb-12">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-gray-400">
          {/* Placeholder for avatar */}
          <span>W</span>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <span className="font-semibold font-serif text-base">WIPINGO</span>
            <span className="text-xs text-gray-500">June 25, 2024 at 10:32 am</span>
            <span className="text-xs text-[#d26b4b] font-medium cursor-pointer ml-0 sm:ml-2 underline">Reply</span>
          </div>
          <p className="text-[0.97rem] text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum.
          </p>
        </div>
      </div>

      {/* Leave a Reply */}
      <h3 className="text-lg font-serif font-bold text-center mb-1 tracking-wide">LEAVE A REPLY</h3>
      <p className="text-center text-[0.97rem] text-gray-600 mb-6">
        Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 bg-[#faf9f7] p-6 rounded shadow-sm border">
        <div>
          <textarea
            name="comment"
            rows="6"
            placeholder="Your Comment Here..."
            required
            value={formData.comment}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-[#d26b4b] resize-none text-[1rem]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            required
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded w-full text-[1rem]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded w-full text-[1rem]"
          />
        </div>
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded w-full text-[1rem]"
        />
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-[#d26b4b] text-white px-8 py-2 rounded font-semibold tracking-wide hover:bg-[#c25a3c] transition-colors"
          >
            POST COMMENT
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCommentSection;
