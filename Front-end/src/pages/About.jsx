import React from "react";

const features = [
  {
    title: "CULTURALLY RICH",
    description:
      "The product has both practical value and the mark of the craftsman and the of a certain countryside.",
    icon: "🧱",
  },
  {
    title: "HIGH AESTHETICS",
    description:
      "Each handicraft product is a work of art, both of high practical value and aesthetic value.",
    icon: "🎨",
  },
  {
    title: "INDIVIDUALITY",
    description:
      "Each handicraft has its own unique character and style of each unique craft village.",
    icon: "🥣",
  },
  {
    title: "DIVERSITY",
    description:
      "Diversity is shown in the method and materials used to make the product.",
    icon: "🪡",
  },
];

const AboutUs = () => {
  return (
    <div className="text-gray-800 font-sans">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://moria.wpbingosite.com/wp-content/uploads/2023/05/about.jpg"
          alt="about-hero"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-black bg-opacity-40">
          <h1 className="text-4xl font-bold">ABOUT US</h1>
          <p className="text-sm mt-2">HOME / ABOUT US</p>
        </div>
      </div>

      {/* Feature Icons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-12 bg-white text-center">
        {features.map((item, index) => (
          <div key={index} className="px-4">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-red-600 font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Timeless Appeal Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 px-6 py-12">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">
            THE TIMELESS APPEAL OF HANDMADE GOODS
          </h2>
          <p className="mb-6 text-gray-700">
            Handmade items (also known as handicrafts) are items made by hand from available
            materials, through the meticulousness and...
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
            SHOP COLLECTION
          </button>
        </div>
        <div className="lg:w-1/2 relative">
          <img
            src="https://moria.wpbingosite.com/wp-content/uploads/2023/05/about-3.jpg"
            alt="basket"
            className="w-3/4 rounded-tr-[50px] shadow-lg"
          />
          <img
            src="https://moria.wpbingosite.com/wp-content/uploads/2023/05/about-4.jpg"
            alt="candles"
            className="absolute bottom-0 right-0 w-2/3 shadow-md"
          />
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gray-50 py-12 text-center px-6">
        <h3 className="text-xl font-semibold mb-6">TESTIMONIAL</h3>
        <p className="italic max-w-3xl mx-auto text-gray-700">
          “I am extremely happy with my purchases from this lovely handcrafted store! The
          craftsmanship is exceptional, and you can see the care and passion in every item.
          The staff was friendly and knowledgeable, making the shopping experience even more
          enjoyable. Highly recommend!”
        </p>
      </div>

      {/* Featured Products Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12">
        <div>
          <img
            src="https://moria.wpbingosite.com/wp-content/uploads/2023/05/about-5.jpg"
            alt="crafted with care"
            className="w-full mb-3"
          />
          <h4 className="font-semibold">CRAFTED WITH CARE</h4>
          <p className="text-sm text-gray-600">Handmade items (also known as handicrafts)</p>
          <a href="#" className="text-sm underline mt-2 inline-block">
            DISCOVER MORE
          </a>
        </div>
        <div className="text-center bg-black text-white p-6">
          <img
            src="https://moria.wpbingosite.com/wp-content/uploads/2023/05/about-6.jpg"
            alt="wax candles"
            className="w-full mb-4"
          />
          <h4 className="text-xl font-bold">NATURAL WAX CANDLES</h4>
          <p className="text-sm mt-2">
            Handmade items (also known as handicrafts) are
          </p>
          <button className="bg-white text-black px-4 py-1 mt-4">SHOP NOW</button>
        </div>
        <div>
          <img
            src="https://moria.wpbingosite.com/wp-content/uploads/2023/05/about-7.jpg"
            alt="art object"
            className="w-full mb-3"
          />
          <h4 className="font-semibold">MASTERING THE ART OF</h4>
          <p className="text-sm text-gray-600">Handmade items (also known as handicrafts)</p>
          <a href="#" className="text-sm underline mt-2 inline-block">
            DISCOVER MORE
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
