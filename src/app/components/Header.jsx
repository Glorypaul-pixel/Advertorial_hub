"use client";
import React, { useState } from "react";
import "@/styles/Header.css";
import { useRouter } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navigateTo = (path) => {
    setMenuOpen(false);
    router.push(path);
  };

  return (
    <header className="header logHeader">
      <div className="header-logo-container" onClick={() => navigateTo("/")}>
        <img src="/images/logo.png" alt="Logo" className="header-logo" />
        <h3 className="header-title my-link hubHeader">Advertorial Hub</h3>
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <nav className={`header-nav ${menuOpen ? "show" : ""}`}>
        <button className="my-link navbtn" onClick={() => navigateTo("/AboutUs")}>
          About Us
        </button>
        <button className="my-link navbtn" onClick={() => navigateTo("/Blog")}>
          Blog
        </button>
        <button className="my-link navbtn" onClick={() => navigateTo("/Pricing")}>
          Pricing
        </button>

        <div className="mobile-buttons">
          <button
            className="login-btn"
            onClick={() => navigateTo("/authentication/Login")}
          >
            Log In
          </button>
          <button
            className="btnStart"
            onClick={() => navigateTo("/authentication/CreateAccount")}
          >
            Start Now
          </button>
        </div>
      </nav>

      <div className="header-buttons">
        <button
          className="login-btn"
          onClick={() => navigateTo("/authentication/Login")}
        >
          Log In
        </button>
        <button
          className="btnStart"
          onClick={() => navigateTo("/authentication/CreateAccount")}
        >
          Start Now
        </button>
      </div>
    </header>
  );
};

export default Header;
