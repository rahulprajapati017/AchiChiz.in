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
    <section className="max-w-6xl mx-auto px-4 py-10 pt-[150px]">
      {/* Blog Section Title */}
      <h2 className="text-3xl font-bold text-center mb-10 text-orange-600 tracking-tight">From Our Blog</h2>
      {/* Responsive Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </section>
  );
};

export default BlogSection;
