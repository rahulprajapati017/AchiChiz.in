import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const panels = [
  {
    title: "DECORATE WITH PURPOSE",
    subtitle: "HANDCRAFTED CERAMICS",
    description:
      "Explore a wide range of handmade ceramics from cups, mugs, etc. from premium materials, traditional & modern blend.",
    button: "SHOP COLLECTION",
    image: "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg",
    background: "https://images.pexels.com/photos/18295445/pexels-photo-18295445.jpeg",
  },
  {
    title: "CRAFTED FOR LIFE",
    subtitle: "SUSTAINABLE ARTISTRY",
    description:
      "Discover eco-friendly materials and craftsmanship that lasts for generations.",
    button: "EXPLORE NOW",
    image: "https://images.pexels.com/photos/10560635/pexels-photo-10560635.jpeg",
    background: "https://images.pexels.com/photos/10560623/pexels-photo-10560623.jpeg",
  },
  {
    title: "ELEVATE YOUR SPACE",
    subtitle: "MODERN RUSTIC TOUCH",
    description: "Minimalist yet soulful. Give your home a rustic yet refined style.",
    button: "BROWSE PIECES",
    image: "https://images.pexels.com/photos/18295442/pexels-photo-18295442.jpeg",
    background: "https://images.pexels.com/photos/18295444/pexels-photo-18295444.jpeg",
  },
  {
    title: "ROOTED IN TRADITION",
    subtitle: "CULTURAL HERITAGE",
    description:
      "Each product carries a piece of legacy through timeless design and handcrafted beauty.",
    button: "VIEW COLLECTION",
    image: "https://images.pexels.com/photos/14218757/pexels-photo-14218757.jpeg",
    background: "https://images.pexels.com/photos/18295441/pexels-photo-18295441.jpeg",
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
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-hide"
      >
        {panels.map((panel, idx) => (
          <div
            key={idx}
            className="w-screen h-[100vh] flex-shrink-0 relative snap-start text-white"
          >
            {/* Background Image with 40% blur */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(${panel.background})`,
                filter: "blur(4px)",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col md:flex-row justify-center items-center h-full pt-[80px] px-6 md:px-16 py-10 gap-8 text-center md:text-left">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                <h4 className="text-sm sm:text-base md:text-xl tracking-widest uppercase text-gray-300 animate-slide-in">
                  {panel.subtitle}
                </h4>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight animate-slide-in delay-100">
                  {panel.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed animate-slide-in delay-200">
                  {panel.description}
                </p>
                <button className="mt-4 bg-orange-600 px-8 py-3 text-sm sm:text-lg md:text-xl tracking-wider font-bold uppercase hover:bg-orange-500 transition animate-slide-in delay-300">
                  {panel.button}
                </button>
              </div>

              <div className="relative flex-shrink-0 hover:scale-105 transition-transform duration-300 mt-10 md:mt-0">
                <img
                  src={panel.image}
                  alt="Product"
                  className="w-[250px] h-[330px] sm:w-[300px] sm:h-[400px] md:w-[380px] md:h-[480px] object-cover rounded shadow-lg"
                />
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center text-orange-700 font-semibold text-[10px] sm:text-xs text-center shadow-md animate-[spin_16s_linear_infinite]">
                  <div className="rotate-[-30deg] whitespace-pre-line leading-tight">
                    HANDMADE{"\n"}CREATIONS
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicators */}
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
          ></button>
        ))}
      </div>

      {/* Navigation Arrows */}
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
  );
}
