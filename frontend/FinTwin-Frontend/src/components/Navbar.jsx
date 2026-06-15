import psbLogo from "../assets/psb-logo.jpg";

import {
  FaSearch,
  FaBell,
  FaRobot,
  FaUserCircle,
  FaBars,
  FaTimes
} from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const navRef = useRef();

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar" ref={navRef}>

        {/* LOGO */}
        <div className="logo-section">
          <img src={psbLogo} alt="PSB Logo" className="logo-img" />

          <div>
            <h2 className="logo">Punjab & Sind Bank</h2>
            <p className="tagline">AI Powered Banking</p>
          </div>
        </div>

        {/* LINKS */}
        <div className={`nav-links ${mobileOpen ? "active" : ""}`}>

          <a href="/">Home</a>

          <div className="dropdown">
            <a onClick={() => toggleMenu("banking")}>Banking</a>
            {openMenu === "banking" && (
              <div className="dropdown-menu">
                <a>Savings</a>
                <a>Current</a>
                <a>Transfers</a>
              </div>
            )}
          </div>

          <div className="dropdown">
            <a onClick={() => toggleMenu("loans")}>Loans</a>
            {openMenu === "loans" && (
              <div className="dropdown-menu">
                <a>Personal</a>
                <a>Home</a>
                <a>Education</a>
              </div>
            )}
          </div>

          <div className="dropdown">
            <a onClick={() => toggleMenu("investments")}>Investments</a>
            {openMenu === "investments" && (
              <div className="dropdown-menu">
                <a>Mutual Funds</a>
                <a>FD</a>
                <a>Retirement</a>
              </div>
            )}
          </div>

          <a href="#" className="ai-link">
            <FaRobot /> AI Assistant
          </a>

        </div>

        {/* ACTIONS */}
        <div className="nav-actions">

          <FaSearch className="nav-icon" style={{ marginLeft: "10px" }} />
          <FaBell className="nav-icon" />
          <FaUserCircle className="profile-icon" />

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <button className="register-btn">
            Open Account
          </button>

        </div>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </div>

      </nav>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>

          <div className="login-modal" onClick={(e) => e.stopPropagation()}>

            <h2>Login</h2>

            <input placeholder="Customer ID" />
            <input type="password" placeholder="Password" />

            <button
  className="modal-login-btn"
  onClick={() => {
    setShowLogin(false);
    navigate("/dashboard");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }}
>
  Login
</button>
            <p onClick={() => setShowLogin(false)}>Close</p>

          </div>
        </div>
      )}

    </>
  );
}

export default Navbar;