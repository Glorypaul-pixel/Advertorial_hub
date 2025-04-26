"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header logHeader">
      <div className="header-logo-container">
        <img src="/images/logo.png" alt="Logo" className="header-logo" />
        <h3 className="header-title">
          <Link href="/" className="my-link">Advertorial Hub</Link>
        </h3>
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
        <Link href="/auth/AboutUs" className="my-link" onClick={() => setMenuOpen(false)}>
          About Us
        </Link>
        <Link href="/auth/Blog" className="my-link" onClick={() => setMenuOpen(false)}>
          Blog
        </Link>
        <Link href="/auth/Pricing" className="my-link" onClick={() => setMenuOpen(false)}>
          Pricing
        </Link>
        <div className="mobile-buttons">
          <Link href="/auth/Login" className="my-link">
            <button className="login-btn">Log In</button>
          </Link>
          <Link href="/auth/CreateAccount" >
            <button className="btnStart">Start Now</button>
          </Link>
        </div>
      </nav>

      <div className="header-buttons">
        <Link href="/auth/Login">
          <button className="login-btn">Log In</button>
        </Link>
        <Link href="/auth/CreateAccount">
          <button className="btnStart">Start Now</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
