import psbLogo from "../assets/psb-logo.jpg";
import { Link } from "react-router-dom";

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

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
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

          

          <Link to="/">Home</Link>

  <Link to="/banking">Banking</Link>

  <Link to="/loan">Loans</Link>

  <Link to="/investment">Investments</Link>

  <Link to="/aiassistant" className="ai-link">
            <FaRobot /> AI Assistant
         </Link>

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