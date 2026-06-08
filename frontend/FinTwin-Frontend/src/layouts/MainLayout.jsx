import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Security from "../components/Security";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      {/* GLOBAL HEADER */}
      <Navbar />

      {/* PAGE CONTENT (Home / Dashboard) */}
      <Outlet />

      {/* GLOBAL SECTIONS (every page) */}
      <Stats />
      <Features />
      <Security />
      <Testimonials />

      {/* GLOBAL FOOTER */}
      <Footer />
    </>
  );
}

export default MainLayout;