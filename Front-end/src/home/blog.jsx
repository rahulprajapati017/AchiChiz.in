import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import axios from "axios";
import { auth } from "../data/allapi";

const BlogCard = ({ blog }) => {
  return (
    <div className="mb-10">
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded"
        />
        <div className="absolute top-3 left-3 bg-white text-gray-700 text-xs px-3 py-1 border rounded">
          {blog.category}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{blog.date}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          {blog.title}
        </h2>
        <p className="text-gray-600 mt-2 line-clamp-2">{blog.description}</p>
        <NavLink to={`/blog/${blog.id}`}>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition">
            READ MORE
          </button>
        </NavLink>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(auth.getAllBlogs);
        const apiBlogs = res.data.blogs.map((item) => ({
=======
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
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
          id: item._id,
          category: item.categories?.[0] || "General",
          image: item.coverImage?.url || "",
          date: new Date(item.createdAt).toLocaleDateString(),
          title: item.title,
          description: item.summary,
<<<<<<< HEAD
        }));

        const allCategories = [
          "All",
          ...new Set(apiBlogs.map((blog) => blog.category)),
        ];

        setBlogs(apiBlogs);
        setFilteredBlogs(apiBlogs);
        setCategories(allCategories);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) => blog.category === category);
      setFilteredBlogs(filtered);
    }
  };

  // Latest posts from filteredBlogs, sorted by newest first
  const latestPosts = [...filteredBlogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section className="px-4 mb-12">
      <h1 className="text-center text-3xl sm:text-4xl font-bold my-10">
        <span className="block text-orange-600">Our Blog</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-8">

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`text-left w-full px-4 py-2 rounded ${
                      selectedCategory === category
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Posts */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Latest Posts</h3>
            <ul className="space-y-4">
              {latestPosts.map((post) => (
                <li
                  key={post.id}
                  className="flex flex-col sm:flex-row items-start gap-3"
                >
                  <NavLink to={`/blog/${post.id}`} className="flex items-start gap-3 w-full group">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full sm:w-16 sm:h-16 object-cover rounded group-hover:opacity-80 transition"
                    />
                    <div>
                      <p className="text-sm text-gray-500">{post.date}</p>
                      <p className="text-sm font-medium group-hover:underline">{post.title}</p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Blog Cards */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <p>No blog posts found in this category.</p>
          )}
        </div>
      </div>
=======
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
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
    </section>
  );
};

<<<<<<< HEAD
export default BlogSection;
=======
export default BlogSection;
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
