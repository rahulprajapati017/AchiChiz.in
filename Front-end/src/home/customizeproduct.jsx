import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Customizeproduct = () => {
  const [isHovered, setIsHovered] = useState(false);

  const imageBefore =
    'https://www.printxpand.com/wp-content/uploads/2021/04/Customers-Want-Customized-Products-Are-you-Ready-F.png';
  const imageAfter =
    'https://www.printxpand.com/wp-content/uploads/2021/04/OREO-Colorfilled.png';

  return (
    <div
      className="relative w-full h-[70vh] transition-all duration-500 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* background image */}
      <img
        src={isHovered ? imageAfter : imageBefore}
        alt="Custom Product Background"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-opacity-40 z-10" />

      {/* content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <p className="text-sm tracking-wider mb-2">Techniques to Calm Your</p>
          <h2 className="text-4xl font-semibold mb-6">
            MASTERING THE ART OF HANDMADE
          </h2>
          {isHovered && (
            <button className="relative overflow-hidden px-6 py-2 text-black font-medium z-10 bg-white group">
                        <span className="absolute inset-0 bg-red-500 transition-all duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 z-0"></span>
                        <span className="relative z-10"><NavLink
                            to="/category">
                          View More
                            </NavLink></span>
                      </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customizeproduct;
