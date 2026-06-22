import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Stats from "../components/Home/landingPage/Stats";

import Security from "../components/Home/landingPage/Security";
import Testimonials from "../components/Home/landingPage/Testimonials";
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
      <Security />
      <Testimonials />

      {/* GLOBAL FOOTER */}
      <Footer />
    </>
  );
}

export default MainLayout;