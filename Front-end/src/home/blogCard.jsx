import React from "react";

const BlogCard = ({ image, date, title, description }) => {
  return (
    <div className="mb-10">
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-auto object-cover rounded"
      />

      {/* Blog Content */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">{date}</p>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <button className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">
          READ MORE
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
