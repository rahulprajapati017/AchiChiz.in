import React from "react";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  const blogData = [
    {
      image: "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg",
      date: "November 13, 2024",
      title: "Celebrating the Artistry of Handicrafts",
      description:
        "Our goal has always been to motivate, encourage and release our fellow creatives to do their thing. Sed a libero...",
    },
    {
      image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
      date: "December 5, 2024",
      title: "Sustainable Ceramic Designs",
      description:
        "Discover how handmade ceramics bring sustainability and elegance to your living spaces. Mauris sollicitudin fermentum libero...",
    },
    {
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      date: "January 10, 2025",
      title: "Storage Trays for Organizing Your Space",
      description:
        "Storage trays are not just functional but also add beauty to your home decor. Phasellus volutpat metus eget egestas...",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Categories */}
      <div className="flex space-x-3 mb-6">
        <button className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">Ceramic</button>
        <button className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">Handmade</button>
        <button className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">Storage Tray</button>
      </div>

      {/* All Blogs */}
      {blogData.map((blog, index) => (
        <BlogCard
          key={index}
          image={blog.image}
          date={blog.date}
          title={blog.title}
          description={blog.description}
        />
      ))}
    </div>
  );
};

export default BlogSection;
