import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Framer Motion variants
const textGroup = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const panels = [
  {
    subtitle: "HANDCRAFTED CERAMICS",
    title: "DECORATE WITH PURPOSE",
    description:
      "Explore a wide range of handmade ceramics from cups, mugs, etc. from premium materials, traditional & modern blend.",
    button: "SHOP COLLECTION",
    image:
      "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg",
    blurredBackground:
      "https://images.pexels.com/photos/18295445/pexels-photo-18295445.jpeg",
  },
  {
    subtitle: "SUSTAINABLE ARTISTRY",
    title: "CRAFTED FOR LIFE",
    description:
      "Discover eco-friendly materials and craftsmanship that lasts for generations.",
    button: "EXPLORE NOW",
    image:
      "https://images.pexels.com/photos/10560635/pexels-photo-10560635.jpeg",
    blurredBackground:
      "https://images.pexels.com/photos/10560623/pexels-photo-10560623.jpeg",
  },
  {
    subtitle: "MODERN RUSTIC TOUCH",
    title: "ELEVATE YOUR SPACE",
    description:
      "Minimalist yet soulful. Give your home a rustic yet refined style.",
    button: "BROWSE PIECES",
    image:
      "https://images.pexels.com/photos/18295442/pexels-photo-18295442.jpeg",
    blurredBackground:
      "https://images.pexels.com/photos/18295444/pexels-photo-18295444.jpeg",
  },
  {
    subtitle: "CULTURAL HERITAGE",
    title: "ROOTED IN TRADITION",
    description:
      "Each product carries a piece of legacy through timeless design and handcrafted beauty.",
    button: "VIEW COLLECTION",
    image:
      "https://images.pexels.com/photos/14218757/pexels-photo-14218757.jpeg",
    blurredBackground:
      "https://images.pexels.com/photos/18295441/pexels-photo-18295441.jpeg",
  },
];

export default function HeroScroll() {
  const containerRef = useRef();
  const [index, setIndex] = useState(0);

  const scrollToPanel = (i) => {
    containerRef.current?.scrollTo({
      left: i * window.innerWidth,
      behavior: "smooth",
    });
  };

  const next = () => {
    const i = (index + 1) % panels.length;
    setIndex(i);
    scrollToPanel(i);
  };

  const prev = () => {
    const i = (index - 1 + panels.length) % panels.length;
    setIndex(i);
    scrollToPanel(i);
  };

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="font-sans">
      <div className="relative w-full overflow-hidden ">
        <div
          ref={containerRef}
          className="h-screen flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {panels.map((panel, idx) => (
            <div
              key={idx}
              className="w-screen h-[calc(100vh-80px)] flex-shrink-0 relative snap-start"
            >
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url(${panel.blurredBackground})`,
                }}
              />
              <div className="absolute inset-0 bg-black/60 z-0" />

              <div className="relative z-10 flex flex-col md:flex-row justify-center items-center h-full px-4 sm:px-8 md:px-16 gap-6 text-center md:text-left">
                <motion.div
                  variants={textGroup}
                  initial="hidden"
                  animate="show"
                  className="max-w-2xl space-y-6"
                >
                  <motion.h4
                    variants={item}
                    className="text-sm sm:text-base md:text-xl tracking-widest uppercase text-gray-300"
                  >
                    {panel.subtitle}
                  </motion.h4>
                  <motion.h1
                    variants={item}
                    className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight"
                  >
                    {panel.title}
                  </motion.h1>
                  <motion.p
                    variants={item}
                    className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed"
                  >
                    {panel.description}
                  </motion.p>
                  <motion.button
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-orange-600 px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-lg font-bold uppercase text-white hover:bg-orange-500 transition"
                  >
                    {panel.button}
                  </motion.button>
                </motion.div>

                <div className="relative hover:scale-105 transition-transform duration-300 mt-10 md:mt-0">
                  <img
                    src={panel.image}
                    alt="Product"
                    className="w-[200px] h-[280px] sm:w-[260px] sm:h-[360px] md:w-[320px] md:h-[420px] object-cover rounded shadow-lg"
                  />
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center text-orange-700 font-semibold text-[10px] sm:text-xs text-center shadow-md animate-[spin_16s_linear_infinite]">
                    <div className="rotate-[-30deg] whitespace-pre-line leading-tight">
                      HANDMADE{"\n"}CREATIONS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {panels.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                scrollToPanel(i);
              }}
              className={`w-3 h-3 rounded-full ${
                index === i ? "bg-white" : "bg-gray-500"
              } transition-all duration-300`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/60 z-20"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/60 z-20"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
