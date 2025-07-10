import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../data/allapi";

const BlogCard = ({ blog }) => (
  <div className="max-w-4xl mx-auto mb-10 mt-[140px] border-b pb-6">
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
      <NavLink to={`/blog/${blog.id}`}>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition">
          READ MORE
        </button>
      </NavLink>
    </div>
  </div>
);

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(auth.getAllBlogs)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.blogs?.map((item) => ({
          id: item._id,
          category: item.categories?.[0] || "General",
          image: item.coverImage?.url || "",
          date: new Date(item.createdAt).toLocaleDateString(),
          title: item.title,
          description: item.summary,
        })) || [];
        setBlogs(formatted);
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <section className="py-10 px-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </section>
  );
};

export default BlogSection;
