import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../data/allapi"; // auth.commentOnBlog, auth.getSingleBlogById

const BlogCommentSection = () => {
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [categories, setCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  // fetch all categories for sidebar
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(auth.getAllBlogs);
        const apiBlogs = res.data.blogs.map((item) => ({
          category: item.categories?.[0] || "General",
        }));
        const allCategories = [
          "All",
          ...new Set(apiBlogs.map((blog) => blog.category)),
        ];
        setCategories(allCategories);
      } catch (err) {
        // ignore error
      }
    };
    fetchCategories();
  }, []);

  // fetch single blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${auth.getSingleBlogById}/${id}`);

        const b = res.data.blog;
        setBlog({
          _id: b._id,
          category: b.categories?.[0] || "General",
          image: b.coverImage?.url || "",
          date: new Date(b.createdAt).toLocaleDateString(),
          title: b.title,
          description: b.content,
          comments: b.comments || [],
        });
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  // submit comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${auth.commentOnBlog}/${id}`, {
  comment,
      });
      if (res.data.success) {
        // re-fetch comments after posting
        const refreshed = await axios.get(`${auth.getSingleBlogById}/${id}`);
        const b = refreshed.data.blog;
        setBlog({
          _id: b._id,
          category: b.categories?.[0] || "General",
          image: b.coverImage?.url || "",
          date: new Date(b.createdAt).toLocaleDateString(),
          title: b.title,
          description: b.content,
          comments: b.comments || [],
        });
        setComment("");
      }
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  if (!blog) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8">
      {/* Hamburger for mobile */}
      <div className="flex lg:hidden justify-end mb-4 w-full">
        <button
          className="p-2 rounded border border-gray-300 bg-white shadow"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open categories sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="lg:w-1/4 space-y-8 hidden lg:block">
        <div>
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => navigate(`/blog?category=${encodeURIComponent(category)}`)}
                  className={`text-left w-full px-4 py-2 rounded ${
                    blog.category === category
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
      </aside>

      {/* Sidebar Drawer for mobile/tablet */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          ></div>
          {/* Drawer */}
          <aside className="relative w-4/5 max-w-xs bg-white p-6 space-y-8 shadow-xl z-50">
            <button
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => {
                        navigate(`/blog?category=${encodeURIComponent(category)}`);
                        setSidebarOpen(false);
                      }}
                      className={`text-left w-full px-4 py-2 rounded ${
                        blog.category === category
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
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 max-w-2xl mx-auto">
        {/* Blog details */}
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
            <h2 className="text-2xl font-semibold text-gray-900 mt-1">
              {blog.title}
            </h2>
            <p className="text-gray-600 mt-2">{blog.description}</p>
          </div>
        </div>

        {/* Comments */}
        <h2 className="text-[1.15rem] font-serif font-semibold tracking-wide text-center mb-8 border-b pb-2">
          {blog.comments.length} {blog.comments.length === 1 ? "COMMENT" : "COMMENTS"}
        </h2>

        {blog.comments.length > 0 ? (
          blog.comments.map((c) => (
            <div key={c._id} className="flex items-start gap-5 mb-12">
              <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-gray-400">
                <span>{c.comment.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <span className="font-semibold font-serif text-base">
                    {c.user?.name || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                  <span className="text-xs text-[#d26b4b] font-medium cursor-pointer ml-0 sm:ml-2 underline">
                    Reply
                  </span>
                </div>
                <p className="text-[0.97rem] text-gray-700 leading-relaxed">
                  {c.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No comments yet.</p>
        )}

        {/* Leave a reply */}
        <h3 className="text-lg font-serif font-bold text-center mb-1 tracking-wide">
          LEAVE A REPLY
        </h3>
        <p className="text-center text-[0.97rem] text-gray-600 mb-6">
          Your email address will not be published. Required fields are marked {" "}
          <span className="text-red-500">*</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-[#faf9f7] p-6 rounded shadow-sm border"
        >
          <div>
            <textarea
              name="comment"
              rows="6"
              placeholder="Your Comment Here..."
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-[#d26b4b] resize-none text-[1rem]"
            />
          </div>
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
    </div>
  );
};

export default BlogCommentSection;