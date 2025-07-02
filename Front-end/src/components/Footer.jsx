import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-black text-white relative flex flex-col items-center justify-center py-12"
      style={{
        backgroundImage: "url('/your-bg-image.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {/* Contact Us */}
        <div className="text-left">
          
          <h2 className="font-semibold text-lg mb-4">CONTACT US</h2>
          <p className="text-sm">
            <span className="text-red-500">Mon – Fri:</span> 10AM – 5PM
          </p>
          <p className="text-sm mt-2">
            <span className="text-red-500">Address:</span> Old Faithful,
            Yellowstone National Park, WY 82190, USA
          </p>
          <p className="text-sm mt-2">
            <span className="text-red-500">Phone:</span> (02) 6188 8062
          </p>
          <p className="text-sm mt-2">
            <span className="text-red-500">Email:</span>{" "}
            moriashop@gmail.com
          </p>
        </div>

        {/* Sign up and social */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">SIGN UP FOR 10% OFF</h2>
          <div className="flex flex-col sm:flex-row items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full sm:flex-1 p-3 text-white bg-gray-800 border border-gray-700 rounded-md sm:rounded-r-none sm:rounded-l-md"
            />
            <button className="bg-white text-black px-6 py-3 mt-2 sm:mt-0 sm:rounded-r-md font-bold">
              SEND
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xl">
            <a href="#" aria-label="Twitter" className="hover:text-red-500 transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-red-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-red-500 transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Pinterest" className="hover:text-red-500 transition">
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* Customer Care */}
        <div className="text-left md:text-right">
          <h2 className="font-semibold text-lg mb-4">CUSTOMER CARE</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Store Locator</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Shipping and Promo Info</a></li>
            <li><a href="#">Check Gift Card Balance</a></li>
            <li><a href="#">Wholesale</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-4 px-4 md:px-6 w-full text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>Copyright © 2024. All Rights Reserved.</p>
        <div className="flex gap-2 flex-wrap justify-center">
          <img src="/amex.png" alt="Amex" className="h-6" />
          <img src="/mastercard.png" alt="Mastercard" className="h-6" />
          <img src="/visa.png" alt="Visa" className="h-6" />
          <img src="/paypal.png" alt="PayPal" className="h-6" />
          <img src="/applepay.png" alt="Apple Pay" className="h-6" />
          <img src="/klarna.png" alt="Klarna" className="h-6" />
        </div>
      </div>

    </footer>
  );
};

export default Footer;
