

const AboutPage = () => {
  const stats = [
    { value: "60+", label: "Years of Excellence" },
    { value: "500+", label: "Happy Customers" },
    { value: "1000+", label: "Pieces Created" },
    { value: "3", label: "Generations" },
  ];

  return (<>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 overflow-hidden">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Our Story of
          <span className="block text-orange-600"> Handcrafted Excellence</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          For over three generations, we've been preserving the art of
          traditional handicrafts, creating beautiful pieces that bridge the gap
          between heritage and modern living.
        </p>

        <div className="mt-10 relative">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="./image.png"
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent rounded-2xl"></div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid gap-12 items-center lg:grid-cols-2">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6">
              Where Tradition Meets Innovation
            </h2>
            <div className="space-y-4 text-amber-800 text-base sm:text-lg leading-relaxed">
              <p>
                Our journey began in 1962 when my grandmother, Maria, started creating
                beautiful pottery pieces in her small workshop. What started as a
                passion project soon became a family legacy that would span generations.
              </p>
              <p>
                Today, we continue her tradition while embracing modern techniques and
                designs. Each piece we create tells a story - not just of its creation,
                but of the hands that shaped it and the family heritage it represents.
              </p>
              <p>
                We believe that in our fast-paced digital world, there's something deeply
                meaningful about owning something made by human hands, crafted with
                intention and love.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-orange-300 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-xl sm:text-3xl font-bold text-orange-600">{stat.value}</div>
                <div className="text-orange-700 mt-1 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-4 sm:px-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            To empower local artisans by offering a platform that values
            tradition and craft, while delivering sustainable, ethical, and
            beautiful handmade products to the world.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
            Our Vision
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            To become a globally trusted brand that celebrates craftsmanship and
            keeps heritage alive through modern design, quality, and community.
          </p>
        </div>
      </div>

      {/* Team or Banner */}
      <div className="text-center px-4">
        <h3 className="text-base sm:text-xl font-semibold text-gray-700">
          Crafted with ❤️ by artisans across India
        </h3>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Every product tells a story — of culture, care, and community. By
          shopping with us, you're helping preserve centuries of handmade
          excellence.
        </p>
      </div>
      <div>
        
      </div>
    </div>
  </>
  );
};

export default AboutPage;
