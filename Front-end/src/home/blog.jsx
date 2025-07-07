import React from "react";
import { NavLink } from "react-router-dom";

const blogData = [
  {
    id: 1,
    category: "Handmade",
    image: "https://images.pexels.com/photos/1000493/pexels-photo-1000493.jpeg",
    date: "November 15, 2024",
    title: "Choosing Handcrafted Over Mass-Produced",
    description:
      "Our goal has always been to motivate, encourage and release our fellow creators to do their thing. Sed a libero. Mauris sollicitudin fermentum libero.",
  },
  {
    id: 2,
    category: "Handmade",
    image: "https://images.pexels.com/photos/1000493/pexels-photo-1000493.jpeg",
    date: "November 15, 2024",
    title: "Choosing Handcrafted Over Mass-Produced",
    description:
      "Our goal has always been to motivate, encourage and release our fellow creators to do their thing. Sed a libero. Mauris sollicitudin fermentum libero.",
  },
  {
    id: 3,
    category: "Handmade",
    image: "https://images.pexels.com/photos/1000493/pexels-photo-1000493.jpeg",
    date: "November 15, 2024",
    title: "Choosing Handcrafted Over Mass-Produced",
    description:
      "Our goal has always been to motivate, encourage and release our fellow creators to do their thing. Sed a libero. Mauris sollicitudin fermentum libero.",
  },
  {
    id: 4,
    category: "Handmade",
    image: "https://images.pexels.com/photos/1000493/pexels-photo-1000493.jpeg",
    date: "November 15, 2024",
    title: "Choosing Handcrafted Over Mass-Produced",
    description:
      "Our goal has always been to motivate, encourage and release our fellow creators to do their thing. Sed a libero. Mauris sollicitudin fermentum libero.",
  },
  // Add more blog entries here
];

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-4xl mx-auto mb-10 mt-[140px] border-b pb-6">
      <h1 className="text-7xl b">OUR BLOG</h1>
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-120 object-cover rounded-md"
        />
        <div className="absolute top-3 left-3 bg-white text-gray-700 text-xs px-3 py-1 border rounded">
          {blog.category}
        </div>
      </div>
      <div className="mt-5 px-2">
        <p className="text-sm text-gray-500">{blog.date}</p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-1">{blog.title}</h2>
        <p className="text-gray-600 mt-2 line-clamp-2">{blog.description}</p>
        <NavLink
          to="/blogCommentSection"> 
          <button className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition">
            READ MORE
          </button>
        </NavLink>
      </div>
    </div>
  );
};

const BlogSection = () => {
  return (
    <section className="py-10 px-4">
      {blogData.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </section>
  );
};

export default BlogSection;
