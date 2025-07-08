import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../data/allapi"; // auth.commentOnBlog, auth.getSingleBlogById
import { AuthContext } from "../context/AuthContext";

const BlogCommentSection = () => {
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const {usertoken}=useContext(AuthContext)

  // Fetch single blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${auth.getSingleBlogById}/${id}`);
        const data = await res.json();
        const b = data.blog;
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

  // Submit comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${auth.commentOnBlog}/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization":`Bearer ${usertoken}`
         },
        body: JSON.stringify({ comment }),
      });

      const data = await res.json();

      if (data.success) {
        // Refresh comments
        const refreshed = await fetch(`${auth.getSingleBlogById}/${id}`);
        const refreshedData = await refreshed.json();
        const b = refreshedData.blog;
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

  if (!blog) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-[#222]">
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
        {blog.comments.length}{" "}
        {blog.comments.length === 1 ? "COMMENT" : "COMMENTS"}
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
        Your email address will not be published. Required fields are marked{" "}
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
  );
};

export default BlogCommentSection;
