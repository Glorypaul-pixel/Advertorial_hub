"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../styles/DashboardHeader.css";
import Sidebar from "../sidebar/page";

const DashboardHeader = ({ onSearch, currentPage }) => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Fetch logged in user
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <>
      {/* Header */}
      <header className="dashboard-header">
        {/* Left side: Logo */}
        <section className="dashboard-left">
          <div
            className="dashboard-h1"
            onClick={() => router.push("/dashboard")}
          >
            <img
              src="/images/mainLogo.jpg"
              className="sidebar-logo"
              alt="Advertorial Hub Logo"
            />
            <h4 className="sidebar-title">Advertorial Hub</h4>
          </div>
        </section>

        {/* Right side: Search + User + Hamburger */}
        <div className="dashboard-actions">
          {(currentPage === "dashboard" || currentPage === "myposts") && (
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search..."
              className="dashboard-search"
            />
          )}

          {user ? (
            <div className="h-user-container">
              <p className="h-user-name">{user?.firstName}</p>
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="Profile"
                  className="h-user-profile"
                  onClick={() => router.push("/dashboard/profile")}
                />
              ) : (
                <p
                  className="h-user-profile"
                  onClick={() => router.push("/dashboard/profile")}
                >
                  {user?.firstName?.[0] + user?.lastName?.[0]}
                </p>
              )}
            </div>
          ) : (
            <button
              className="dashboard-btn"
              onClick={() => router.push("/authentication/Login")}
            >
              Login
            </button>
          )}

          {/* Hamburger (now on right) */}
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </header>

      {/* Sidebar for small screens */}
      {menuOpen && (
        <div className="mobile-sidebar">
          <Sidebar setMenuOpen={setMenuOpen} />

          {/* Profile inside the menu */}
          {user && (
            <div className="mobile-user">
              <p className="mobile-user-name">{user?.firstName}</p>
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="Profile"
                  className="mobile-user-profile"
                  onClick={() => router.push("/dashboard/profile")}
                />
              ) : (
                <p
                  className="mobile-user-profile"
                  onClick={() => router.push("/dashboard/profile")}
                >
                  {user?.firstName?.[0] + user?.lastName?.[0]}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
