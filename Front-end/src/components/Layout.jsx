import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* 👈 This is where routed content will render */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
