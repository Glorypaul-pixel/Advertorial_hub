"use client";

import React, { useEffect, useState, useRef } from "react";
import "@/styles/Header.css";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 👈 current route

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  const navigateTo = (path) => {
    setMenuOpen(false);
    router.push(path);
  };

  // Close menu if click outside nav or hamburger
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Fetch user details if logged in
  const getUser = async () => {
    const userIdOrEmail = localStorage.getItem("userId");
    if (!userIdOrEmail) return;

    try {
      const res = await fetch(
        `https://advertorial-backend.onrender.com/api/auth/user/${userIdOrEmail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const userData = await res.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // 👇 helper for active link
  const isActive = (path) => (pathname === path ? "active-route" : "");

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo-container" onClick={() => navigateTo("/")}>
        <img src="/images/mainLogo.jpg" alt="Logo" className="header-logo" />
        <h3 className="header-title my-link hubHeader">Advertorial Hub</h3>
      </div>

      {/* Hamburger Menu */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        ref={hamburgerRef}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setMenuOpen(!menuOpen);
        }}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`header-nav ${menuOpen ? "show" : ""}`}
        ref={navRef}
        aria-hidden={!menuOpen}
      >
        <div
          className={`my-link navbtn ${isActive("/")}`}
          onClick={() => navigateTo("/")}
        >
          Home
        </div>
        <div
          className={`my-link navbtn ${isActive("/AboutUs")}`}
          onClick={() => navigateTo("/AboutUs")}
        >
          About Us
        </div>
        <div
          className={`my-link navbtn ${isActive("/Blog")}`}
          onClick={() => navigateTo("/Blog")}
        >
          Blog
        </div>
        <div
          className={`my-link navbtn ${isActive("/Pricing")}`}
          onClick={() => navigateTo("/Pricing")}
        >
          Pricing
        </div>

        <div className="mobile-buttons">
          <button
            className="login-btn"
            onClick={() => navigateTo("/authentication/Login")}
          >
            Log In
          </button>
          <button
            className="HeaderbtnStart"
            onClick={() => navigateTo("/authentication/CreateAccount")}
          >
            Start Now
          </button>
        </div>
      </nav>

      {/* User info */}
      {user ? (
        <div className="h-user-container">
          <p className="h-user-name">{user?.firstName}</p>
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt={user.profilePicture}
              className="h-user-profile"
              onClick={() => navigateTo("/dashboard")}
            />
          ) : (
            <p
              className="h-user-profile"
              onClick={() => navigateTo("/dashboard")}
            >
              {user?.firstName?.[0] + user?.lastName?.[0]}
            </p>
          )}
        </div>
      ) : (
        <div className="header-buttons">
          <button
            className="login-btn"
            onClick={() => navigateTo("/authentication/Login")}
          >
            Log In
          </button>
          <button
            className="HeaderbtnStart"
            onClick={() => navigateTo("/authentication/CreateAccount")}
          >
            Start Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
