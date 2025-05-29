"use client";
import Sidebar from "../sidebar/page";
import "../../styles/Dashboardlayout.css"; // Import the new vanilla CSS file
import { useState } from "react";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout-container">
      <section className="sidebar-container">
        <Sidebar />
      </section>
      <main className="main-content ">
        <div
          className={`hamburger sideHeader ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {menuOpen && <Sidebar setMenuOpen={setMenuOpen} />}
        {children}
      </main>
    </div>
  );
}
