import React, { useState } from "react";
import "./Followus.css";
import { FaInstagram } from "react-icons/fa6";

function Followus() {
  const [hoverDirection, setHoverDirection] = useState({});

  const getDirection = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const w = rect.width;
    const h = rect.height;

    const top = y;
    const right = w - x;
    const bottom = h - y;
    const left = x;

    const min = Math.min(top, right, bottom, left);

    let direction = "";

    if (min === top) direction = "from-top";
    else if (min === right) direction = "from-right";
    else if (min === bottom) direction = "from-bottom";
    else if (min === left) direction = "from-left";

    setHoverDirection((prev) => ({ ...prev, [index]: direction }));
  };

  const clearDirection = (index) => {
    setHoverDirection((prev) => ({ ...prev, [index]: null }));
  };

  const images = [
    "https://png.pngtree.com/png-vector/20220516/ourmid/pngtree-handmade-bamboo-crafts-hd-photography-material-png-image_4621177.png", // 0
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDbqJkJDvvFvrB0ti8AD8hNENV2mPh4CiuOSEgS3cVox-tpT8ma1Xl4eH9rtzJ27dZXWs&usqp=CAU", // 1
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopeMHF9SbkPpRK-YmDrfJ8HHn0RPrL4wxaQ&s", // 2 - Center big
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopeMHF9SbkPpRK-YmDrfJ8HHn0RPrL4wxaQ&s", // 3
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvck3E_Inv8WpGpY8BuoVA-Hbme6sD9UYmeg&s", // 4
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRQMPz6M8lc-gn_tP9Ld8rtYaCs4gPNUBlZA&s", // 5
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOhEk6R3so4VAYIKTpPPyshknKxso1ld4aA&s", // 6
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcdPa88vFExXyu-bssYfHMMuOPOiexa9yqpg&s", // 7
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcdPa88vFExXyu-bssYfHMMuOPOiexa9yqpg&s", // 8
  ];

  return (
    <div className="followus-layout h-[60vh] grid grid-cols-6 grid-rows-2  gap-2 w-full px-10 py-2">
      {images.map((img, index) => (
        <div
          key={index}
          className={`image-box relative overflow-hidden group 
          ${index === 2 ? "row-span-2 col-span-2" : ""}`} // Center image larger
          onMouseEnter={(e) => index !== 2 && getDirection(e, index)}
          onMouseLeave={() => index !== 2 && clearDirection(index)}
        >
          <img
            src={img}
            alt={`Image ${index}`} 
            className="w-full h-full object-cover"
          />

          {/* ✅ Overlay - But skip rendering for center image */}
          {index !== 2 && (
            <div
              className={`overlay absolute inset-0 bg-white flex items-center justify-center text-white transition-all duration-300 pointer-events-none
              ${hoverDirection[index] ? `overlay-${hoverDirection[index]}` : "opacity-0"}`}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <FaInstagram className="text-black" />
            </div>
          )}
           {/* ✅ "Follow Us" Text for center image */}
           
          {index === 2 && (
            <div className="  w-[50%] h-[50%] absolute left-[25%] top-[25%] inset-0 flex items-center justify-center bg-white bg-opacity-40 text-black text-2xl font-semibold">
              Follow Us
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Followus;


//  import React from "react";

// function Followus() {
//   const images = [
//   "https://png.pngtree.com/png-vector/20220516/ourmid/pngtree-handmade-bamboo-crafts-hd-photography-material-png-image_4621177.png", // 1
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDbqJkJDvvFvrB0ti8AD8hNENV2mPh4CiuOSEgS3cVox-tpT8ma1Xl4eH9rtzJ27dZXWs&usqp=CAU", // 2
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopeMHF9SbkPpRK-YmDrfJ8HHn0RPrL4wxaQ&s", // 3
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopeMHF9SbkPpRK-YmDrfJ8HHn0RPrL4wxaQ&s", // 4
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvck3E_Inv8WpGpY8BuoVA-Hbme6sD9UYmeg&s", // 5
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRQMPz6M8lc-gn_tP9Ld8rtYaCs4gPNUBlZA&s", // 6
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOhEk6R3so4VAYIKTpPPyshknKxso1ld4aA&s", // 7
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcdPa88vFExXyu-bssYfHMMuOPOiexa9yqpg&s", // 8
// ];d

//   const centerBgImage =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhrVfH-7FJQCLNhwcEnShCNrPlYEFXPQ_TA&s"; // Center background image

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="grid grid-cols-6 grid-rows-3 gap-2 w-full max-w-7xl px-4">
//         {/* Top row */}
//         <div className="aspect-square overflow-hidden rounded relative group">
//           <img src={images[0]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//         </div>

//         <div className="aspect-square overflow-hidden rounded relative group">
//           <img src={images[1]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//         </div>

//         {/* Center cell spans 2 rows */}
//         <div className="row-span-2 col-span-2  shadow rounded flex items-center justify-center bg-cover bg-center " style={{ backgroundImage:` url(${centerBgImage}) `}}>
//           <div  className="text-center pt-12 bg-white  h-[50%] w-[50%] ">
//             <div className="text-center font-serif text-lg font-semibold  text-black  py-2 rounded">
//               FOLLOW US
//             </div>
//             <div className="text-sm text-gray-500 mt-1">@store.shop</div>
//           </div>
//         </div>

//         <div className="aspect-square overflow-hidden rounded relative group">
//           <img src={images[2]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//         </div>

//         <div className="aspect-square overflow-hidden rounded relative group">
//           <img src={images[3]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//         </div>

//         {/* Middle row side images */}
//         <div className="aspect-square overflow-hidden rounded relative group">
//           <img src={images[4]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//         </div>

//         <div className="aspect-square overflow-hidden rounded relative group">
//           <img src={images[5]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//         </div>

//         {/* Bottom row */}
//         <div className="aspect-square overflow-hidden rounded relative group">
//           <img src={images[6]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//         </div>

//         <div className="aspect-square overflow-hidden rounded relative group">
//           <img src={images[7]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Followus;
