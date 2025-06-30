import React from "react";

const PromoSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white mt-25">
      {/* Handmade Section */}
      <div className="relative overflow-hidden ">
        <img
          src="https://wallpaperbat.com/img/229898-wallpaper-bamboo.jpg"
          alt="100% Handmade"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-1/2 left-10 text-left">
          <p className="text-white text-lg mb-1">Save up to 50% off</p>
          <h2 className="text-3xl font-serif font-semibold mb-4 text-white transition-colors duration-300 hover:text-red-600">
            100% HANDMADE
          </h2>
          <button className="relative overflow-hidden px-6 py-3 text-white font-medium z-10 bg-[#d75a3c] group">
            <span className="absolute inset-0 bg-[#c44b2e] transition-all duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 z-0"></span>
            <span className="relative z-10">SHOP NOW</span>
          </button>
        </div>
      </div>

      {/* Wax Candle Section */}
      <div className="relative overflow-hidden ">
        <img
          src="https://images2.alphacoders.com/541/541024.jpg"
          alt="Natural Wax Candle"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-1/2 left-10 text-left">
          <p className="text-white text-lg mb-1">Techniques to Calm Your</p>
          <h2 className="text-white text-3xl font-serif font-semibold mb-4 transition-colors duration-300 hover:text-red-600">
            NATURAL WAX CANDLES
          </h2>
          <button className="relative overflow-hidden px-6 py-3 text-white font-medium z-10 bg-[#d75a3c] group">
            <span className="absolute inset-0 bg-[#c44b2e] transition-all duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 z-0"></span>
            <span className="relative z-10">SHOP NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
