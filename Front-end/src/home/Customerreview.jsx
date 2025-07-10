import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    image:
      "https://www.printxpand.com/wp-content/uploads/2021/04/OG-Customers-Want-Customized-Products-Are-you-Ready.png",
    customerImage: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Roshi Naruto",
    review:
      "I am extremely happy with my purchases from this lovely handcrafted store! The craftsmanship is exceptional, and you can see the care and passion in every piece.",
  },
  {
    image:
      "https://images.pexels.com/photos/2096625/pexels-photo-2096625.jpeg",
    customerImage: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Itachi Uchiha",
    review:
      "A fantastic experience! The handmade products are not only beautiful but also durable. Will definitely shop again!",
  },
  {
    image:
      "https://images.pexels.com/photos/205316/pexels-photo-205316.jpeg",
    customerImage: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Sakura Haruno",
    review:
      "I love the uniqueness of each item. It's hard to find such detailed and artistic pieces nowadays.",
  },
];

const CustomerReview = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#fde2c3] py-10 px-4 md:px-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl  tracking-wide">
          CUSTOMER REVIEWS
        </h1>
        <p className="mt-2 text-sm text-black max-w-2xl mx-auto">
          Handmade items are created with heart and soul. Here’s what our happy
          customers have to say.
        </p>
      </div>

      {/* Review container */}
      <div className="relative min-h-[470px] md:min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col md:flex-row absolute inset-0"
          >
            {/* Left Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={reviews[current].image}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Text Section */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              {/* Desktop: avatar on top | Mobile: avatar left */}
              <div className="flex flex-row md:flex-col items-start gap-4">
                {/* Avatar */}
                <img
                  src={reviews[current].customerImage}
                  alt={reviews[current].name}
                  className="w-14 h-14 rounded-full border-4 border-white shadow-md"
                />

                {/* Text */}
                <div className="flex-1">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-2">
                    “{reviews[current].review}”
                  </p>
                  <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                    {reviews[current].name}
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CustomerReview;
