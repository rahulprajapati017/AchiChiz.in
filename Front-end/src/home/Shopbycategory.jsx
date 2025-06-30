import React, { useState, useEffect } from 'react';

const CategorySliderSection = ({ title = 'Shop by Category', autoRotate = true, rotateInterval = 4000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  const categories = [
    { name: 'Bamboo', image: 'https://images.unsplash.com/photo-1509228627159-6452b7a12a49?auto=format&fit=crop&w=800&q=80' },
    { name: 'Bar Soap', image: 'https://images.unsplash.com/photo-1588776814546-ec7b18b5b8a6?auto=format&fit=crop&w=800&q=80' },
    { name: 'Ceramics', image: 'https://images.unsplash.com/photo-1604908177065-840b2cc16ff6?auto=format&fit=crop&w=800&q=80' },
    { name: 'Candle', image: 'https://images.unsplash.com/photo-1582719478174-d76b751580d0?auto=format&fit=crop&w=800&q=80' },
    { name: 'Textiles', image: 'https://images.unsplash.com/photo-1602810316099-5b7d8e1a4568?auto=format&fit=crop&w=800&q=80' },
    { name: 'Skincare', image: 'https://images.unsplash.com/photo-1620849896047-943c8c1eb268?auto=format&fit=crop&w=800&q=80' },
    { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1617042375879-b4239850c4a1?auto=format&fit=crop&w=800&q=80' },
    { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1618221305806-92ef5ed81dbb?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleHover = (i) => {
    if (i !== activeIndex) {
      setPrevIndex(activeIndex);
      setActiveIndex(i);
    }
  };

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, rotateInterval);
    return () => clearInterval(interval);
  }, [activeIndex, autoRotate, rotateInterval]);

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundColor: '#f0f0f0',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-wall.png")',
      }}
    >
      <div className="flex flex-col md:flex-row max-w-6xl w-full shadow-2xl overflow-hidden relative z-0">

        {/* Image Section */}
        <div className="relative w-full md:w-[420px] h-[360px] md:h-auto perspective">
          {prevIndex !== null && (
            <img
              src={categories[prevIndex].image}
              alt={`Previous ${categories[prevIndex].name}`}
              className="absolute inset-0 w-full h-full object-cover z-10 opacity-100 animate-flipOut"
            />
          )}
          <img
            src={categories[activeIndex].image}
            alt={`Current ${categories[activeIndex].name}`}
            className="absolute inset-0 w-full h-full object-cover z-20 opacity-0 animate-flipIn"
          />
        </div>

        {/* Category Text Section */}
        <div className="flex-1 bg-white p-6 md:p-10 flex flex-col justify-center animate-fadeUp opacity-100 z-10">
          <h2 className="text-3xl font-semibold text-[#2c2c2c] uppercase tracking-wide mb-6">
            {title}
          </h2>
          <div className="space-y-3">
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                onMouseEnter={() => handleHover(i)}
                className={`cursor-pointer px-5 py-4 flex justify-between items-center transition-all duration-300 group hover:bg-[#fef7f2] ${
                  activeIndex === i ? 'bg-[#fef7f2] translate-x-1' : ''
                }`}
              >
                <span
                  className={`text-base md:text-lg font-medium uppercase tracking-wide transition-colors duration-300 ${
                    activeIndex === i ? 'text-[#e07a47]' : 'text-[#2c2c2c] group-hover:text-[#e07a47]'
                  }`}
                >
                  {cat.name}
                </span>
                <span
                  className={`text-2xl font-bold text-[#e07a47] transition-all duration-300 ${
                    activeIndex === i
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .perspective {
          perspective: 1200px;
        }

        @keyframes flipIn {
          0% { opacity: 0; transform: rotateY(90deg) scale(1.05); }
          100% { opacity: 1; transform: rotateY(0deg) scale(1); }
        }

        @keyframes flipOut {
          0% { opacity: 1; transform: rotateY(0deg) scale(1); }
          100% { opacity: 0; transform: rotateY(-90deg) scale(0.95); }
        }

        .animate-flipIn {
          animation: flipIn 0.7s ease-out forwards;
        }

        .animate-flipOut {
          animation: flipOut 0.7s ease-out forwards;
        }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeUp {
          animation: fadeUp 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default CategorySliderSection;
