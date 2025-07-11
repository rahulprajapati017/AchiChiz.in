import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const CategorySliderSection = ({
  title = 'Shop by Category',
  autoRotate = true,
  rotateInterval = 4000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    { name: 'Bamboo', image: 'https://www.re-thinkingthefuture.com/wp-content/uploads/2022/07/A7341-Traditional-Crafts-of-India-Bamboo-Handicrafts-Image-1.jpg' },
    { name: 'Bar Soap', image: 'https://tse2.mm.bing.net/th/id/OIP.3NJ92vRCxdAWA3WKVoOdOgHaHa' },
    { name: 'Ceramics', image: 'https://2.bp.blogspot.com/--TEGBCh9a8g/UrAfFZu4LXI/AAAAAAAAOvo/dYuwYbu0UAo/s1600/pottery+goa.jpg' },
    { name: 'Candle', image: 'https://craftlipi.com/wp-content/uploads/2023/08/CDT-DYA-MC3-12-c.jpg' },
    { name: 'Textiles', image: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/08/Handmade-skirt-with-embroidery-and-mirror-work.jpg' },
    { name: 'Skincare', image: 'https://tse2.mm.bing.net/th/id/OIP.nbho2LZVcWzVW4dZj8RQ7AHaHa' },
    { name: 'Jewelry', image: 'https://tse4.mm.bing.net/th/id/OIP.0CPeho1n8muNWWhKzEkjNAHaJ4' },
    { name: 'Home Decor', image: 'https://tse3.mm.bing.net/th/id/OIP.RMdP1_1b2GfHbgPcEhAalQHaE7' },
  ];

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, rotateInterval);
    return () => clearInterval(interval);
  }, [autoRotate, rotateInterval]);

  return (
    <section className="w-full flex flex-col py-20 md:flex-row items-start justify-center bg-[#f5f2ed] p-0 m-0 overflow-hidden">
      {/* Left Image Section */}
      <div className="w-full  md:w-1/2 md:h-[700px]">
        <img
          src={categories[activeIndex].image}
          alt={categories[activeIndex].name}
          className="md:ml-30 md:h-full h-[50vh] object-cover shadow-md translate-y-[15px]"
        />
      </div>

      {/* Right Text Section */}
      <div className="w-full md:w-1/2 h-[650px] bg-white p-10 my-10 md:p-14 shadow-lg mr-30 flex flex-col z-10 justify-center">
        <h2 className="text-sm uppercase text-gray-700 tracking-widest mb-6">
          {title}
        </h2>
        <div className="divide-y divide-gray-200">
          {categories.map((cat, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              className="flex justify-between items-center py-4 cursor-pointer group"
            >
              <span className={`text-lg md:text-xl transition-colors duration-300 tracking-wide font-[serif] ${i === activeIndex ? 'text-[#c74b2c]' : 'text-black'} group-hover:text-[#c74b2c]`}>
                <NavLink
            to="/category"
            className="hover:text-[#c74b2c] transition-colors duration-300">
          {cat.name.toUpperCase()}
          </NavLink>
              </span>
              <span className={`text-2xl transition-all duration-300 ${i === activeIndex ? 'opacity-100 translate-x-0 text-[#c74b2c]' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#c74b2c]'}`}>
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySliderSection;
