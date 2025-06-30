import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Layout;
