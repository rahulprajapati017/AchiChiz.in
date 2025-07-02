import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto pt-[120px] px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Welcome to <span className="text-orange-600 font-semibold">ACHICHIZ</span> —
          where tradition meets creativity. We are passionate about delivering
          handcrafted treasures that bring warmth, culture, and soul into every home.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-600 mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To empower local artisans by offering a platform that values tradition and craft,
            while delivering sustainable, ethical, and beautiful handmade products to the world.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-600 mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To become a globally trusted brand that celebrates craftsmanship and keeps
            heritage alive through modern design, quality, and community.
          </p>
        </div>
      </div>

      {/* Team or Banner */}
      <div className="text-center">
        <img
          src="https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg"
          alt="Our Team"
          className="w-full max-h-[400px] object-cover rounded-xl shadow-lg mb-6"
        />
        <h3 className="text-xl font-semibold text-gray-700">
          Crafted with ❤️ by artisans across India
        </h3>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Every product tells a story — of culture, care, and community.
          By shopping with us, you're helping preserve centuries of handmade excellence.
        </p>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default AboutPage;
