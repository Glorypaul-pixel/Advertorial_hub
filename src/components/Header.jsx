import React from "react";
// import HeaderLogo from "@/images/logo.png";
import Link from "next/link";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-container">
        <img src="/images/logo.png" alt="Logo" className="header-logo" />

        <h3 className="header-title"><Link href="/"></Link>Advertorial Hub</h3>
      </div>

      <nav className="header-nav">
        <Link href="/auth/AboutUs">About Us</Link>
        <Link href="/auth/Blog">Blog</Link>
        <Link href="/auth/Pricing">Pricing</Link>
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
