import React from "react";

const PageTopBanner = () => {
  const imageUrl = "https://images.pexels.com/photos/716107/pexels-photo-716107.jpeg";
  const text = "Welcome to AchiChiz.in";

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-b-xl shadow-md">
      
      <img
        src={imageUrl}
        alt="Banner"
        className="w-full h-full  object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/20 via-black/10 to-black/20 backdrop-blur-[2px] z-10">
         <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg text-center px-4">
          {text}
        </h2>
      </div>
    </div>
  );
};
export default PageTopBanner;
