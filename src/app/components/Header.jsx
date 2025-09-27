"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "@/styles/Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // 👇 improved helper for active link
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/" ? "active-route" : "";
    }
    return pathname.startsWith(path) ? "active-route" : "";
  };

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

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
    if (!userIdOrEmail) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `https://advertorial-backend.onrender.com/api/auth/user/${userIdOrEmail}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const userData = await res.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="header">
      {/* Logo */}
      <div
        className="header-logo-container"
        onClick={() => router.push("/")}
        role="button"
        tabIndex={0}
      >
        <img src="/images/favicon.jpg" alt="Logo" className="header-logo" />
        {/* <h3 className="header-title my-link hubHeader">Advertorial Hub</h3> */}
      </div>

      {/* Hamburger Menu */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        ref={hamburgerRef}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleMenu();
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
        <Link
          href="/"
          className={`my-link navbtn ${isActive("/")}`}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/AboutUs"
          className={`my-link navbtn ${isActive("/AboutUs")}`}
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          href="/Blog"
          className={`my-link navbtn ${isActive("/Blog")}`}
          onClick={() => setMenuOpen(false)}
        >
          Blog
        </Link>
        <Link
          href="/Pricing"
          className={`my-link navbtn ${isActive("/Pricing")}`}
          onClick={() => setMenuOpen(false)}
        >
          Pricing
        </Link>
        {/* Mobile Buttons */}
        <div className="mobile-buttons">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  border: "4px solid #ccc",
                  borderTop: "4px solid #4a90e2",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <style>{`
       @keyframes spin {
         0% { transform: rotate(0deg); }
         100% { transform: rotate(360deg); }
       }
     `}</style>
            </div> // 👈 loader while checking
          ) : user ? (
            <p className="mobile-user">Hi, {user.firstName}</p>
          ) : (
            <>
              <Link href="/authentication/Login">
                <button
                  className="login-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </button>
              </Link>
              <Link href="/authentication/CreateAccount">
                <button
                  className="HeaderbtnStart"
                  onClick={() => setMenuOpen(false)}
                >
                  Start Now
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Desktop User Info / Auth Buttons */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              border: "4px solid #ccc",
              borderTop: "4px solid #4a90e2",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>{`
       @keyframes spin {
         0% { transform: rotate(0deg); }
         100% { transform: rotate(360deg); }
       }
     `}</style>
        </div> // 👈 same loader for desktop
      ) : user ? (
        <div className="h-user-container">
          <p className="h-user-name">{user?.firstName}</p>
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt={user?.firstName}
              className="h-user-profile"
              onClick={() => router.push("/dashboard")}
            />
          ) : (
            <p
              className="h-user-profile"
              onClick={() => router.push("/dashboard")}
            >
              {user?.firstName?.[0] + user?.lastName?.[0]}
            </p>
          )}
        </div>
      ) : (
        <div className="header-buttons">
          <Link href="/authentication/Login">
            <button className="login-btn">Log In</button>
          </Link>
          <Link href="/authentication/CreateAccount">
            <button className="HeaderbtnStart">Start Now</button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
