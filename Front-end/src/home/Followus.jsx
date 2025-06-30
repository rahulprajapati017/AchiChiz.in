import React from "react";

function Followus() {
  const images = [
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg", // 1
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg", // 2
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg", // 3
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg", // 4
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg", // 5
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg", // 6
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg", // 7
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg", // 8
  ];

  const centerBgImage =
    "https://images.pexels.com/photos/18295443/pexels-photo-18295443.jpeg"; // Center background image

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="grid grid-cols-6 grid-rows-3 gap-2 w-full max-w-7xl px-4">
        {/* Top row */}
        <div className="aspect-square overflow-hidden rounded relative group">
          <img src={images[0]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        <div className="aspect-square overflow-hidden rounded relative group">
          <img src={images[1]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        {/* Center cell spans 2 rows */}
        <div className="row-span-2 col-span-2 bg-white shadow rounded flex items-center justify-center">
          <div className="text-center">
            <div className="text-center font-serif text-lg font-semibold bg-amber-700 text-white px-4 py-2 rounded">
              FOLLOW US
            </div>
            <div className="text-sm text-gray-500 mt-1">@store.shop</div>
          </div>
        </div>

        <div className="aspect-square overflow-hidden rounded relative group">
          <img src={images[2]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        <div className="aspect-square overflow-hidden rounded relative group">
          <img src={images[3]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        {/* Middle row side images */}
        <div className="aspect-square overflow-hidden rounded relative group">
          <img src={images[4]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        <div className="aspect-square overflow-hidden rounded relative group">
          <img src={images[5]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        {/* Bottom row */}
        <div className="aspect-square overflow-hidden rounded relative group">
          <img src={images[6]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        <div className="aspect-square overflow-hidden rounded relative group">
          <img src={images[7]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      </div>
    </div>
  );
}

export default Followus;
